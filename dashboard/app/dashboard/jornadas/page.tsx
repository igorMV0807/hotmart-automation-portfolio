import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { formatDateTime, formatMoney } from "@/lib/format";
import { getJourneys } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function JourneysPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const params = await searchParams;
  const q = (params.q || "").trim().toLowerCase();
  const status = (params.status || "").trim().toUpperCase();

  let journeys = await getJourneys();

  if (q) {
    journeys = journeys.filter((j) =>
      [
        j.buyer_name,
        j.buyer_email,
        j.transaction_id,
        j.offer_code,
        String(j.product_id || ""),
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }

  if (status) {
    journeys = journeys.filter(
      (j) => String(j.current_status || "").toUpperCase() === status
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Jornadas"
        title="Compras e recuperações"
        description="Estado atual de cada purchase_journey, sem modificar nenhum dado."
      />

      <form className="mb-5 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_220px_auto]">
        <input
          name="q"
          defaultValue={params.q || ""}
          placeholder="Nome, e-mail, transação, oferta..."
          className="rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500"
        />
        <select
          name="status"
          defaultValue={params.status || ""}
          className="rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500"
        >
          <option value="">Todos os status</option>
          {[
            "ABANDONED",
            "WAITING_PAYMENT",
            "APPROVED",
            "COMPLETED",
            "CANCELED",
            "DELAYED",
            "EXPIRED",
            "REFUND_REQUESTED",
            "REFUNDED",
            "CHARGEBACK",
          ].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-medium text-white">
          Filtrar
        </button>
      </form>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3">Cliente</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Fluxo</th>
                <th className="px-5 py-3">Etapa</th>
                <th className="px-5 py-3">Recuperada</th>
                <th className="px-5 py-3">Receita</th>
                <th className="px-5 py-3">Atualização</th>
              </tr>
            </thead>
            <tbody>
              {journeys.slice(0, 500).map((journey) => (
                <tr
                  key={journey.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/dashboard/jornadas/${journey.id}`}
                      className="font-medium hover:text-indigo-600"
                    >
                      {journey.buyer_name || "Sem nome"}
                    </Link>
                    <p className="text-xs text-slate-400">
                      {journey.buyer_email || "—"}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge value={journey.current_status} />
                  </td>
                  <td className="px-5 py-4">{journey.recovery_flow || "—"}</td>
                  <td className="px-5 py-4">
                    {Number(journey.last_step_sent || 0)}
                  </td>
                  <td className="px-5 py-4">
                    {journey.recovered ? `✅ Etapa ${journey.recovered_step}` : "—"}
                  </td>
                  <td className="px-5 py-4">
                    {journey.recovered
                      ? formatMoney(
                          journey.recovered_revenue,
                          journey.currency || "BRL"
                        )
                      : "—"}
                  </td>
                  <td className="px-5 py-4 text-slate-500">
                    {formatDateTime(journey.updated_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {journeys.length > 500 && (
        <p className="mt-3 text-xs text-slate-400">
          A tela mostra as 500 primeiras jornadas após o filtro. Os cálculos do
          dashboard continuam usando todas as linhas paginadas do Supabase.
        </p>
      )}
    </>
  );
}
