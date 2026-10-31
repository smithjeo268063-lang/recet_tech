import { InfoPage } from "@/components/storefront";

export default function OrdersPage() {
  return (
    <InfoPage title="Orders" description="View your purchase history, payment status and shipping updates.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm leading-7 text-slate-600">No recent orders yet. Once installed with a database-backed auth flow, your order history will appear here.</p>
      </div>
    </InfoPage>
  );
}