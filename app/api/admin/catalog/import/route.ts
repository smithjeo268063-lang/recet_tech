import { NextResponse, type NextRequest } from "next/server";
import { errorResponse, requireAdmin, isSameOriginRequest } from "@/lib/admin-api";
import { brands, categories, products } from "@/lib/site-data";
import { createAdminClient } from "@/lib/supabase/admin";

async function upsertBatches(
  table: "catalog_brands" | "catalog_categories" | "catalog_products",
  rows: Record<string, unknown>[],
  ignoreDuplicates = true,
) {
  const supabase = createAdminClient();
  for (let index = 0; index < rows.length; index += 100) {
    const { error } = await supabase
      .from(table)
      .upsert(rows.slice(index, index + 100), { onConflict: "slug", ignoreDuplicates });
    if (error) throw error;
  }
}

function productRow(product: (typeof products)[number], includeId = true) {
  return {
    ...(includeId ? { id: product.id } : {}),
    slug: product.slug,
    title: product.title,
    category: product.category,
    brand: product.brand,
    price: product.price,
    compare_at: product.compareAt,
    rating: product.rating,
    reviews: product.reviews,
    image: product.image,
    images: product.images,
    summary: product.summary,
    tags: product.tags,
    features: product.features,
    specifications: product.specifications,
    inventory: product.inventory,
    is_featured: product.isFeatured,
    is_new: product.isNew,
    is_deal: product.isDeal,
    is_uk_used: product.isUkUsed,
    is_published: product.isPublished ?? true,
  };
}

async function addRequestedProducts() {
  const supabase = createAdminClient();
  const requestedProducts = products.filter((product) => product.id >= 100000);
  const slugs = requestedProducts.map((product) => product.slug);
  const { data: existing, error: lookupError } = await supabase
    .from("catalog_products")
    .select("slug, is_published")
    .in("slug", slugs);
  if (lookupError) throw lookupError;

  const existingProducts = new Map((existing ?? []).map((product) => [product.slug, product]));
  const missingProducts = requestedProducts.filter((product) => !existingProducts.has(product.slug));
  const previouslyDraftedSlugs = requestedProducts
    .filter((product) => existingProducts.get(product.slug)?.is_published === false)
    .map((product) => product.slug);

  await upsertBatches(
    "catalog_products",
    missingProducts.map((product) => productRow(product, false)),
  );
  if (previouslyDraftedSlugs.length > 0) {
    const { error } = await supabase
      .from("catalog_products")
      .update({ is_published: true, updated_at: new Date().toISOString() })
      .in("slug", previouslyDraftedSlugs);
    if (error) throw error;
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  try {
    await upsertBatches(
      "catalog_brands",
      brands.map(({ slug, name, description, logo }) => ({
        slug,
        name,
        description,
        logo,
        is_active: true,
      })),
    );
    await upsertBatches(
      "catalog_categories",
      categories.map(({ slug, title, description, image }) => ({
        slug,
        title,
        description,
        image,
        is_active: true,
      })),
    );
    await upsertBatches(
      "catalog_products",
      products.filter((product) => product.id < 100000).map((product) => productRow(product)),
    );
    await addRequestedProducts();
    const { error: markerError } = await createAdminClient()
      .from("storefront_content")
      .upsert(
        { key: "catalog_initialized", value: { completed: true }, updated_at: new Date().toISOString() },
        { onConflict: "key" },
      );
    if (markerError) throw markerError;
    return NextResponse.json({
      imported: { brands: brands.length, categories: categories.length, products: products.length },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
