import { NextResponse, type NextRequest } from "next/server";
import { errorResponse, requireAdmin, isSameOriginRequest } from "@/lib/admin-api";
import { parseBrand, errorStatus } from "@/lib/catalog-validation";
import { createAdminClient } from "@/lib/supabase/admin";

type RouteContext = { params: Promise<{ slug: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const { slug } = await context.params;
    const supabase = createAdminClient();
    const { data: currentBrand, error: currentError } = await supabase
      .from("catalog_brands")
      .select("name")
      .eq("slug", slug)
      .maybeSingle();
    if (currentError) throw currentError;
    if (!currentBrand) return NextResponse.json({ error: "Brand not found." }, { status: 404 });
    const brand = parseBrand(await request.json());
    const { data, error } = await supabase
      .from("catalog_brands")
      .update({ ...brand, updated_at: new Date().toISOString() })
      .eq("slug", slug)
      .select("*")
      .maybeSingle();
    if (error) throw error;
    if (!data) return NextResponse.json({ error: "Brand not found." }, { status: 404 });
    if (currentBrand.name !== brand.name) {
      const { error: productsError } = await supabase
        .from("catalog_products")
        .update({ brand: brand.name, updated_at: new Date().toISOString() })
        .eq("brand", currentBrand.name);
      if (productsError) throw productsError;
    }
    return NextResponse.json({ brand: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not update brand." },
      { status: errorStatus(error) },
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const { slug } = await context.params;
    const supabase = createAdminClient();
    const { data: brand, error: brandError } = await supabase
      .from("catalog_brands")
      .select("name")
      .eq("slug", slug)
      .maybeSingle();
    if (brandError) throw brandError;
    if (!brand) return NextResponse.json({ error: "Brand not found." }, { status: 404 });
    const { count, error: productsError } = await supabase
      .from("catalog_products")
      .select("id", { count: "exact", head: true })
      .eq("brand", brand.name);
    if (productsError) throw productsError;
    if (count) {
      return NextResponse.json({ error: "Reassign or delete this brand's products before deleting it." }, { status: 409 });
    }
    const { error, count: deletedCount } = await supabase
      .from("catalog_brands")
      .delete({ count: "exact" })
      .eq("slug", slug);
    if (error) throw error;
    if (!deletedCount) return NextResponse.json({ error: "Brand not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}
