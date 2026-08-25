import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { formatDateTime, formatMoney } from "@/lib/format";
import { getEvents } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHeader
        eyebrow="Eventos"
        title="Eventos recebidos da Hotmart"
        description="Leitura da tabela hotmart_events. Esta tela ajuda a investigar falhas de processamento sem abrir o Supabase."
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3">Evento</th>
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Compra</th>
                <th className="px-5 py-3">Processado</th>
                <th className="px-5 py-3">Erro</th>
                <th className="px-5 py-3">Recebido</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-t border-slate-100 align-top">
                  <td className="px-5 py-4">
                    <p className="font-medium">{event.event_type || "—"}</p>
                    <p className="text-xs text-slate-400">
                      {event.transaction_id || event.event_id || "—"}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p>{event.buyer_name || "—"}</p>
                    <p className="text-xs text-slate-400">{event.buyer_email || "—"}</p>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge value={event.purchase_status} />
                    {event.price != null && (
                      <p className="mt-2 text-xs text-slate-500">
                        {formatMoney(event.price, event.currency || "BRL")}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {event.processed ? "✅ Sim" : "⏳ Não"}
                  </td>
                  <td className="max-w-sm px-5 py-4 text-xs text-rose-600">
                    {event.processing_error || "—"}
                  </td>
                  <td className="px-5 py-4 text-slate-500">
                    {formatDateTime(event.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
