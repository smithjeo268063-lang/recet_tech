import { InfoPage } from "@/components/storefront";

export default function AuthCallbackPage() {
  return (
    <InfoPage title="Authentication callback" description="This route handles the redirect from your identity provider and completes the session flow.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm leading-7 text-slate-600">Use this callback endpoint to finalize sign-in, token exchange and session creation in production.</p>
      </div>
    </InfoPage>
  );
}