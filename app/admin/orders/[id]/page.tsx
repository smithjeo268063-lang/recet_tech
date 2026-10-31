import { InfoPage } from "@/components/storefront";

export default function AdminOrderDetailPage() {
  return (
    <InfoPage title="Order details" description="Manage payment verification, shipping milestones and fulfillment tasks.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><p className="text-sm leading-7 text-slate-600">This page is prepared for status changes, admin notes and logistics workflows.</p></div>
    </InfoPage>
  );
}