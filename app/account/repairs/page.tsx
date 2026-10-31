import { InfoPage } from "@/components/storefront";

export default function RepairsPage() {
  return (
    <InfoPage title="Repair requests" description="Track your repair and service requests in one place.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm leading-7 text-slate-600">This is where customers can review device status, technician notes and repair milestones.</p>
      </div>
    </InfoPage>
  );
}