import { NextResponse, type NextRequest } from "next/server";
import { errorResponse, requireAdmin, isSameOriginRequest } from "@/lib/admin-api";
import { parseProduct, errorStatus } from "@/lib/catalog-validation";
import { createAdminClient } from "@/lib/supabase/admin";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    const { id } = await context.params;
    if (!/^\d+$/.test(id)) {
      return NextResponse.json({ error: "Invalid product id." }, { status: 400 });
    }
    const payload: unknown = await request.json();
    if (payload && typeof payload === "object" && "inventory" in payload && Object.keys(payload).length === 1) {
      const inventory = Number(payload.inventory);
      if (!Number.isSafeInteger(inventory) || inventory < 0) {
        return NextResponse.json({ error: "Inventory must be a non-negative whole number." }, { status: 400 });
      }
      const { data, error } = await createAdminClient()
        .from("catalog_products")
        .update({ inventory, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select("*")
        .maybeSingle();
      if (error) throw error;
      if (!data) return NextResponse.json({ error: "Product not found." }, { status: 404 });
      return NextResponse.json({ product: data });
    }

    const product = parseProduct(payload);
    const { data, error } = await createAdminClient()
      .from("catalog_products")
      .update({ ...product, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select("*")
      .maybeSingle();
    if (error) throw error;
    if (!data) return NextResponse.json({ error: "Product not found." }, { status: 404 });
    return NextResponse.json({ product: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not update product." },
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
    const { id } = await context.params;
    if (!/^\d+$/.test(id)) {
      return NextResponse.json({ error: "Invalid product id." }, { status: 400 });
    }
    const { error, count } = await createAdminClient()
      .from("catalog_products")
      .delete({ count: "exact" })
      .eq("id", id);
    if (error) throw error;
    if (!count) return NextResponse.json({ error: "Product not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse(error);
  }
}
