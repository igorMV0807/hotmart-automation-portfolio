export function getPublicEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "Supabase Auth não configurado. Preencha NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    );
  }

  return { url, publishableKey };
}

export function getServerEnv() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY não configurada. Essa variável deve existir somente no servidor."
    );
  }

  return {
    ...getPublicEnv(),
    serviceRoleKey,
    timezone: process.env.APP_TIMEZONE || "America/Sao_Paulo",
  };
}

export function getAllowedEmails() {
  return (process.env.DASHBOARD_ALLOWED_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isPortfolioDemoMode() {
  return process.env.PORTFOLIO_DEMO_MODE !== 'false';
}
