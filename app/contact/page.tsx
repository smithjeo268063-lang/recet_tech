import Link from "next/link";
import { InfoPage } from "@/components/storefront";

export default function ContactPage() {
  return (
    <InfoPage title="Contact RecetTech" description="Reach out for product guidance, order questions, repairs, trade-ins, or general support.">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="grid content-start gap-4">
          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#193B8C]">Email support</span>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">How can we help?</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">Email us with your question and any details that will help us understand what you need.</p>
            <a href="mailto:support@recettech.ng" className="mt-4 inline-flex font-semibold text-[#193B8C] hover:underline">support@recettech.ng</a>
          </section>
          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#193B8C]">Visit us</span>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">RecetTech, Benin City</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">Backgate, along Ekosodin Road, Ugbowo, Benin City, Edo State, Nigeria.</p>
            <a
              href="https://maps.google.com/?q=Backgate%2C+Ekosodin+Road%2C+Ugbowo%2C+Benin+City"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-[#193B8C] hover:underline"
            >
              Open directions →
            </a>
          </section>
          <section className="rounded-3xl bg-[#08142F] p-7 text-white">
            <h2 className="text-lg font-semibold">Looking for a specific service?</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">You can send a repair request or tell us about a device you want to sell or swap.</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
              <Link href="/services/repairs/book" className="text-blue-200 hover:underline">Repair request</Link>
              <Link href="/sell-device" className="text-blue-200 hover:underline">Sell a device</Link>
              <Link href="/swap-device" className="text-blue-200 hover:underline">Swap a device</Link>
            </div>
          </section>
        </aside>

        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#193B8C]">Send an email</span>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">Tell us what you need</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            This form opens your email app with your message addressed to our support team. No form information is stored on this website.
          </p>
          <form action="mailto:support@recettech.ng" method="post" encType="text/plain" className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Your name
              <input name="Name" autoComplete="name" required className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Email address
              <input name="Email" type="email" autoComplete="email" required className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
              What is your message about?
              <select name="Topic" defaultValue="Product question" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <option>Product question</option>
                <option>Order support</option>
                <option>Repair request</option>
                <option>Sell or swap a device</option>
                <option>Other</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700 sm:col-span-2">
              Message
              <textarea name="Message" required rows={6} className="resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Include the product or device model and any helpful details." />
            </label>
            <button type="submit" className="rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white sm:col-span-2">Continue to email</button>
          </form>
        </section>
      </div>
    </InfoPage>
  );
}