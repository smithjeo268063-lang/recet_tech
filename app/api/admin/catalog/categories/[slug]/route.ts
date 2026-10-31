import { NextResponse, type NextRequest } from "next/server";
import { errorResponse, requireAdmin, isSameOriginRequest } from "@/lib/admin-api";
import { parseCategory, errorStatus } from "@/lib/catalog-validation";
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
    const category = parseCategory(await request.json());
    const { data, error } = await createAdminClient()
      .from("catalog_categories")
      .update({ ...category, updated_at: new Date().toISOString() })
      .eq("slug", slug)
      .select("*")
      .maybeSingle();
    if (error) throw error;
    if (!data) return NextResponse.json({ error: "Category not found." }, { status: 404 });
    return NextResponse.json({ category: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not update category." },
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
    const { data: category, error: categoryError } = await supabase
      .from("catalog_categories")
      .select("title")
      .eq("slug", slug)
      .maybeSingle();
    if (categoryError) throw categoryError;
    if (!category) return NextResponse.json({ error: "Category not found." }, { status: 404 });
    const { count, error: productsError } = await supabase
      .from("catalog_products")
      .select("id", { count: "exact", head: true })
      .in(
        "category",
        category.title === "Mobile Phones"
          ? [category.title, "Phones"]
          : category.title === "Laptops and Computers"
            ? [category.title, "Laptops"]
            : [category.title],
      );
    if (productsError) throw productsError;
    if (count) {
      return NextResponse.json({ error: "Reassign or delete this category's products before deleting it." }, { status: 409 });
    }
    const { error, count: deletedCount } = await supabase
      .from("catalog_categories")
      .delete({ count: "exact" })
      .eq("slug", slug);
    if (error) throw error;
    if (!deletedCount) return NextResponse.json({ error: "Category not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}
