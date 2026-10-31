import { InfoPage } from "@/components/storefront";

export default function RepairsPage() {
  return (
    <InfoPage title="Repair booking" description="Schedule a device diagnosis, screen repair or hardware service request.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <form className="grid gap-4 md:grid-cols-2">
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Full name" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Device model" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Issue type" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Preferred date" />
          <textarea className="min-h-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:col-span-2" placeholder="Describe the problem" />
          <button className="rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white md:col-span-2">Book repair</button>
        </form>
      </div>
    </InfoPage>
  );
}