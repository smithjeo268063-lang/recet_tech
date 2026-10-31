import { NextResponse, type NextRequest } from "next/server";
import { errorResponse, requireAdmin, isSameOriginRequest } from "@/lib/admin-api";
import { parseBrand, errorStatus } from "@/lib/catalog-validation";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { data, error } = await createAdminClient()
      .from("catalog_brands")
      .select("*")
      .order("name");
    if (error) throw error;
    return NextResponse.json({ brands: data });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const brand = parseBrand(await request.json());
    const { data, error } = await createAdminClient()
      .from("catalog_brands")
      .insert(brand)
      .select("*")
      .single();
    if (error) throw error;
    return NextResponse.json({ brand: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not create brand." },
      { status: errorStatus(error) },
    );
  }
}
