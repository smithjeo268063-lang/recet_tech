import { InfoPage } from "@/components/storefront";

export default function SellDevicePage() {
  return (
    <InfoPage title="Sell your device" description="Get a quick quote for your old smartphone or laptop and trade it for value.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <form className="grid gap-4 md:grid-cols-2">
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Device type" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Brand and model" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Condition" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Your email" />
          <textarea className="min-h-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:col-span-2" placeholder="Additional details" />
          <button className="rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white md:col-span-2">Submit quote request</button>
        </form>
      </div>
    </InfoPage>
  );
}