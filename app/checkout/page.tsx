import { InfoPage } from "@/components/storefront";
import { getCatalogProducts } from "@/lib/catalog-data";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ buyNow?: string }>;
}) {
  const { buyNow } = await searchParams;
  const products = await getCatalogProducts();
  const product = buyNow ? products.find((item) => item.slug === buyNow) : undefined;

  return (
    <InfoPage title="Checkout" description="Complete your purchase through a secure Paystack flow and delivery confirmation.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        {buyNow && !product ? (
          <p className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            The selected product could not be found. Please return to the shop and choose an available item.
          </p>
        ) : null}
        {product ? (
          <div className="mb-6 flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <img src={product.image} alt={product.title} className="h-20 w-20 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-900">{product.title}</p>
              <p className="mt-1 text-sm text-slate-600">Quantity: 1</p>
            </div>
            <p className="font-semibold text-[#193B8C]">₦{product.price.toLocaleString()}</p>
          </div>
        ) : null}
        {product && product.price <= 0 ? (
          <p role="status" className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            We need to confirm the price and availability of this item before checkout. Please contact RecetTech or return to the product page.
          </p>
        ) : null}
        {product && product.price <= 0 ? null : (
          <form className="grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Full name" />
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Email address" />
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:col-span-2" placeholder="Delivery address" />
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Phone number" />
            <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Payment method" />
            <button className="rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white md:col-span-2">Pay with Paystack</button>
          </form>
        )}
      </div>
    </InfoPage>
  );
}