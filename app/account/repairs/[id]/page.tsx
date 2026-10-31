import { InfoPage } from "@/components/storefront";

export default function RepairDetailPage() {
  return (
    <InfoPage title="Repair request details" description="Monitor the progress of your service request and technician updates.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Repair #REP-204</h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">Inspection completed, replacement parts are pending and the final status is expected soon.</p>
      </div>
    </InfoPage>
  );
}