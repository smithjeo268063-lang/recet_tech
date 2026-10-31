import { InfoPage } from "@/components/storefront";

export default function AdminPaymentsPage() {
  return (
    <InfoPage title="Payments" description="Track Paystack verification, gateway status and successful order capture.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><p className="text-sm leading-7 text-slate-600">Use Verified payment callbacks and transaction references to reconcile incoming orders.</p></div>
    </InfoPage>
  );
}