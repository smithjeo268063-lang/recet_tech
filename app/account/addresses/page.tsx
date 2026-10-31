import { InfoPage } from "@/components/storefront";

export default function AddressesPage() {
  return (
    <InfoPage title="Addresses" description="Store delivery details for your recurring purchases and service requests.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm leading-7 text-slate-600">Customer-specific address records should live behind auth-protected server routes.</p>
      </div>
    </InfoPage>
  );
}