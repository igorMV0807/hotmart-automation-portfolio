import Link from "next/link";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { PeriodFilter } from "@/components/period-filter";
import { RevenueLineChart, StepBarChart } from "@/components/charts";
import { StatusBadge } from "@/components/status-badge";
import { formatMoney, formatPercent } from "@/lib/format";
import { getOverview } from "@/lib/data";
import type { Period } from "@/types/domain";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const params = await searchParams;
  const period: Period = ["7d", "30d", "90d", "all"].includes(
    params.period || ""
  )
    ? (params.period as Period)
    : "30d";

  const data = await getOverview(period);

  return (
    <>
      <PageHeader
        eyebrow="Visão geral"
        title="Recuperação Hotmart"
        description="Métricas calculadas somente a partir de purchase_journeys e recovery_email_logs. Nenhuma taxa de abertura ou clique é estimada."
      >
        <PeriodFilter current={period} basePath="/dashboard" />
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Receita recuperada"
          value={formatMoney(data.recoveredRevenue)}
        />
        <MetricCard
          label="Vendas recuperadas"
          value={String(data.recoveredSales)}
        />
        <MetricCard
          label="Taxa de recuperação"
          value={formatPercent(data.recoveryRate)}
          hint="Recuperadas ÷ jornadas que receberam e-mail no período."
        />
        <MetricCard label="E-mails enviados" value={String(data.emailsSent)} />
        <MetricCard
          label="Em recuperação agora"
          value={String(data.activeRecoveries)}
          hint="recovery_allowed=true, recovered=false, etapa < 3."
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-5">
            <h2 className="font-semibold">Receita recuperada por dia</h2>
            <p className="text-sm text-slate-500">
              Agrupada pela data de aprovação da jornada recuperada.
            </p>
          </div>
          <RevenueLineChart data={data.revenueByDay} />
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-5">
            <h2 className="font-semibold">Vendas recuperadas por etapa</h2>
            <p className="text-sm text-slate-500">
              Usa o campo recovered_step salvo pelo backend.
            </p>
          </div>
          <StepBarChart data={data.byStep} />
        </article>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.5fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="font-semibold">Recuperações por fluxo</h2>
          <p className="mb-4 text-sm text-slate-500">
            O fluxo é inferido pelo último e-mail SENT anterior à aprovação.
          </p>

          <div className="space-y-3">
            {data.byFlow.length ? (
              data.byFlow.map((row) => (
                <div
                  key={row.flow}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{row.flow}</p>
                    <p className="text-xs text-slate-500">
                      {row.recovered} venda(s)
                    </p>
                  </div>
                  <strong className="text-sm">{formatMoney(row.revenue)}</strong>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">
                Nenhuma recuperação no período.
              </p>
            )}
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-slate-200 p-5">
            <div>
              <h2 className="font-semibold">Jornadas recentes</h2>
              <p className="text-sm text-slate-500">
                Últimas jornadas atualizadas no banco.
              </p>
            </div>
            <Link
              href="/dashboard/jornadas"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Ver todas
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Cliente</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Etapa</th>
                  <th className="px-5 py-3">Recuperada</th>
                </tr>
              </thead>
              <tbody>
                {data.recentJourneys.map((journey) => (
                  <tr
                    key={journey.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <Link
                        className="font-medium hover:text-indigo-600"
                        href={`/dashboard/jornadas/${journey.id}`}
                      >
                        {journey.buyer_name || journey.buyer_email || `#${journey.id}`}
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge value={journey.current_status} />
                    </td>
                    <td className="px-5 py-4">
                      {Number(journey.last_step_sent || 0)}
                    </td>
                    <td className="px-5 py-4">
                      {journey.recovered ? "✅" : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <p className="mt-6 text-xs leading-5 text-slate-400">
        Nota: este dashboard não mostra abertura ou clique de e-mail porque o
        backend atual não registra esses eventos. Isso evita exibir métricas
        inventadas.
      </p>
    </>
  );
}
