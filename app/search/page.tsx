import { InfoPage } from "@/components/storefront";
import { ProductCard } from "@/components/product-card";
import { getCatalogProducts } from "@/lib/catalog-data";

export default async function SearchPage() {
  const products = await getCatalogProducts();
  return (
    <InfoPage title="Search products" description="Quickly find the best devices and accessories available in our catalog.">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none ring-0" placeholder="Search for phones, laptops or accessories" />
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 xl:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </InfoPage>
  );
}
