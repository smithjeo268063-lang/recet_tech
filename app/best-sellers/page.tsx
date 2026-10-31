import { InfoPage } from "@/components/storefront";
import { ProductCard } from "@/components/product-card";
import { getCatalogProducts } from "@/lib/catalog-data";

export default async function BestSellersPage() {
  const products = await getCatalogProducts();
  return (
    <InfoPage title="Best sellers" description="The most-loved devices and accessories chosen by customers across Nigeria.">
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 xl:gap-8">
        {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </InfoPage>
  );
}