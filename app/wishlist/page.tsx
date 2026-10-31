import { InfoPage } from "@/components/storefront";
import { ProductCard } from "@/components/product-card";
import { getCatalogProducts } from "@/lib/catalog-data";

export default async function WishlistPage() {
  const products = await getCatalogProducts();
  return (
    <InfoPage title="Wishlist" description="Save your favorite gadgets and compare them later before purchase.">
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 xl:gap-8">
        {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </InfoPage>
  );
}