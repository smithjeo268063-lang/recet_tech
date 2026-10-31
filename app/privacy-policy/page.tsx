import { InfoPage } from "@/components/storefront";

export default function PrivacyPolicyPage() {
  return (
    <InfoPage title="Privacy policy" description="How we process personal data and protect customer information.">
      <p className="text-sm leading-7 text-slate-600">This policy governs how account and transaction data are stored, used and protected. Any production deployment should align with Supabase auth and privacy best practices.</p>
    </InfoPage>
  );
}