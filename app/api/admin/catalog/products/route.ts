import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { errorResponse, requireAdmin, isSameOriginRequest } from "@/lib/admin-api";
import { parseProduct, errorStatus } from "@/lib/catalog-validation";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const requestId = randomUUID();
  let stage = "admin-authentication";
  console.info("[admin-products] request started", { requestId, method: "GET" });
  try {
    const unauthorized = await requireAdmin(request);
    if (unauthorized) {
      console.warn("[admin-products] authentication rejected", { requestId });
      unauthorized.headers.set("x-request-id", requestId);
      return unauthorized;
    }

    console.info("[admin-products] authentication passed", { requestId });
    stage = "supabase-client-initialization";
    console.info("[admin-products] initializing Supabase admin client", { requestId });
    const supabase = createAdminClient();

    stage = "catalog-products-query";
    console.info("[admin-products] querying catalog_products", { requestId, limit: 5000 });
    const { data, error } = await supabase
      .from("catalog_products")
      .select("*")
      .order("title")
      .limit(5000);
    if (error) throw error;

    console.info("[admin-products] query succeeded", {
      requestId,
      productCount: data?.length ?? 0,
    });
    return NextResponse.json(
      { products: data, requestId },
      { headers: { "x-request-id": requestId } },
    );
  } catch (error) {
    return errorResponse(error, { requestId, stage });
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    console.info("[admin-products] create request started");
    const product = parseProduct(await request.json());
    console.info("[admin-products] product payload validated", { slug: product.slug });
    const { data, error } = await createAdminClient()
      .from("catalog_products")
      .insert(product)
      .select("*")
      .single();
    if (error) throw error;
    console.info("[admin-products] product created", { productId: data.id, slug: data.slug });
    return NextResponse.json({ product: data }, { status: 201 });
  } catch (error) {
    console.error("[admin-products] product creation failed", error);
    return NextResponse.json(
      {
        error: error instanceof Error
          ? error.message
          : error && typeof error === "object" && "message" in error && typeof error.message === "string"
            ? error.message
            : "Could not create product.",
      },
      { status: errorStatus(error) },
    );
  }
}
