import { InfoPage } from "@/components/storefront";

export default function AdminShippingPage() {
  return (
    <InfoPage title="Shipping" description="Set fees, regions and delivery rules for customer orders.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><p className="text-sm leading-7 text-slate-600">Shipping logic must reflect location-specific pricing and fulfillment rules.</p></div>
    </InfoPage>
  );
}