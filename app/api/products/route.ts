import { NextResponse } from "next/server";
import type { Product } from "@/lib/site-data";
import { getCatalogBrands, getCatalogCategories, getCatalogProducts, getProductsForCatalogCategory } from "@/lib/catalog-data";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const [brands, categories, products] = await Promise.all([
    getCatalogBrands(),
    getCatalogCategories(),
    getCatalogProducts(),
  ]);
  const categoryFilter = searchParams.get("category")?.trim().toLowerCase();
  const brandFilter = searchParams.get("brand")?.trim().toLowerCase();
  const groupByParam = searchParams.get("groupBy")?.trim().toLowerCase();

  if (groupByParam && groupByParam !== "category" && groupByParam !== "brand") {
    return NextResponse.json({ error: "groupBy must be either 'category' or 'brand'." }, { status: 400 });
  }
  const groupBy = groupByParam === "category" || groupByParam === "brand" ? groupByParam : null;

  let filteredProducts = products;

  if (categoryFilter) {
    const category = categories.find((item) =>
      item.slug.toLowerCase() === categoryFilter || item.title.toLowerCase() === categoryFilter,
    );
    filteredProducts = category
      ? await getProductsForCatalogCategory(category.slug)
      : filteredProducts.filter((product) => product.category.toLowerCase() === categoryFilter);
  }

  if (brandFilter) {
    const brand = brands.find((item) =>
      item.slug.toLowerCase() === brandFilter || item.name.toLowerCase() === brandFilter,
    );
    filteredProducts = filteredProducts.filter((product) =>
      product.brand.toLowerCase() === (brand?.name.toLowerCase() ?? brandFilter),
    );
  }

  if (!groupBy) {
    return NextResponse.json({
      products: filteredProducts,
      count: filteredProducts.length,
      filters: {
        category: categoryFilter ?? null,
        brand: brandFilter ?? null,
      },
    });
  }

  const groupedProducts = filteredProducts.reduce<Record<string, Product[]>>((groups, product) => {
    const key = groupBy === "category" ? product.category : product.brand;
    groups[key] = groups[key] ?? [];
    groups[key].push(product);
    return groups;
  }, {});

  return NextResponse.json({
    products: filteredProducts,
    count: filteredProducts.length,
    filters: {
      category: categoryFilter ?? null,
      brand: brandFilter ?? null,
    },
    groupedProducts,
  });
}