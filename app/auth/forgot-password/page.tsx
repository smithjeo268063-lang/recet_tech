import { InfoPage } from "@/components/storefront";

export default function ForgotPasswordPage() {
  return (
    <InfoPage title="Forgot password" description="Send a reset link to your email address so you can update your account password.">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <form className="grid gap-4">
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Email address" />
          <button type="submit" className="rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white">Send reset link</button>
        </form>
      </div>
    </InfoPage>
  );
}