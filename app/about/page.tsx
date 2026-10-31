import Link from "next/link";
import { InfoPage } from "@/components/storefront";

export default function AboutPage() {
  return (
    <InfoPage title="Technology for everyday life" description="RecetTech brings device shopping and practical support together for customers in Nigeria.">
      <section className="grid gap-8 overflow-hidden rounded-3xl bg-[#08142F] p-8 text-white md:grid-cols-[1.2fr_0.8fr] md:items-center md:p-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">About RecetTech</span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">More than a place to buy a device.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            We bring together a catalog of phones, computers, accessories, and smart devices with repair, trade-in, and customer support options. Our aim is to make it easier to find technology that fits your needs and get help when you need it.
          </p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
          <h3 className="text-lg font-semibold">Based in Benin City</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">Backgate, along Ekosodin Road, Ugbowo, Benin City, Edo State, Nigeria.</p>
          <Link href="/contact" className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900">Get in touch</Link>
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          ["Useful choice", "Explore devices and accessories across categories, from everyday essentials to work and entertainment technology."],
          ["Practical support", "Find routes for repairs, trade-ins, and swaps alongside the product catalog."],
          ["Helpful conversations", "Tell us what you need, what you are comparing, or what is not working, and we will help you find the right next step."],
        ].map(([title, description], index) => (
          <article key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <span className="text-sm font-semibold text-[#193B8C]">0{index + 1}</span>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-9">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Let’s find your next step</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">Browse the store, ask a product question, or explore our support services.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/shop" className="rounded-full bg-[#193B8C] px-5 py-3 text-sm font-semibold text-white">Shop products</Link>
          <Link href="/services" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700">View services</Link>
        </div>
      </section>
    </InfoPage>
  );
}