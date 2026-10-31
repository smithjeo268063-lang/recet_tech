import { InfoPage } from "@/components/storefront";
import { ProductCard } from "@/components/product-card";
import { getCatalogProducts } from "@/lib/catalog-data";

export default async function AccessoriesPage() {
  const products = await getCatalogProducts();
  return (
    <InfoPage title="Accessories" description="Chargers, cables, power banks and practical gear built for everyday mobile life.">
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 xl:gap-8">
        {products.filter((product) => product.category === "Accessories").map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </InfoPage>
  );
}