import Link from "next/link";
import { InfoPage } from "@/components/storefront";

export default function SignUpPage() {
  return (
    <InfoPage title="Create account" description="Create your RecetTech account to save orders, wishlist items and device requests.">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <form className="grid gap-4">
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Full name" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Email address" />
          <input className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" type="password" placeholder="Password" />
          <button type="submit" className="rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white">Create account</button>
        </form>
        <div className="mt-5 text-sm text-slate-600">Already have an account? <Link href="/auth/login" className="font-medium text-[#193B8C]">Login</Link></div>
      </div>
    </InfoPage>
  );
}