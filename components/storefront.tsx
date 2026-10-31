import Link from "next/link";
import type { ReactNode } from "react";
import { CartLink } from "@/components/cart-link";
import { MobileNavigation } from "@/components/mobile-navigation";
import { brands, categories as starterCategories } from "@/lib/site-data";
import { getStorefrontContent } from "@/lib/catalog-data";
import type { CatalogCategory } from "@/lib/catalog-data";

export async function SiteHeader() {
  const content = await getStorefrontContent();
  const navigation = [
    { href: "/shop", label: "Shop" },
    { href: "/categories", label: "Categories" },
    { href: "/brands", label: "Brands" },
    { href: "/deals", label: "Deals" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="border-b border-slate-200 bg-[#08142F] text-center text-sm font-medium text-slate-100">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-3.5 py-2 text-xs sm:gap-4 sm:px-6 sm:text-sm">
          {content.announcement ? <span>{content.announcement}</span> : (
            <>
              <span>Nationwide delivery across Nigeria</span>
              <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-flex" />
              <span className="hidden sm:inline">Secure Paystack checkout</span>
              <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:inline-flex" />
              <span className="hidden sm:inline">UK-used devices available</span>
            </>
          )}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-3.5 py-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3 text-lg font-semibold tracking-tight text-slate-900">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#193B8C] text-sm font-bold text-white">R</span>
          <span>RecetTech</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          {navigation.map((item) => <Link key={item.href} href={item.href} className="transition hover:text-[#193B8C]">{item.label}</Link>)}
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link href="/wishlist" className="hidden rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700 sm:inline-flex">Wishlist</Link>
          <CartLink />
          <MobileNavigation items={navigation} />
        </div>
      </div>
    </header>
  );
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mb-8 flex flex-col gap-3">
      {eyebrow ? <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#193B8C]">{eyebrow}</span> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h2>
      {description ? <p className="max-w-2xl text-base text-slate-600">{description}</p> : null}
    </div>
  );
}

export function InfoPage({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-7xl px-3.5 py-16 sm:px-6">
      <div className="mb-10 rounded-3xl border border-slate-200 bg-slate-50 p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#193B8C]">RecetTech</span>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-3 max-w-2xl text-base text-slate-600">{description}</p>
      </div>
      {children}
    </main>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-3.5 py-16 sm:px-6 md:grid-cols-4">
        <div>
          <div className="mb-5 flex items-center gap-3 text-lg font-semibold text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#193B8C] text-white">R</span>
            RecetTech
          </div>
          <p className="text-sm leading-7 text-slate-400">Premium gadgets, repairs, device trade-ins and support for Nigeria’s digital lifestyle.</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Shop</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><Link href="/shop">All products</Link></li>
            <li><Link href="/deals">Deals</Link></li>
            <li><Link href="/new-arrivals">New arrivals</Link></li>
            <li><Link href="/uk-used">UK used</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Support</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li><Link href="/track-order">Track order</Link></li>
            <li><Link href="/services/repairs">Repair booking</Link></li>
            <li><Link href="/swap-device">Swap device</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Store</h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li>Backgate, Ekosodin Road</li>
            <li>Ugbowo, Benin City</li>
            <li>support@recettech.ng</li>
            <li>+234 800 RECETTECH</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-sm text-slate-400">© 2026 RecetTech. All rights reserved.</div>
    </footer>
  );
}

export function CategoryTabs({ categories = starterCategories }: { categories?: CatalogCategory[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <Link key={category.slug} href={`/categories/${category.slug}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-[#193B8C] hover:text-[#193B8C]">
          {category.title}
        </Link>
      ))}
    </div>
  );
}

export function BrandGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {brands.map((brand) => (
        <Link key={brand.slug} href={`/brands/${brand.slug}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#193B8C] hover:-translate-y-0.5">
          <div className="mb-4 text-2xl font-semibold text-[#193B8C]">{brand.name}</div>
          <p className="text-sm leading-6 text-slate-600">{brand.description}</p>
        </Link>
      ))}
    </div>
  );
}
