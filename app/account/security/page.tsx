import { InfoPage } from "@/components/storefront";

export default function SecurityPage() {
  return (
    <InfoPage title="Security" description="Manage account security, password updates and linked sign-in methods.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <form className="grid gap-4">
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" type="password" placeholder="Current password" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" type="password" placeholder="New password" />
          <button className="rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white">Update password</button>
        </form>
      </div>
    </InfoPage>
  );
}