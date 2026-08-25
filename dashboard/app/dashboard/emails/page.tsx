import { PageHeader } from "@/components/page-header";
import { PeriodFilter } from "@/components/period-filter";
import { StatusBadge } from "@/components/status-badge";
import { formatDateTime, formatMoney } from "@/lib/format";
import { getEmailAnalytics } from "@/lib/data";
import type { Period } from "@/types/domain";

export const dynamic = "force-dynamic";

export default async function EmailsPage({
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

  const data = await getEmailAnalytics(period);

  return (
    <>
      <PageHeader
        eyebrow="E-mails"
        title="Performance dos envios"
        description="Aqui só entram logs com status SENT. O painel não inventa abertura, clique ou CTR."
      >
        <PeriodFilter current={period} basePath="/dashboard/emails" />
      </PageHeader>

      <section className="grid gap-4 lg:grid-cols-3">
        {data.byStep.map((row) => (
          <article
            key={row.step}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"
          >
            <p className="text-sm font-medium text-slate-500">
              Etapa {row.step}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <Small label="Enviados" value={String(row.sent)} />
              <Small label="Recuperadas" value={String(row.recovered)} />
              <Small label="Receita" value={formatMoney(row.revenue)} />
            </div>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[.8fr_1.4fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="font-semibold">Envios por fluxo</h2>
          <div className="mt-4 space-y-3">
            {data.byFlow.map((row) => (
              <div
                key={row.flow}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
              >
                <span className="text-sm font-medium">{row.flow}</span>
                <strong>{row.sent}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
          <div className="border-b border-slate-200 p-5">
            <h2 className="font-semibold">Últimos e-mails enviados</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Destinatário</th>
                  <th className="px-5 py-3">Fluxo</th>
                  <th className="px-5 py-3">Etapa</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Enviado</th>
                </tr>
              </thead>
              <tbody>
                {data.recent.map((log) => (
                  <tr key={log.id} className="border-t border-slate-100">
                    <td className="px-5 py-4">
                      <div className="max-w-xs truncate">{log.buyer_email || "—"}</div>
                    </td>
                    <td className="px-5 py-4">{log.recovery_flow || "—"}</td>
                    <td className="px-5 py-4">{log.step || "—"}</td>
                    <td className="px-5 py-4">
                      <StatusBadge value={log.status} />
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {formatDateTime(log.sent_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </>
  );
}

function Small({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
