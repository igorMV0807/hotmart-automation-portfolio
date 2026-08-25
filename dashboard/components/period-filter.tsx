import Link from "next/link";
import type { Period } from "@/types/domain";

const options: { value: Period; label: string }[] = [
  { value: "7d", label: "7 dias" },
  { value: "30d", label: "30 dias" },
  { value: "90d", label: "90 dias" },
  { value: "all", label: "Tudo" },
];

export function PeriodFilter({
  current,
  basePath,
}: {
  current: Period;
  basePath: string;
}) {
  return (
    <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
      {options.map((option) => (
        <Link
          key={option.value}
          href={`${basePath}?period=${option.value}`}
          className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
            current === option.value
              ? "bg-slate-950 text-white"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
