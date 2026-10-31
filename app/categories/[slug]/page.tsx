import { notFound } from "next/navigation";
import { ProductListing } from "@/components/product-listing";
import { InfoPage } from "@/components/storefront";
import { getCatalogCategories, getProductsForCatalogCategory } from "@/lib/catalog-data";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [categories, categoryProducts] = await Promise.all([
    getCatalogCategories(),
    getProductsForCatalogCategory(slug),
  ]);
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <InfoPage title={category.title} description={category.description}>
      <div className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <img src={category.image} alt={category.title} className="h-56 w-full object-cover md:h-72" />
      </div>
      <ProductListing
        products={categoryProducts}
        pageSize={20}
        searchLabel={`Search ${category.title}`}
        emptyMessage={`No products are currently listed in ${category.title}. Try another category or visit the shop.`}
      />
    </InfoPage>
  );
}
