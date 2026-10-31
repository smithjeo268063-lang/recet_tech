import { InfoPage } from "@/components/storefront";

export default function AdminRepairsPage() {
  return (
    <InfoPage title="Repair requests" description="Track device repairs, estimates and completion statuses across the service team.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><p className="text-sm leading-7 text-slate-600">Service teams can manage job status, technician assignments and customer communication here.</p></div>
    </InfoPage>
  );
}