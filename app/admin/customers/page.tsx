import { InfoPage } from "@/components/storefront";

export default function AdminCustomersPage() {
  return (
    <InfoPage title="Customers" description="Review customer accounts, order history and service requests.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><p className="text-sm leading-7 text-slate-600">This view is secured and customer data should only be available to authorized staff members.</p></div>
    </InfoPage>
  );
}