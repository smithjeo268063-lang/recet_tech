import { InfoPage } from "@/components/storefront";

export default function AdminTradeInsPage() {
  return (
    <InfoPage title="Trade-ins" description="Review device swaps and sell-back requests from customer submissions.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><p className="text-sm leading-7 text-slate-600">Pricing and condition review workflows can be handled from this route.</p></div>
    </InfoPage>
  );
}