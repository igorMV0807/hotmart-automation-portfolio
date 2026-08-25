import "server-only";
import { getAdminClient } from "@/lib/supabase/admin";
import type {
  HotmartEvent,
  Period,
  PurchaseJourney,
  RecoveryEmailLog,
} from "@/types/domain";
import { isPortfolioDemoMode } from '@/lib/env';
import {
  getDemoEmailAnalytics,
  getDemoEvents,
  getDemoJourneyDetails,
  getDemoJourneys,
  getDemoOverview,
} from '@/lib/demo-data';

const PAGE_SIZE = 1000;

async function fetchAll<T>(
  table: "purchase_journeys" | "recovery_email_logs" | "hotmart_events",
  select = "*"
): Promise<T[]> {
  const supabase = getAdminClient();
  const rows: T[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      throw new Error(`${table}: ${error.message}`);
    }

    const batch = (data || []) as T[];
    rows.push(...batch);

    if (batch.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return rows;
}

function periodStart(period: Period) {
  if (period === "all") return null;
  const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

function inPeriod(value: string | null | undefined, start: Date | null) {
  if (!start) return true;
  if (!value) return false;
  const time = new Date(value).getTime();
  return Number.isFinite(time) && time >= start.getTime();
}

function dateKey(value: string) {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: process.env.APP_TIMEZONE || "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function latestSentLogBeforeApproval(
  journey: PurchaseJourney,
  logsByJourney: Map<number, RecoveryEmailLog[]>
) {
  const logs = (logsByJourney.get(journey.id) || [])
    .filter((log) => String(log.status || "").toUpperCase() === "SENT" && log.sent_at)
    .sort(
      (a, b) =>
        new Date(b.sent_at || 0).getTime() - new Date(a.sent_at || 0).getTime()
    );

  if (!journey.approved_at) return logs[0] || null;

  const approved = new Date(journey.approved_at).getTime();
  return logs.find((log) => new Date(log.sent_at || 0).getTime() <= approved) || null;
}

export async function getOverview(period: Period) {
  if (isPortfolioDemoMode()) return getDemoOverview(period);

  const [journeys, logs] = await Promise.all([
    fetchAll<PurchaseJourney>("purchase_journeys"),
    fetchAll<RecoveryEmailLog>("recovery_email_logs"),
  ]);

  const start = periodStart(period);
  const sentLogs = logs.filter(
    (log) =>
      String(log.status || "").toUpperCase() === "SENT" &&
      inPeriod(log.sent_at || log.created_at, start)
  );

  const recoveredJourneys = journeys.filter(
    (journey) =>
      journey.recovered === true &&
      inPeriod(journey.approved_at || journey.updated_at, start)
  );

  const activeRecoveries = journeys.filter(
    (j) =>
      j.recovery_allowed === true &&
      j.recovered !== true &&
      Number(j.last_step_sent || 0) < 3
  );

  const emailedJourneyIds = new Set(sentLogs.map((log) => log.journey_id));
  const recoveredAmongEmailed = recoveredJourneys.filter((j) =>
    emailedJourneyIds.has(j.id)
  );

  const recoveredRevenue = recoveredJourneys.reduce(
    (sum, j) => sum + Number(j.recovered_revenue || 0),
    0
  );

  const recoveryRate =
    emailedJourneyIds.size > 0
      ? (recoveredAmongEmailed.length / emailedJourneyIds.size) * 100
      : 0;

  const byStep = [1, 2, 3].map((step) => {
    const rows = recoveredJourneys.filter(
      (j) => Number(j.recovered_step || 0) === step
    );
    return {
      step: `Etapa ${step}`,
      recovered: rows.length,
      revenue: rows.reduce(
        (sum, row) => sum + Number(row.recovered_revenue || 0),
        0
      ),
    };
  });

  const logsByJourney = new Map<number, RecoveryEmailLog[]>();
  for (const log of logs) {
    const list = logsByJourney.get(log.journey_id) || [];
    list.push(log);
    logsByJourney.set(log.journey_id, list);
  }

  const flowMap = new Map<string, { recovered: number; revenue: number }>();
  for (const journey of recoveredJourneys) {
    const log = latestSentLogBeforeApproval(journey, logsByJourney);
    const flow = log?.recovery_flow || "NÃO IDENTIFICADO";
    const current = flowMap.get(flow) || { recovered: 0, revenue: 0 };
    current.recovered += 1;
    current.revenue += Number(journey.recovered_revenue || 0);
    flowMap.set(flow, current);
  }

  const byFlow = [...flowMap.entries()]
    .map(([flow, values]) => ({ flow, ...values }))
    .sort((a, b) => b.recovered - a.recovered);

  const dailyMap = new Map<string, { recovered: number; revenue: number }>();
  for (const journey of recoveredJourneys) {
    const value = journey.approved_at || journey.updated_at;
    if (!value) continue;
    const key = dateKey(value);
    const current = dailyMap.get(key) || { recovered: 0, revenue: 0 };
    current.recovered += 1;
    current.revenue += Number(journey.recovered_revenue || 0);
    dailyMap.set(key, current);
  }

  const revenueByDay = [...dailyMap.entries()]
    .map(([date, values]) => ({ date, ...values }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const recentJourneys = [...journeys]
    .sort(
      (a, b) =>
        new Date(b.updated_at || b.created_at || 0).getTime() -
        new Date(a.updated_at || a.created_at || 0).getTime()
    )
    .slice(0, 8);

  return {
    recoveredRevenue,
    recoveredSales: recoveredJourneys.length,
    recoveryRate,
    emailsSent: sentLogs.length,
    activeRecoveries: activeRecoveries.length,
    byStep,
    byFlow,
    revenueByDay,
    recentJourneys,
  };
}

export async function getJourneys() {
  if (isPortfolioDemoMode()) return getDemoJourneys();

  const journeys = await fetchAll<PurchaseJourney>("purchase_journeys");
  return journeys.sort(
    (a, b) =>
      new Date(b.updated_at || b.created_at || 0).getTime() -
      new Date(a.updated_at || a.created_at || 0).getTime()
  );
}

export async function getJourneyDetails(id: number) {
  if (isPortfolioDemoMode()) return getDemoJourneyDetails(id);

  const [journeys, logs, events] = await Promise.all([
    fetchAll<PurchaseJourney>("purchase_journeys"),
    fetchAll<RecoveryEmailLog>("recovery_email_logs"),
    fetchAll<HotmartEvent>("hotmart_events"),
  ]);

  const journey = journeys.find((j) => Number(j.id) === Number(id));
  if (!journey) return null;

  const journeyLogs = logs
    .filter((log) => Number(log.journey_id) === Number(id))
    .sort(
      (a, b) =>
        new Date(a.created_at || a.sent_at || 0).getTime() -
        new Date(b.created_at || b.sent_at || 0).getTime()
    );

  const journeyEvents = events
    .filter((event) => {
      if (
        journey.transaction_id &&
        event.transaction_id &&
        event.transaction_id === journey.transaction_id
      ) {
        return true;
      }

      return (
        (event.buyer_email || "") === (journey.buyer_email || "") &&
        Number(event.product_id || 0) === Number(journey.product_id || 0) &&
        (event.offer_code || "") === (journey.offer_code || "")
      );
    })
    .sort(
      (a, b) => Number(a.event_created_at || 0) - Number(b.event_created_at || 0)
    );

  return { journey, logs: journeyLogs, events: journeyEvents };
}

export async function getEmailAnalytics(period: Period) {
  if (isPortfolioDemoMode()) return getDemoEmailAnalytics(period);

  const [journeys, logs] = await Promise.all([
    fetchAll<PurchaseJourney>("purchase_journeys"),
    fetchAll<RecoveryEmailLog>("recovery_email_logs"),
  ]);

  const start = periodStart(period);
  const sent = logs.filter(
    (log) =>
      String(log.status || "").toUpperCase() === "SENT" &&
      inPeriod(log.sent_at || log.created_at, start)
  );

  const recovered = journeys.filter(
    (journey) =>
      journey.recovered === true &&
      inPeriod(journey.approved_at || journey.updated_at, start)
  );

  const byStep = [1, 2, 3].map((step) => {
    const sentAtStep = sent.filter((log) => Number(log.step || 0) === step);
    const recoveredAtStep = recovered.filter(
      (journey) => Number(journey.recovered_step || 0) === step
    );

    return {
      step,
      sent: sentAtStep.length,
      recovered: recoveredAtStep.length,
      revenue: recoveredAtStep.reduce(
        (sum, j) => sum + Number(j.recovered_revenue || 0),
        0
      ),
    };
  });

  const flowMap = new Map<string, { sent: number }>();
  for (const log of sent) {
    const flow = log.recovery_flow || "NÃO IDENTIFICADO";
    const current = flowMap.get(flow) || { sent: 0 };
    current.sent += 1;
    flowMap.set(flow, current);
  }

  const byFlow = [...flowMap.entries()]
    .map(([flow, value]) => ({ flow, sent: value.sent }))
    .sort((a, b) => b.sent - a.sent);

  const recent = [...sent]
    .sort(
      (a, b) =>
        new Date(b.sent_at || b.created_at || 0).getTime() -
        new Date(a.sent_at || a.created_at || 0).getTime()
    )
    .slice(0, 100);

  return { byStep, byFlow, recent };
}

export async function getEvents() {
  if (isPortfolioDemoMode()) return getDemoEvents();

  const events = await fetchAll<HotmartEvent>("hotmart_events");
  return events
    .sort(
      (a, b) =>
        new Date(b.created_at || 0).getTime() -
        new Date(a.created_at || 0).getTime()
    )
    .slice(0, 300);
}
