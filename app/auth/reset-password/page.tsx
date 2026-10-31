import { InfoPage } from "@/components/storefront";

export default function ResetPasswordPage() {
  return (
    <InfoPage title="Reset password" description="Set a new password for your customer account.">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <form className="grid gap-4">
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" type="password" placeholder="New password" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" type="password" placeholder="Confirm password" />
          <button type="submit" className="rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white">Update password</button>
        </form>
      </div>
    </InfoPage>
  );
}