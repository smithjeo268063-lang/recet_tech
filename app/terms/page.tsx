import { InfoPage } from "@/components/storefront";

export default function TermsPage() {
  return (
    <InfoPage title="Terms and conditions" description="The contractual and operational terms that apply to purchases and services.">
      <p className="text-sm leading-7 text-slate-600">These terms apply to customer orders, service requests, payment processing and in-store support. Production deployments should define legal details in the final legal review process.</p>
    </InfoPage>
  );
}