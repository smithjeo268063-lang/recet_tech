import { InfoPage } from "@/components/storefront";
import { ProductCard } from "@/components/product-card";
import { getCatalogProducts } from "@/lib/catalog-data";

export default async function NewArrivalsPage() {
  const products = await getCatalogProducts();
  return (
    <InfoPage title="New arrivals" description="Explore newly launched technology with the latest features and fresh inventory.">
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 xl:gap-8">
        {products.filter((product) => product.isNew).map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </InfoPage>
  );
}