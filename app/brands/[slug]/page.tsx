import { notFound } from "next/navigation";
import { ProductListing } from "@/components/product-listing";
import { InfoPage } from "@/components/storefront";
import { getCatalogBrands, getCatalogProducts } from "@/lib/catalog-data";

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [brands, products] = await Promise.all([getCatalogBrands(), getCatalogProducts()]);
  const brand = brands.find((item) => item.slug === slug);

  if (!brand) {
    notFound();
  }

  const brandProducts = products.filter((product) => product.brand.toLowerCase() === brand.name.toLowerCase());

  return (
    <InfoPage title={brand.name} description={brand.description}>
      <div className="mb-8 flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
          <img src={brand.logo} alt={`${brand.name} logo`} className="h-full w-full object-contain p-3" />
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Brand showcase</p>
          <p className="mt-1 text-lg text-slate-700">{brandProducts.length} products available</p>
        </div>
      </div>
      <ProductListing
        products={brandProducts}
        pageSize={16}
        searchLabel={`Search ${brand.name} products`}
        emptyMessage={`No ${brand.name} products match your search.`}
      />
    </InfoPage>
  );
}
