import { InfoPage } from "@/components/storefront";

export default function SwapDevicePage() {
  return (
    <InfoPage title="Swap your device" description="Trade in your current device for credit and reduce the cost of your next purchase.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <form className="grid gap-4 md:grid-cols-2">
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Current device" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Desired device" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Condition" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Your phone number" />
          <button className="rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white md:col-span-2">Request swap</button>
        </form>
      </div>
    </InfoPage>
  );
}