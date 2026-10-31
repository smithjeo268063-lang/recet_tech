import "server-only";
import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.RECETTECH_SUPABASE_SERVICE_ROLE_KEY;

  const missing = [];
  if (!url?.trim()) missing.push("SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)");
  if (!serviceRoleKey?.trim()) {
    missing.push("SUPABASE_SECRET_KEY (or RECETTECH_SUPABASE_SERVICE_ROLE_KEY)");
  }

  if (missing.length > 0) {
    const error = new Error(
      `Admin Supabase setup is incomplete. Add ${missing.join(" and ")} to .env.local, then restart Next.js.`,
    );
    error.name = "AdminConfigurationError";
    throw error;
  }

  return createClient(url!, serviceRoleKey!, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
