import { InfoPage } from "@/components/storefront";
import { ProductCard } from "@/components/product-card";
import { getCatalogProducts } from "@/lib/catalog-data";

export default async function AccountWishlistPage() {
  const products = await getCatalogProducts();
  return (
    <InfoPage title="Saved items" description="Keep track of your favorite devices and accessories for later purchase.">
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 xl:gap-8">
        {products.slice(0, 2).map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </InfoPage>
  );
}