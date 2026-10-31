import { NextResponse, type NextRequest } from "next/server";
import { errorResponse, requireAdmin, isSameOriginRequest } from "@/lib/admin-api";
import { parseStorefrontContent, errorStatus } from "@/lib/catalog-validation";
import { createAdminClient } from "@/lib/supabase/admin";

const CONTENT_KEY = "storefront";

const defaultContent = {
  announcement: "",
  hero_title: "Smarter tech for work, play and everyday life.",
  hero_description:
    "Discover flagship phones, laptops, accessories and repair support all curated for speed, reliability and modern living.",
};

export async function GET(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { data, error } = await createAdminClient()
      .from("storefront_content")
      .select("value")
      .eq("key", CONTENT_KEY)
      .maybeSingle();
    if (error) throw error;
    return NextResponse.json({ content: data?.value ?? defaultContent });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const content = parseStorefrontContent(await request.json());
    const { error } = await createAdminClient()
      .from("storefront_content")
      .upsert(
        { key: CONTENT_KEY, value: content, updated_at: new Date().toISOString() },
        { onConflict: "key" },
      );
    if (error) throw error;
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save storefront content." },
      { status: errorStatus(error) },
    );
  }
}
