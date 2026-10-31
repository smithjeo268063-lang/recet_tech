import { InfoPage } from "@/components/storefront";

export default function OrderDetailPage() {
  return (
    <InfoPage title="Order details" description="See the payment status, progress and delivery timeline for your order.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Order #REC-1001</h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">This page can be populated with order metadata and shipping events once the database is connected.</p>
      </div>
    </InfoPage>
  );
}