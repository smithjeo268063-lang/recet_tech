import { InfoPage } from "@/components/storefront";

export default function ShippingPolicyPage() {
  return (
    <InfoPage title="Shipping policy" description="Delivery timelines, conditions and responsibilities for customer orders.">
      <p className="text-sm leading-7 text-slate-600">Orders are processed and dispatched according to inventory availability and delivery location. Customers can track shipping status through the order tracking page.</p>
    </InfoPage>
  );
}