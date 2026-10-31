import { InfoPage } from "@/components/storefront";

export default function AdminOrdersPage() {
  return (
    <InfoPage title="Order management" description="Review transactions, shipments and fulfillment details for customer orders.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><p className="text-sm leading-7 text-slate-600">This section can connect to payment, shipping and stock records.</p></div>
    </InfoPage>
  );
}