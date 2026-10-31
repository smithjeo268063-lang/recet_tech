import { InfoPage } from "@/components/storefront";

export default function TradeInsPage() {
  return (
    <InfoPage title="Trade-ins" description="Manage your device swap and sell-back requests with RecetTech.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm leading-7 text-slate-600">Trade-in requests can be attached to a customer account and reviewed by support and admin teams.</p>
      </div>
    </InfoPage>
  );
}