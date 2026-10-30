"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function RevenueLineChart({
  data,
}: {
  data: { date: string; revenue: number; recovered: number }[];
}) {
  if (!data.length) {
    return <EmptyChart />;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number, name: string) => [
              name === "revenue"
                ? new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(value))
                : value,
              name === "revenue" ? "Receita" : "Recuperadas",
            ]}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="currentColor"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StepBarChart({
  data,
}: {
  data: { step: string; recovered: number; revenue: number }[];
}) {
  if (!data.some((item) => item.recovered > 0)) {
    return <EmptyChart />;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="step" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar
            dataKey="recovered"
            fill="currentColor"
            radius={[8, 8, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function EmptyChart() {
  return (
    <div className="grid h-72 place-items-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-400">
      Ainda não há dados suficientes para este gráfico.
    </div>
  );
}
