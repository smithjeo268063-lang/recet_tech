import { InfoPage } from "@/components/storefront";

export default function AdminDiscountsPage() {
  return (
    <InfoPage title="Discounts" description="Create campaigns, flash sales and promotional offers for technical goods.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><p className="text-sm leading-7 text-slate-600">Discount logic should be validated server-side at checkout to prevent tampering.</p></div>
    </InfoPage>
  );
}