import type { Product } from "@/lib/site-data";
import { products as starterProducts, brands as starterBrands, categories as starterCategories } from "@/lib/site-data";
import { getCatalogProductSummary } from "@/lib/additional-catalog";
import { createClient } from "@/lib/supabase/server";
import type { StorefrontContent } from "@/lib/catalog-validation";

export type CatalogBrand = {
  slug: string;
  name: string;
  description: string;
  logo: string;
};

export type CatalogCategory = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

const defaultContent: StorefrontContent = {
  announcement: "",
  hero_title: "Smarter tech for work, play and everyday life.",
  hero_description:
    "Discover flagship phones, laptops, accessories and repair support all curated for speed, reliability and modern living.",
};

function stringList(value: unknown): string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
}

function specificationList(value: unknown): { label: string; value: string }[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const entry = item as { label?: unknown; value?: unknown };
    if (typeof entry.label !== "string" || typeof entry.value !== "string") return [];
    return [{ label: entry.label, value: entry.value }];
  });
}

function mapProduct(row: Record<string, unknown>): Product {
  const id = Number(row.id);
  if (!Number.isSafeInteger(id)) {
    throw new Error("A catalog product has an invalid numeric ID.");
  }

  const title = String(row.title);
  const category = String(row.category);
  const summary = String(row.summary ?? "");

  return {
    id,
    slug: String(row.slug),
    title,
    category,
    brand: String(row.brand),
    price: Number(row.price),
    compareAt: Number(row.compare_at),
    rating: Number(row.rating),
    reviews: Number(row.reviews),
    image: String(row.image ?? ""),
    images: stringList(row.images),
    summary: summary === "Contact our team to confirm current price, configuration, and availability."
      ? getCatalogProductSummary(category)
      : summary,
    tags: stringList(row.tags),
    features: stringList(row.features),
    specifications: specificationList(row.specifications),
    inventory: Number(row.inventory),
    isFeatured: row.is_featured === true,
    isNew: row.is_new === true,
    isDeal: row.is_deal === true,
    isUkUsed: row.is_uk_used === true,
  };
}

function isMissingCatalogTableError(error: { message?: string } | null) {
  if (!error || !error.message) return false;

  const message = error.message.toLowerCase();
  return (
    message.includes("does not exist") ||
    (message.includes("relation") && message.includes("does not exist")) ||
    message.includes("could not find the table") ||
    message.includes("in the schema cache") ||
    message.includes("not found") ||
    message.includes("permission denied")
  );
}

function throwQueryError(action: string, error: { message: string } | null) {
  if (error && !isMissingCatalogTableError(error)) {
    throw new Error(`Could not ${action}: ${error.message}`);
  }
}

async function isCatalogInitialized() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("storefront_content")
    .select("key")
    .eq("key", "catalog_initialized")
    .maybeSingle();
  throwQueryError("check catalog setup", error);
  return Boolean(data);
}

export async function getCatalogProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("catalog_products")
    .select("*")
    .eq("is_published", true)
    .order("title")
    .limit(5000);
  throwQueryError("load storefront products", error);

  if (await isCatalogInitialized()) {
    return (data ?? []).map((row) => mapProduct(row));
  }
  const publishedStarterProducts = starterProducts.filter((product) => product.isPublished !== false);
  if (!data?.length) return publishedStarterProducts;

  const merged = new Map(publishedStarterProducts.map((product) => [product.slug, product]));
  for (const row of data) {
    const product = mapProduct(row);
    merged.set(product.slug, product);
  }
  return Array.from(merged.values());
}

export async function getCatalogBrands(): Promise<CatalogBrand[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("catalog_brands")
    .select("slug, name, description, logo")
    .eq("is_active", true)
    .order("name");
  throwQueryError("load storefront brands", error);

  if (await isCatalogInitialized()) return data ?? [];
  if (!data?.length) return starterBrands;
  const merged = new Map(starterBrands.map((brand) => [brand.slug, brand]));
  for (const brand of data) {
    merged.set(brand.slug, brand);
  }
  return Array.from(merged.values());
}

export async function getCatalogCategories(): Promise<CatalogCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("catalog_categories")
    .select("slug, title, description, image")
    .eq("is_active", true)
    .order("title");
  throwQueryError("load storefront categories", error);

  if (await isCatalogInitialized()) return data ?? [];
  if (!data?.length) return starterCategories;
  const merged = new Map(starterCategories.map((category) => [category.slug, category]));
  for (const category of data) {
    merged.set(category.slug, category);
  }
  return Array.from(merged.values());
}

export async function getStorefrontContent(): Promise<StorefrontContent> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("storefront_content")
    .select("value")
    .eq("key", "storefront")
    .maybeSingle();
  throwQueryError("load storefront content", error);

  if (!data?.value || typeof data.value !== "object" || Array.isArray(data.value)) {
    return defaultContent;
  }

  const content = data.value as Partial<StorefrontContent>;
  return {
    announcement: typeof content.announcement === "string" ? content.announcement : defaultContent.announcement,
    hero_title: typeof content.hero_title === "string" ? content.hero_title : defaultContent.hero_title,
    hero_description: typeof content.hero_description === "string" ? content.hero_description : defaultContent.hero_description,
  };
}

export async function getProductsForCatalogCategory(slug: string): Promise<Product[]> {
  const [categories, products] = await Promise.all([getCatalogCategories(), getCatalogProducts()]);
  const category = categories.find((item) => item.slug === slug);
  if (!category) return [];

  const categoryTitle = category.title.toLowerCase();
  const aliases: Record<string, string[]> = {
    "mobile phones": ["phones"],
    "laptops and computers": ["laptops"],
    "uk used phones": ["phones"],
    "uk used laptops": ["laptops"],
  };
  const matchingNames = [categoryTitle, ...(aliases[categoryTitle] ?? [])];
  return products.filter((product) => {
    const productCategory = product.category.toLowerCase();
    if (!matchingNames.includes(productCategory)) return false;
    if (categoryTitle === "uk used phones" || categoryTitle === "uk used laptops") return product.isUkUsed;
    return true;
  });
}
