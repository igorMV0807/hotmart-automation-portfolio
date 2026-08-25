import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { formatDateTime, formatMoney } from "@/lib/format";
import { getJourneyDetails } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function JourneyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = await getJourneyDetails(Number(id));

  if (!detail) notFound();

  const { journey, logs, events } = detail;

  const timeline = [
    ...events.map((event) => ({
      at:
        event.event_created_at != null
          ? new Date(Number(event.event_created_at)).toISOString()
          : event.created_at,
      kind: "EVENTO",
      title: event.event_type || "Evento Hotmart",
      detail: event.purchase_status || "—",
    })),
    ...logs.map((log) => ({
      at: log.sent_at || log.created_at,
      kind: "EMAIL",
      title: `E-mail etapa ${log.step || "?"}`,
      detail: `${log.recovery_flow || "—"} · ${log.status || "—"}`,
    })),
  ].sort(
    (a, b) => new Date(a.at || 0).getTime() - new Date(b.at || 0).getTime()
  );

  return (
    <>
      <PageHeader
        eyebrow={`Jornada #${journey.id}`}
        title={journey.buyer_name || "Jornada sem nome"}
        description={journey.buyer_email || undefined}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Info label="Status" value={<StatusBadge value={journey.current_status} />} />
        <Info label="Fluxo atual" value={journey.recovery_flow || "—"} />
        <Info label="Última etapa" value={String(journey.last_step_sent || 0)} />
        <Info
          label="Recuperação"
          value={
            journey.recovered
              ? `Sim · etapa ${journey.recovered_step || "?"} · ${formatMoney(
                  journey.recovered_revenue,
                  journey.currency || "BRL"
                )}`
              : "Não"
          }
        />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.4fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="mb-4 font-semibold">Dados da jornada</h2>
          <dl className="space-y-3 text-sm">
            <Row label="Produto" value={String(journey.product_id || "—")} />
            <Row label="Oferta" value={journey.offer_code || "—"} />
            <Row label="Transação" value={journey.transaction_id || "—"} />
            <Row
              label="Recovery allowed"
              value={journey.recovery_allowed ? "true" : "false"}
            />
            <Row label="Próxima etapa" value={formatDateTime(journey.next_step_at)} />
            <Row label="Aprovada em" value={formatDateTime(journey.approved_at)} />
            <Row label="Atualizada em" value={formatDateTime(journey.updated_at)} />
          </dl>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="font-semibold">Linha do tempo</h2>
          <p className="mb-5 text-sm text-slate-500">
            Eventos Hotmart relacionados + logs sintéticos de e-mail.
          </p>

          <div className="space-y-4">
            {timeline.length ? (
              timeline.map((item, index) => (
                <div key={`${item.kind}-${index}`} className="flex gap-4">
                  <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-slate-950" />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-indigo-600">
                        {item.kind}
                      </span>
                      <span className="text-xs text-slate-400">
                        {formatDateTime(item.at)}
                      </span>
                    </div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.detail}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">
                Nenhum evento relacionado foi encontrado.
              </p>
            )}
          </div>
        </article>
      </section>
    </>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <div className="mt-2 text-sm font-semibold">{value}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0">
      <dt className="text-slate-500">{label}</dt>
      <dd className="max-w-[60%] break-all text-right font-medium">{value}</dd>
    </div>
  );
}
