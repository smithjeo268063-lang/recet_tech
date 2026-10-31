import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "recettech_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

export function adminConfigurationError() {
  const missing = [
    ["RECETTECH_ADMIN_USERNAME", process.env.RECETTECH_ADMIN_USERNAME],
    ["RECETTECH_ADMIN_PASSWORD", process.env.RECETTECH_ADMIN_PASSWORD],
  ].filter(([, value]) => !value).map(([name]) => name);

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseSecret =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.RECETTECH_SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl?.trim()) {
    missing.push("SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)");
  }
  if (!supabaseSecret?.trim()) {
    missing.push("SUPABASE_SECRET_KEY (or RECETTECH_SUPABASE_SERVICE_ROLE_KEY)");
  }

  return missing.length > 0
    ? `Admin setup is incomplete. Configure ${missing.join(", ")} in .env.local and restart Next.js.`
    : null;
}

function sessionSignature(expiresAt: string) {
  const serviceKey =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.RECETTECH_SUPABASE_SERVICE_ROLE_KEY;
  const password = process.env.RECETTECH_ADMIN_PASSWORD;
  const username = process.env.RECETTECH_ADMIN_USERNAME;

  if (!serviceKey || !password || !username) {
    return null;
  }

  return createHmac("sha256", serviceKey)
    .update(`${expiresAt}:${username}:${password}`)
    .digest("base64url");
}

function constantTimeEqual(left: string, right: string) {
  const leftDigest = createHmac("sha256", "recettech-admin-compare").update(left).digest();
  const rightDigest = createHmac("sha256", "recettech-admin-compare").update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

export function verifyAdminCredentials(username: unknown, password: unknown) {
  const expectedUsername = process.env.RECETTECH_ADMIN_USERNAME;
  const expectedPassword = process.env.RECETTECH_ADMIN_PASSWORD;

  return Boolean(
    expectedUsername &&
      expectedPassword &&
      typeof username === "string" &&
      typeof password === "string" &&
      constantTimeEqual(username, expectedUsername) &&
      constantTimeEqual(password, expectedPassword),
  );
}

export function createAdminSession() {
  const expiresAt = String(Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS);
  const signature = sessionSignature(expiresAt);

  if (!signature) {
    throw new Error("Admin credentials and the Supabase secret key must be configured.");
  }

  return { token: `${expiresAt}.${signature}`, maxAge: SESSION_DURATION_SECONDS };
}

export async function verifyAdminSession(token: string | undefined) {
  if (!token) {
    return false;
  }

  const [expiresAt, signature, ...extra] = token.split(".");
  const expectedSignature = sessionSignature(expiresAt ?? "");

  if (
    extra.length > 0 ||
    !expiresAt ||
    !/^\d+$/.test(expiresAt) ||
    Number(expiresAt) <= Math.floor(Date.now() / 1000) ||
    !signature ||
    !expectedSignature
  ) {
    return false;
  }

  return constantTimeEqual(signature, expectedSignature);
}
