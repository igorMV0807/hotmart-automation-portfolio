import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getServerEnv } from "@/lib/env";

let cached: ReturnType<typeof createClient> | null = null;

export function getAdminClient() {
  if (cached) return cached;

  const { url, serviceRoleKey } = getServerEnv();

  cached = createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return cached;
}
