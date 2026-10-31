import { InfoPage } from "@/components/storefront";
import { ProductCard } from "@/components/product-card";
import { getCatalogProducts } from "@/lib/catalog-data";

export default async function UKUsedPage() {
  const products = await getCatalogProducts();
  return (
    <InfoPage title="UK-used devices" description="Certified pre-owned phones and laptops with quality checks and dependable warranty coverage.">
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 xl:gap-8">
        {products.filter((product) => product.isUkUsed).map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </InfoPage>
  );
}