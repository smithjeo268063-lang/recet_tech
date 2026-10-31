import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";

export async function requireAdmin(request?: NextRequest) {
  const token = request
    ? request.cookies.get(ADMIN_SESSION_COOKIE)?.value
    : (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;

  if (await verifyAdminSession(token)) {
    return null;
  }

  return NextResponse.json({ error: "You must be signed in as an administrator." }, { status: 401 });
}

export function isSameOriginRequest(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) {
    return false;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function errorMetadata(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
    };
  }

  if (error && typeof error === "object") {
    const candidate = error as Record<string, unknown>;
    return {
      name: typeof candidate.name === "string" ? candidate.name : "SupabaseError",
      message: typeof candidate.message === "string" ? candidate.message : undefined,
      code: typeof candidate.code === "string" ? candidate.code : undefined,
      details: typeof candidate.details === "string" ? candidate.details : undefined,
      hint: typeof candidate.hint === "string" ? candidate.hint : undefined,
    };
  }

  return { name: "UnknownError", message: String(error) };
}

export function errorResponse(error: unknown, diagnostics?: { requestId: string; stage: string }) {
  const metadata = errorMetadata(error);
  const messageParts = [metadata.message, metadata.details, metadata.hint].filter(Boolean);
  const message = messageParts.join(" ") || "The request could not be completed.";
  const status = metadata.name === "AdminConfigurationError" ? 503 : 500;

  console.error("[admin-api] request failed", {
    ...diagnostics,
    error: metadata,
  });

  return NextResponse.json({
    error: message,
    ...(diagnostics ? { requestId: diagnostics.requestId, stage: diagnostics.stage } : {}),
    ...(metadata.code ? { code: metadata.code } : {}),
  }, {
    status,
    headers: diagnostics ? { "x-request-id": diagnostics.requestId } : undefined,
  });
}
