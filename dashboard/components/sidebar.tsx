import Link from "next/link";
import {
  Activity,
  Gauge,
  Mail,
  Route,
  ShoppingBag,
  LogOut,
} from "lucide-react";

const links = [
  { href: "/dashboard", label: "Visão geral", icon: Gauge },
  { href: "/dashboard/jornadas", label: "Jornadas", icon: Route },
  { href: "/dashboard/emails", label: "E-mails", icon: Mail },
  { href: "/dashboard/eventos", label: "Eventos", icon: Activity },
];

export function Sidebar({
  email,
  demoMode = false,
}: {
  email?: string | null;
  demoMode?: boolean;
}) {
  return (
    <aside className="border-b border-slate-200 bg-slate-950 text-white lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col p-5">
        <Link href="/dashboard" className="mb-8 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500">
            <ShoppingBag size={20} />
          </div>
          <div>
            <div className="text-sm font-semibold">Hotmart Recovery</div>
            <div className="text-xs text-slate-400">Dashboard</div>
          </div>
        </Link>

        <nav className="grid gap-1 sm:grid-cols-4 lg:grid-cols-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 lg:mt-auto">
          {demoMode && (
            <div className="mb-4 rounded-xl border border-indigo-400/30 bg-indigo-400/10 px-3 py-2 text-xs font-medium text-indigo-200">
              DADOS 100% SINTÉTICOS
            </div>
          )}
          <div className="mb-3 truncate text-xs text-slate-500">{email}</div>
          {!demoMode && (
            <form action="/auth/signout" method="post">
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
                <LogOut size={18} />
                Sair
              </button>
            </form>
          )}
        </div>
      </div>
    </aside>
  );
}
