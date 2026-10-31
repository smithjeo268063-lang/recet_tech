import Link from "next/link";
import { BrandGrid } from "@/components/brand-grid";
import { CategoryTabs, SectionHeading } from "@/components/storefront";
import { ProductCard } from "@/components/product-card";
import { ProductCarousel } from "@/components/product-carousel";
import { stats } from "@/lib/site-data";
import {
  getCatalogBrands,
  getCatalogCategories,
  getCatalogProducts,
  getStorefrontContent,
} from "@/lib/catalog-data";

export default async function HomePage() {
  const [brands, categories, products, content] = await Promise.all([
    getCatalogBrands(),
    getCatalogCategories(),
    getCatalogProducts(),
    getStorefrontContent(),
  ]);
  const featuredProducts = products.filter((product) => product.isFeatured);
  const newArrivals = products.filter((product) => product.isNew).slice(0, 12);
  const deals = products.filter((product) => product.isDeal).slice(0, 8);
  const accessoryCategories = [
    { title: "Chargers and Adapters", slug: "chargers-and-adapters" },
    { title: "Cables and Connectors", slug: "cables-and-connectors" },
    { title: "Power Banks and Batteries", slug: "power-banks-and-batteries" },
    { title: "Audio Devices", slug: "audio-devices" },
  ].map((category) => ({
    ...category,
    products: products
      .filter(
        (product) =>
          product.category.toLowerCase() === category.title.toLowerCase(),
      )
      .slice(0, 8),
  }));
  return (
    <main>
      <section className="mx-auto max-w-7xl px-3.5 pb-16 pt-12 sm:px-6">
        <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-[#08142F] px-8 py-10 text-slate-50 shadow-[0_25px_80px_-25px_rgba(8,20,47,0.7)] lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-16">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-blue-100">
              Premium gadgets for Nigeria
            </span>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              {content.hero_title}
            </h1>
            <p className="max-w-lg text-base leading-8 text-slate-300">
              {content.hero_description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
              >
                Shop now
              </Link>
              <Link
                href="/services/repairs"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white"
              >
                Book repair
              </Link>
            </div>
            <div className="grid gap-4 pt-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <div className="text-2xl font-semibold text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-slate-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/15 to-white/5 p-5 backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80"
                alt="Tech showcase"
                className="h-[440px] w-full rounded-[1.5rem] object-cover"
              />
              <div className="absolute -left-3 bottom-14 rounded-2xl bg-white p-4 text-slate-900 shadow-xl">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Best seller
                </div>
                <div className="mt-2 text-lg font-semibold">
                  Galaxy S24 Ultra
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  From ₦1,090,000
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3.5 py-8 sm:px-6">
        <SectionHeading
          eyebrow="Categories"
          title="Explore by tech category"
          description="From everyday essentials to power-user devices, find the technology that matches your lifestyle."
        />
        <CategoryTabs categories={categories} />
      </section>

      <section className="mx-auto max-w-7xl px-3.5 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Featured"
          title="Fresh picks from our store"
          description="Hand-picked devices and accessories selected for speed, value and premium everyday performance."
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 xl:gap-8">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3.5 py-12 sm:px-6 sm:py-16">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Just landed"
            title="New arrivals"
            description="See the latest products added to the RecetTech catalog."
          />
          <Link
            href="/new-arrivals"
            className="mb-8 text-sm font-semibold text-[#193B8C] hover:underline"
          >
            Shop new arrivals →
          </Link>
        </div>
        <ProductCarousel products={newArrivals} label="New arrivals" />
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-3.5 sm:px-6">
          <SectionHeading
            eyebrow="Why RecetTech"
            title="Built for trust, convenience and sharp performance."
            description="We combine retail, repairs and after-sales support under one reliable tech ecosystem."
          />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-4 text-2xl font-semibold text-[#193B8C]">
                01
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                Verified devices
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Every major device is reviewed for condition, quality and
                longevity before it reaches your hands.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-4 text-2xl font-semibold text-[#193B8C]">
                02
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                Fast support
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                From trade-in quotes to repair bookings, our teams move quickly
                and clearly.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-4 text-2xl font-semibold text-[#193B8C]">
                03
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                Secure checkout
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Paystack-powered Nigerian payments make purchases safer and
                easier for customers across the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#193B8C] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-3.5 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-rose-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
                <span className="h-2 w-2 animate-pulse rounded-full bg-blue-300" />
                Offers in store
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Flash deals
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Browse products currently marked as deals. Check each listing
                for the latest price and availability.
              </p>
            </div>
            <Link
              href="/deals"
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#101324]"
            >
              View all deals →
            </Link>
          </div>
          <div className="rounded-[2rem] border overflow-x-hidden border-white/10 bg-gradient-to-br from-rose-500/14 via-white/[0.03] to-amber-400/10 p-4 sm:p-6">
            {deals.length > 0 ? (
              <ProductCarousel products={deals} label="Flash deals" />
            ) : (
              <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
                No products are currently marked as deals. Check back soon or
                browse the full catalog.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#193B8C]/10 via-white to-slate-50 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-3.5 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full border border-cyan-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#193B8C]">
                Everyday tech essentials
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Accessories for your setup
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                Find chargers and useful picks across five more accessory and
                tech categories.
              </p>
            </div>
            <Link
              href="/categories/chargers-and-adapters"
              className="rounded-full bg-[#193B8C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#193B8C]/200
              "
            >
              Shop chargers →
            </Link>
          </div>
          <div className="space-y-10">
            {accessoryCategories.map((category, index) => (
              <section
                key={category.slug}
                aria-labelledby={`accessory-${category.slug}`}
              >
                <div className="mt-2 mb-1 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#193B8C]/20 text-sm font-bold text-[#193B8C]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                      <h3
                      id={`accessory-${category.slug}`}
                      className="text-xl font-semibold text-slate-900"
                    >
                      {category.title}
                    </h3>
                  </div>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-sm font-semibold text-[#193B8C] hover:underline"
                  >
                    Browse category →
                  </Link>
                </div>
                <ProductCarousel
                  products={category.products}
                  label={category.title}
                />
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3.5 pb-16 sm:px-6">
        <SectionHeading
          eyebrow="Brands"
          title="Shop the brands you already trust"
          description="Our catalog includes premium technology and accessories from globally-recognized names."
        />
        <BrandGrid brands={brands} products={products} />
      </section>

      <section className="bg-[#08142F] py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-3.5 sm:px-6 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">
              Trade-in and repairs
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              Upgrade smarter without the hassle.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
              Sell or swap your old devices, schedule a repair, and keep your
              tech running for longer with expert support from RecetTech.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Link
              href="/sell-device"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
            >
              Sell your device
            </Link>
            <Link
              href="/swap-device"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white"
            >
              Swap now
            </Link>
            <Link
              href="/services/repairs"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white"
            >
              Book a repair
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
