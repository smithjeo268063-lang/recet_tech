import { InfoPage } from "@/components/storefront";

export default function AdminTeamPage() {
  return (
    <InfoPage title="Team" description="Manage the staff members, roles and access scopes for the RecetTech platform.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><p className="text-sm leading-7 text-slate-600">Role-based permissions should be enforced server-side with a dedicated authorization layer.</p></div>
    </InfoPage>
  );
}