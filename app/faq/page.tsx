import { InfoPage } from "@/components/storefront";

export default function FAQPage() {
  return (
    <InfoPage title="Frequently asked questions" description="Answers to the most common questions from customers about purchases, repairs and support.">
      <div className="space-y-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-semibold text-slate-900">Do you offer nationwide delivery?</h2><p className="mt-3 text-sm leading-7 text-slate-600">Yes, we support nationwide delivery across Nigeria with transparent shipping updates.</p></div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-semibold text-slate-900">Can I trade in my old device?</h2><p className="mt-3 text-sm leading-7 text-slate-600">Yes. We offer device swaps and sell-your-device programs for eligible devices.</p></div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-semibold text-slate-900">Do you fix gadgets in-store?</h2><p className="mt-3 text-sm leading-7 text-slate-600">Yes. We provide repair booking and technical support for phones, laptops and accessories.</p></div>
      </div>
    </InfoPage>
  );
}