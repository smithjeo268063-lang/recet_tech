import { InfoPage } from "@/components/storefront";

export default function AdminSettingsPage() {
  return (
    <InfoPage title="Settings" description="General platform configuration for operational and compliance controls.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><p className="text-sm leading-7 text-slate-600">Store site-wide settings, credentials and secure platform registry data here.</p></div>
    </InfoPage>
  );
}