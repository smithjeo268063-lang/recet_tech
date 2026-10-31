import { InfoPage } from "@/components/storefront";
import { CartContents } from "@/components/cart-contents";
import { getCatalogProducts } from "@/lib/catalog-data";

export default async function CartPage() {
  const products = await getCatalogProducts();
  return (
    <InfoPage title="Your cart" description="Review your selected items and continue to a secure checkout.">
      <CartContents products={products} />
    </InfoPage>
  );
}