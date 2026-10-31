import { InfoPage } from "@/components/storefront";

export default function CheckoutSuccessPage() {
  return (
    <InfoPage title="Payment successful" description="Your order was confirmed and a receipt has been issued for delivery processing.">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Order confirmed</h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">A payment verification callback from Paystack can populate this view with the confirmed order reference and transaction details.</p>
      </div>
    </InfoPage>
  );
}