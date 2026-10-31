import Link from "next/link";
import { ProductListing } from "@/components/product-listing";
import { InfoPage } from "@/components/storefront";
import { getCatalogProducts } from "@/lib/catalog-data";

export default async function DealsPage() {
  const products = await getCatalogProducts();
  const deals = products.filter((product) => product.isDeal);

  return (
    <InfoPage title="Current deals" description="Browse products currently marked as offers in the RecetTech catalog. Offers and availability may change.">
      {deals.length > 0 ? (
        <ProductListing
          products={deals}
          pageSize={16}
          searchLabel="Search current deals"
          emptyMessage="No deals match your search. Try another product name or brand."
        />
      ) : (
        <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#193B8C]">Offers update regularly</span>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">No active deals right now</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            There are no products currently marked as an offer. Browse the full catalog or contact us for help choosing a device.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="rounded-full bg-[#193B8C] px-5 py-3 text-sm font-semibold text-white">Browse products</Link>
            <Link href="/contact" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700">Contact RecetTech</Link>
          </div>
        </section>
      )}
    </InfoPage>
  );
}