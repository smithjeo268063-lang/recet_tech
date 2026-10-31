import Link from "next/link";
import { InfoPage } from "@/components/storefront";

export default function ServicesPage() {
  return (
    <InfoPage title="Services and support" description="Help for your devices beyond the purchase: repair requests, trade-ins, swaps, and product guidance.">
      <div className="grid gap-5 md:grid-cols-3">
        {[
          {
            number: "01",
            title: "Device repairs",
            description: "Tell us what device you have and what is happening. We will review your request and discuss the next steps after assessment.",
            href: "/services/repairs/book",
            action: "Request a repair",
          },
          {
            number: "02",
            title: "Sell your device",
            description: "Share details about a device you would like to sell. Condition and model information help us review your request.",
            href: "/sell-device",
            action: "Start a sell request",
          },
          {
            number: "03",
            title: "Swap or upgrade",
            description: "Ask about exchanging your current device as part of an upgrade. Final options depend on the devices and their condition.",
            href: "/swap-device",
            action: "Explore a swap",
          },
        ].map((service) => (
          <article key={service.title} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <span className="text-sm font-semibold text-[#193B8C]">{service.number}</span>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">{service.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{service.description}</p>
            <Link href={service.href} className="mt-6 text-sm font-semibold text-[#193B8C] hover:underline">{service.action} →</Link>
          </article>
        ))}
      </div>

      <section className="mt-8 grid gap-6 rounded-3xl bg-[#08142F] p-8 text-white md:grid-cols-[1fr_auto] md:items-center md:p-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">What to expect</span>
          <h2 className="mt-3 text-2xl font-semibold">Clear details before you decide</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            Share the device model, its condition, and the issue or service you need. We can then discuss availability, assessment, and any applicable cost before you proceed.
          </p>
        </div>
        <Link href="/contact" className="inline-flex justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900">Ask a question</Link>
      </section>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-7">
        <h2 className="text-lg font-semibold text-slate-900">Need help choosing a product?</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">Contact us with your budget, preferred features, or intended use and we can help you explore the catalog.</p>
        <Link href="/shop" className="mt-4 inline-flex text-sm font-semibold text-[#193B8C] hover:underline">Browse the catalog →</Link>
      </div>
    </InfoPage>
  );
}