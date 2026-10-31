import Link from "next/link";
import { InfoPage } from "@/components/storefront";

export default function LoginPage() {
  return (
    <InfoPage title="Login" description="Access your customer account and recent order history securely.">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <form className="grid gap-4">
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Email address" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" type="password" placeholder="Password" />
          <button type="submit" className="rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white">Continue</button>
        </form>
        <div className="mt-5 text-sm text-slate-600">
          Forgot your password? <Link href="/auth/forgot-password" className="font-medium text-[#193B8C]">Reset it</Link>
        </div>
      </div>
    </InfoPage>
  );
}