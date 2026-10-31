import { InfoPage } from "@/components/storefront";

export default function TrackOrderPage() {
  return (
    <InfoPage title="Track your order" description="Check the status of your purchase once it has been placed and confirmed.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <form className="grid gap-4 md:grid-cols-[1fr_auto]">
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Enter order reference" />
          <button className="rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white">Track order</button>
        </form>
      </div>
    </InfoPage>
  );
}