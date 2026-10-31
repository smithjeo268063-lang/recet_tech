import { InfoPage } from "@/components/storefront";
import Link from "next/link";
import { AdminNav } from "./admin-nav";

export default function AdminDashboardPage() {
  return (
    <InfoPage title="Admin dashboard" description="Manage products, brands, categories, inventory, and storefront messaging.">
      <AdminNav />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[
          ["Products", "Create, edit, publish, and remove products.", "/admin/products"],
          ["Brands", "Manage brand names, descriptions, and logos.", "/admin/brands"],
          ["Categories", "Organize storefront navigation and category imagery.", "/admin/categories"],
          ["Inventory", "Update stock quantities across the catalog.", "/admin/inventory"],
          ["Storefront content", "Edit the homepage headline and announcement bar.", "/admin/content"],
        ].map(([title, description, href]) => (
          <Link key={href} href={href} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-[#193B8C]">
            <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            <span className="mt-5 inline-flex text-sm font-semibold text-[#193B8C]">Open management →</span>
          </Link>
        ))}
      </div>
    </InfoPage>
  );
}