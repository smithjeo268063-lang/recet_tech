import Link from "next/link";
import { ProductListing } from "@/components/product-listing";
import { SectionHeading } from "@/components/storefront";
import { getCatalogCategories, getCatalogProducts } from "@/lib/catalog-data";

export default async function ShopPage() {
  const [categories, products] = await Promise.all([getCatalogCategories(), getCatalogProducts()]);
  return (
    <main className="mx-auto max-w-7xl px-3.5 py-16 sm:px-6">
      <SectionHeading eyebrow="Catalogue" title="Shop premium electronics" description="Browse our curated range of phones, laptops, accessories and smart gadgets." />
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-[#193B8C] hover:text-[#193B8C]">
            {category.title}
          </Link>
        ))}
      </div>
      <ProductListing
        products={products}
        pageSize={20}
        searchLabel="Search products by name, brand, or category"
        emptyMessage="No products match your search. Try another name or brand."
      />
    </main>
  );
}
