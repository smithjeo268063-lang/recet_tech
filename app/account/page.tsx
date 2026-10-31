import { InfoPage } from "@/components/storefront";

export default function AccountPage() {
  return (
    <InfoPage title="My account" description="Manage your purchases, addresses, wishlist, service requests and device history.">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><h2 className="text-xl font-semibold text-slate-900">Recent orders</h2><p className="mt-4 text-sm leading-7 text-slate-600">Order history and payment status are protected and customer-specific.</p></div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><h2 className="text-xl font-semibold text-slate-900">Saved items</h2><p className="mt-4 text-sm leading-7 text-slate-600">Wishlist items and repair requests can be managed in one place.</p></div>
      </div>
    </InfoPage>
  );
}