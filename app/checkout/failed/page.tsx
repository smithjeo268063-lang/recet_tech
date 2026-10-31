import { InfoPage } from "@/components/storefront";

export default function CheckoutFailedPage() {
  return (
    <InfoPage title="Payment failed" description="We could not complete your transaction. Please try again or contact support for help.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Retry payment</h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">The payment gateway callback can trigger this page and provide the failure reason for customers.</p>
      </div>
    </InfoPage>
  );
}