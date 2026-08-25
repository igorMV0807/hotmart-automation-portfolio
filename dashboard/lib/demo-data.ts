import type {
  HotmartEvent,
  Period,
  PurchaseJourney,
  RecoveryEmailLog,
} from '@/types/domain';

const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();

function isoDaysAgo(days: number, hour = 14) {
  const date = new Date(now - days * DAY);
  date.setUTCHours(hour, 0, 0, 0);
  return date.toISOString();
}

function epochDaysAgo(days: number, hour = 14) {
  return new Date(isoDaysAgo(days, hour)).getTime();
}

export const demoJourneys: PurchaseJourney[] = [
  {
    id: 1001,
    buyer_email: 'ana.demo@example.com',
    buyer_name: 'Ana Demo',
    product_id: 9001,
    offer_code: 'DEMO-OFFER-A',
    transaction_id: 'DEMO-TX-1001',
    current_status: 'APPROVED',
    recovery_allowed: false,
    recovery_flow: null,
    last_step_sent: 1,
    next_step_at: null,
    approved_at: isoDaysAgo(2),
    completed_at: isoDaysAgo(2),
    cancelled_at: null,
    expired_at: null,
    overdue_at: null,
    refund_requested_at: null,
    refunded_at: null,
    chargeback_at: null,
    recovered: true,
    recovered_step: 1,
    recovered_revenue: 197,
    currency: 'BRL',
    first_event_id: 'DEMO-EVT-1001-A',
    last_event_id: 'DEMO-EVT-1001-B',
    last_event_created_at: epochDaysAgo(2),
    created_at: isoDaysAgo(4),
    updated_at: isoDaysAgo(2),
  },
  {
    id: 1002,
    buyer_email: 'bruno.demo@example.com',
    buyer_name: 'Bruno Demo',
    product_id: 9002,
    offer_code: 'DEMO-OFFER-B',
    transaction_id: 'DEMO-TX-1002',
    current_status: 'APPROVED',
    recovery_allowed: false,
    recovery_flow: null,
    last_step_sent: 2,
    next_step_at: null,
    approved_at: isoDaysAgo(6),
    completed_at: isoDaysAgo(6),
    cancelled_at: null,
    expired_at: null,
    overdue_at: null,
    refund_requested_at: null,
    refunded_at: null,
    chargeback_at: null,
    recovered: true,
    recovered_step: 2,
    recovered_revenue: 297,
    currency: 'BRL',
    first_event_id: 'DEMO-EVT-1002-A',
    last_event_id: 'DEMO-EVT-1002-B',
    last_event_created_at: epochDaysAgo(6),
    created_at: isoDaysAgo(9),
    updated_at: isoDaysAgo(6),
  },
  {
    id: 1003,
    buyer_email: 'carla.demo@example.com',
    buyer_name: 'Carla Demo',
    product_id: 9001,
    offer_code: 'DEMO-OFFER-A',
    transaction_id: 'DEMO-TX-1003',
    current_status: 'WAITING_PAYMENT',
    recovery_allowed: true,
    recovery_flow: 'WAITING_PAYMENT',
    last_step_sent: 1,
    next_step_at: isoDaysAgo(-1, 10),
    approved_at: null,
    completed_at: null,
    cancelled_at: null,
    expired_at: null,
    overdue_at: null,
    refund_requested_at: null,
    refunded_at: null,
    chargeback_at: null,
    recovered: false,
    recovered_step: null,
    recovered_revenue: null,
    currency: 'BRL',
    first_event_id: 'DEMO-EVT-1003-A',
    last_event_id: 'DEMO-EVT-1003-A',
    last_event_created_at: epochDaysAgo(1),
    created_at: isoDaysAgo(1),
    updated_at: isoDaysAgo(1),
  },
  {
    id: 1004,
    buyer_email: 'diego.demo@example.com',
    buyer_name: 'Diego Demo',
    product_id: 9003,
    offer_code: 'DEMO-OFFER-C',
    transaction_id: 'DEMO-TX-1004',
    current_status: 'APPROVED',
    recovery_allowed: false,
    recovery_flow: null,
    last_step_sent: 3,
    next_step_at: null,
    approved_at: isoDaysAgo(18),
    completed_at: isoDaysAgo(18),
    cancelled_at: null,
    expired_at: null,
    overdue_at: null,
    refund_requested_at: null,
    refunded_at: null,
    chargeback_at: null,
    recovered: true,
    recovered_step: 3,
    recovered_revenue: 497,
    currency: 'BRL',
    first_event_id: 'DEMO-EVT-1004-A',
    last_event_id: 'DEMO-EVT-1004-B',
    last_event_created_at: epochDaysAgo(18),
    created_at: isoDaysAgo(23),
    updated_at: isoDaysAgo(18),
  },
  {
    id: 1005,
    buyer_email: 'elisa.demo@example.com',
    buyer_name: 'Elisa Demo',
    product_id: 9002,
    offer_code: 'DEMO-OFFER-B',
    transaction_id: 'DEMO-TX-1005',
    current_status: 'ABANDONED',
    recovery_allowed: true,
    recovery_flow: 'ABANDONED',
    last_step_sent: 2,
    next_step_at: isoDaysAgo(-1, 10),
    approved_at: null,
    completed_at: null,
    cancelled_at: null,
    expired_at: null,
    overdue_at: null,
    refund_requested_at: null,
    refunded_at: null,
    chargeback_at: null,
    recovered: false,
    recovered_step: null,
    recovered_revenue: null,
    currency: 'BRL',
    first_event_id: 'DEMO-EVT-1005-A',
    last_event_id: 'DEMO-EVT-1005-A',
    last_event_created_at: epochDaysAgo(3),
    created_at: isoDaysAgo(3),
    updated_at: isoDaysAgo(1),
  },
  {
    id: 1006,
    buyer_email: 'fabio.demo@example.com',
    buyer_name: 'Fábio Demo',
    product_id: 9003,
    offer_code: 'DEMO-OFFER-C',
    transaction_id: 'DEMO-TX-1006',
    current_status: 'EXPIRED',
    recovery_allowed: false,
    recovery_flow: 'EXPIRED',
    last_step_sent: 3,
    next_step_at: null,
    approved_at: null,
    completed_at: null,
    cancelled_at: null,
    expired_at: isoDaysAgo(35),
    overdue_at: null,
    refund_requested_at: null,
    refunded_at: null,
    chargeback_at: null,
    recovered: false,
    recovered_step: null,
    recovered_revenue: null,
    currency: 'BRL',
    first_event_id: 'DEMO-EVT-1006-A',
    last_event_id: 'DEMO-EVT-1006-A',
    last_event_created_at: epochDaysAgo(35),
    created_at: isoDaysAgo(38),
    updated_at: isoDaysAgo(35),
  },
];

export const demoLogs: RecoveryEmailLog[] = [
  { id: 2001, journey_id: 1001, recovery_flow: 'ABANDONED', step: 1, buyer_email: 'ana.demo@example.com', subject: 'Demo: finalize sua compra', gmail_message_id: 'DEMO-MSG-2001', status: 'SENT', sent_at: isoDaysAgo(3), created_at: isoDaysAgo(3) },
  { id: 2002, journey_id: 1002, recovery_flow: 'WAITING_PAYMENT', step: 1, buyer_email: 'bruno.demo@example.com', subject: 'Demo: pagamento pendente', gmail_message_id: 'DEMO-MSG-2002', status: 'SENT', sent_at: isoDaysAgo(8), created_at: isoDaysAgo(8) },
  { id: 2003, journey_id: 1002, recovery_flow: 'WAITING_PAYMENT', step: 2, buyer_email: 'bruno.demo@example.com', subject: 'Demo: lembrete de pagamento', gmail_message_id: 'DEMO-MSG-2003', status: 'SENT', sent_at: isoDaysAgo(7), created_at: isoDaysAgo(7) },
  { id: 2004, journey_id: 1003, recovery_flow: 'WAITING_PAYMENT', step: 1, buyer_email: 'carla.demo@example.com', subject: 'Demo: pagamento pendente', gmail_message_id: 'DEMO-MSG-2004', status: 'SENT', sent_at: isoDaysAgo(1), created_at: isoDaysAgo(1) },
  { id: 2005, journey_id: 1004, recovery_flow: 'CANCELED', step: 1, buyer_email: 'diego.demo@example.com', subject: 'Demo: nova tentativa', gmail_message_id: 'DEMO-MSG-2005', status: 'SENT', sent_at: isoDaysAgo(22), created_at: isoDaysAgo(22) },
  { id: 2006, journey_id: 1004, recovery_flow: 'CANCELED', step: 2, buyer_email: 'diego.demo@example.com', subject: 'Demo: concluir compra', gmail_message_id: 'DEMO-MSG-2006', status: 'SENT', sent_at: isoDaysAgo(21), created_at: isoDaysAgo(21) },
  { id: 2007, journey_id: 1004, recovery_flow: 'CANCELED', step: 3, buyer_email: 'diego.demo@example.com', subject: 'Demo: último lembrete', gmail_message_id: 'DEMO-MSG-2007', status: 'SENT', sent_at: isoDaysAgo(20), created_at: isoDaysAgo(20) },
  { id: 2008, journey_id: 1005, recovery_flow: 'ABANDONED', step: 1, buyer_email: 'elisa.demo@example.com', subject: 'Demo: finalize sua compra', gmail_message_id: 'DEMO-MSG-2008', status: 'SENT', sent_at: isoDaysAgo(3), created_at: isoDaysAgo(3) },
  { id: 2009, journey_id: 1005, recovery_flow: 'ABANDONED', step: 2, buyer_email: 'elisa.demo@example.com', subject: 'Demo: sua compra está disponível', gmail_message_id: 'DEMO-MSG-2009', status: 'SENT', sent_at: isoDaysAgo(2), created_at: isoDaysAgo(2) },
];

export const demoEvents: HotmartEvent[] = [
  { id: 3001, event_id: 'DEMO-EVT-1001-A', event_type: 'PURCHASE_ABANDONED', event_created_at: epochDaysAgo(4), transaction_id: 'DEMO-TX-1001', buyer_email: 'ana.demo@example.com', buyer_name: 'Ana Demo', product_id: 9001, offer_code: 'DEMO-OFFER-A', purchase_status: 'ABANDONED', price: 197, currency: 'BRL', processed: true, processed_at: isoDaysAgo(4), processing_error: null, created_at: isoDaysAgo(4) },
  { id: 3002, event_id: 'DEMO-EVT-1001-B', event_type: 'PURCHASE_APPROVED', event_created_at: epochDaysAgo(2), transaction_id: 'DEMO-TX-1001', buyer_email: 'ana.demo@example.com', buyer_name: 'Ana Demo', product_id: 9001, offer_code: 'DEMO-OFFER-A', purchase_status: 'APPROVED', price: 197, currency: 'BRL', processed: true, processed_at: isoDaysAgo(2), processing_error: null, created_at: isoDaysAgo(2) },
  { id: 3003, event_id: 'DEMO-EVT-1002-A', event_type: 'PURCHASE_WAITING_PAYMENT', event_created_at: epochDaysAgo(9), transaction_id: 'DEMO-TX-1002', buyer_email: 'bruno.demo@example.com', buyer_name: 'Bruno Demo', product_id: 9002, offer_code: 'DEMO-OFFER-B', purchase_status: 'WAITING_PAYMENT', price: 297, currency: 'BRL', processed: true, processed_at: isoDaysAgo(9), processing_error: null, created_at: isoDaysAgo(9) },
  { id: 3004, event_id: 'DEMO-EVT-1002-B', event_type: 'PURCHASE_APPROVED', event_created_at: epochDaysAgo(6), transaction_id: 'DEMO-TX-1002', buyer_email: 'bruno.demo@example.com', buyer_name: 'Bruno Demo', product_id: 9002, offer_code: 'DEMO-OFFER-B', purchase_status: 'APPROVED', price: 297, currency: 'BRL', processed: true, processed_at: isoDaysAgo(6), processing_error: null, created_at: isoDaysAgo(6) },
  { id: 3005, event_id: 'DEMO-EVT-1003-A', event_type: 'PURCHASE_WAITING_PAYMENT', event_created_at: epochDaysAgo(1), transaction_id: 'DEMO-TX-1003', buyer_email: 'carla.demo@example.com', buyer_name: 'Carla Demo', product_id: 9001, offer_code: 'DEMO-OFFER-A', purchase_status: 'WAITING_PAYMENT', price: 197, currency: 'BRL', processed: true, processed_at: isoDaysAgo(1), processing_error: null, created_at: isoDaysAgo(1) },
  { id: 3006, event_id: 'DEMO-EVT-1004-A', event_type: 'PURCHASE_CANCELED', event_created_at: epochDaysAgo(23), transaction_id: 'DEMO-TX-1004', buyer_email: 'diego.demo@example.com', buyer_name: 'Diego Demo', product_id: 9003, offer_code: 'DEMO-OFFER-C', purchase_status: 'CANCELED', price: 497, currency: 'BRL', processed: true, processed_at: isoDaysAgo(23), processing_error: null, created_at: isoDaysAgo(23) },
  { id: 3007, event_id: 'DEMO-EVT-1004-B', event_type: 'PURCHASE_APPROVED', event_created_at: epochDaysAgo(18), transaction_id: 'DEMO-TX-1004', buyer_email: 'diego.demo@example.com', buyer_name: 'Diego Demo', product_id: 9003, offer_code: 'DEMO-OFFER-C', purchase_status: 'APPROVED', price: 497, currency: 'BRL', processed: true, processed_at: isoDaysAgo(18), processing_error: null, created_at: isoDaysAgo(18) },
  { id: 3008, event_id: 'DEMO-EVT-1005-A', event_type: 'PURCHASE_ABANDONED', event_created_at: epochDaysAgo(3), transaction_id: 'DEMO-TX-1005', buyer_email: 'elisa.demo@example.com', buyer_name: 'Elisa Demo', product_id: 9002, offer_code: 'DEMO-OFFER-B', purchase_status: 'ABANDONED', price: 297, currency: 'BRL', processed: false, processed_at: null, processing_error: 'DEMO_ERROR: synthetic retry example', created_at: isoDaysAgo(3) },
  { id: 3009, event_id: 'DEMO-EVT-1006-A', event_type: 'PURCHASE_EXPIRED', event_created_at: epochDaysAgo(35), transaction_id: 'DEMO-TX-1006', buyer_email: 'fabio.demo@example.com', buyer_name: 'Fábio Demo', product_id: 9003, offer_code: 'DEMO-OFFER-C', purchase_status: 'EXPIRED', price: 497, currency: 'BRL', processed: true, processed_at: isoDaysAgo(35), processing_error: null, created_at: isoDaysAgo(35) },
];

function periodStart(period: Period) {
  if (period === 'all') return null;
  const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
  return new Date(now - days * DAY);
}

function inPeriod(value: string | null | undefined, start: Date | null) {
  if (!start) return true;
  if (!value) return false;
  return new Date(value).getTime() >= start.getTime();
}

function latestSentLogBeforeApproval(journey: PurchaseJourney) {
  const logs = demoLogs
    .filter((log) => log.journey_id === journey.id && log.status === 'SENT' && log.sent_at)
    .sort((a, b) => new Date(b.sent_at || 0).getTime() - new Date(a.sent_at || 0).getTime());
  if (!journey.approved_at) return logs[0] || null;
  const approved = new Date(journey.approved_at).getTime();
  return logs.find((log) => new Date(log.sent_at || 0).getTime() <= approved) || null;
}

export async function getDemoOverview(period: Period) {
  const start = periodStart(period);
  const sentLogs = demoLogs.filter((log) => log.status === 'SENT' && inPeriod(log.sent_at || log.created_at, start));
  const recoveredJourneys = demoJourneys.filter((journey) => journey.recovered === true && inPeriod(journey.approved_at || journey.updated_at, start));
  const activeRecoveries = demoJourneys.filter((journey) => journey.recovery_allowed === true && journey.recovered !== true && Number(journey.last_step_sent || 0) < 3);
  const emailedJourneyIds = new Set(sentLogs.map((log) => log.journey_id));
  const recoveredAmongEmailed = recoveredJourneys.filter((journey) => emailedJourneyIds.has(journey.id));
  const recoveredRevenue = recoveredJourneys.reduce((sum, journey) => sum + Number(journey.recovered_revenue || 0), 0);
  const byStep = [1, 2, 3].map((step) => {
    const rows = recoveredJourneys.filter((journey) => Number(journey.recovered_step || 0) === step);
    return { step: `Etapa ${step}`, recovered: rows.length, revenue: rows.reduce((sum, row) => sum + Number(row.recovered_revenue || 0), 0) };
  });
  const flowMap = new Map<string, { recovered: number; revenue: number }>();
  for (const journey of recoveredJourneys) {
    const flow = latestSentLogBeforeApproval(journey)?.recovery_flow || 'NÃO IDENTIFICADO';
    const current = flowMap.get(flow) || { recovered: 0, revenue: 0 };
    current.recovered += 1;
    current.revenue += Number(journey.recovered_revenue || 0);
    flowMap.set(flow, current);
  }
  const dailyMap = new Map<string, { recovered: number; revenue: number }>();
  for (const journey of recoveredJourneys) {
    const value = journey.approved_at || journey.updated_at;
    if (!value) continue;
    const key = value.slice(0, 10);
    const current = dailyMap.get(key) || { recovered: 0, revenue: 0 };
    current.recovered += 1;
    current.revenue += Number(journey.recovered_revenue || 0);
    dailyMap.set(key, current);
  }
  return {
    recoveredRevenue,
    recoveredSales: recoveredJourneys.length,
    recoveryRate: emailedJourneyIds.size ? (recoveredAmongEmailed.length / emailedJourneyIds.size) * 100 : 0,
    emailsSent: sentLogs.length,
    activeRecoveries: activeRecoveries.length,
    byStep,
    byFlow: [...flowMap.entries()].map(([flow, values]) => ({ flow, ...values })).sort((a, b) => b.recovered - a.recovered),
    revenueByDay: [...dailyMap.entries()].map(([date, values]) => ({ date, ...values })).sort((a, b) => a.date.localeCompare(b.date)),
    recentJourneys: [...demoJourneys].sort((a, b) => new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime()).slice(0, 8),
  };
}

export async function getDemoJourneys() {
  return [...demoJourneys].sort((a, b) => new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime());
}

export async function getDemoJourneyDetails(id: number) {
  const journey = demoJourneys.find((item) => item.id === id);
  if (!journey) return null;
  const logs = demoLogs.filter((log) => log.journey_id === id).sort((a, b) => new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime());
  const events = demoEvents.filter((event) => event.transaction_id === journey.transaction_id).sort((a, b) => Number(a.event_created_at || 0) - Number(b.event_created_at || 0));
  return { journey, logs, events };
}

export async function getDemoEmailAnalytics(period: Period) {
  const start = periodStart(period);
  const sent = demoLogs.filter((log) => log.status === 'SENT' && inPeriod(log.sent_at || log.created_at, start));
  const recovered = demoJourneys.filter((journey) => journey.recovered === true && inPeriod(journey.approved_at || journey.updated_at, start));
  const byStep = [1, 2, 3].map((step) => ({
    step,
    sent: sent.filter((log) => Number(log.step || 0) === step).length,
    recovered: recovered.filter((journey) => Number(journey.recovered_step || 0) === step).length,
    revenue: recovered.filter((journey) => Number(journey.recovered_step || 0) === step).reduce((sum, journey) => sum + Number(journey.recovered_revenue || 0), 0),
  }));
  const flowMap = new Map<string, number>();
  for (const log of sent) flowMap.set(log.recovery_flow || 'NÃO IDENTIFICADO', (flowMap.get(log.recovery_flow || 'NÃO IDENTIFICADO') || 0) + 1);
  return {
    byStep,
    byFlow: [...flowMap.entries()].map(([flow, count]) => ({ flow, sent: count })).sort((a, b) => b.sent - a.sent),
    recent: [...sent].sort((a, b) => new Date(b.sent_at || 0).getTime() - new Date(a.sent_at || 0).getTime()).slice(0, 100),
  };
}

export async function getDemoEvents() {
  return [...demoEvents].sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
}

