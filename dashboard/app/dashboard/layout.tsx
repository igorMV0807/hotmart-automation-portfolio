import { Sidebar } from "@/components/sidebar";
import { requireUser } from "@/lib/auth";
import { isPortfolioDemoMode } from '@/lib/env';

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  const demoMode = isPortfolioDemoMode();

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar email={user.email} demoMode={demoMode} />
      <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
        {demoMode && (
          <div className="mb-6 rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-900">
            <strong>Demo pública:</strong> todos os nomes, e-mails, transações e valores desta tela são sintéticos. Nenhuma conexão externa está ativa.
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
