import { InfoPage } from "@/components/storefront";
import { ProductCard } from "@/components/product-card";
import { getCatalogProducts } from "@/lib/catalog-data";

export default async function UKUsedPhonesPage() {
  const products = await getCatalogProducts();
  return (
    <InfoPage title="UK-used phones" description="Well-kept mobile devices with transparent condition checks and warranty-backed support.">
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 xl:gap-8">
        {products.filter((product) => product.isUkUsed && product.category === "Phones").map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </InfoPage>
  );
}