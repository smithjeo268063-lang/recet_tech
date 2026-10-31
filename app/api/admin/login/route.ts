import { NextResponse, type NextRequest } from "next/server";
import { adminConfigurationError, createAdminSession, verifyAdminCredentials, ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";
import { isSameOriginRequest } from "@/lib/admin-api";

export async function POST(request: NextRequest) {
  const configurationError = adminConfigurationError();
  if (configurationError) {
    return NextResponse.json({ error: configurationError }, { status: 503 });
  }

  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  let credentials: unknown;
  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid login request." }, { status: 400 });
  }

  if (!credentials || typeof credentials !== "object") {
    return NextResponse.json({ error: "Enter your admin username and password." }, { status: 400 });
  }

  const { username, password } = credentials as { username?: unknown; password?: unknown };
  if (!verifyAdminCredentials(username, password)) {
    return NextResponse.json({ error: "The username or password is incorrect." }, { status: 401 });
  }

  try {
    const session = createAdminSession();
    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, session.token, {
      httpOnly: true,
      maxAge: session.maxAge,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Admin login is not configured.";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
