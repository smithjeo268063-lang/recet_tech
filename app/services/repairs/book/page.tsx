import { InfoPage } from "@/components/storefront";

export default function RepairBookingPage() {
  return (
    <InfoPage title="Book repair" description="Submit a service request and our team will review your device and next steps.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <form className="grid gap-4">
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Your name" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Device issue" />
          <textarea className="min-h-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Issue details" />
          <button className="rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white">Send request</button>
        </form>
      </div>
    </InfoPage>
  );
}