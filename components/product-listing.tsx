"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/site-data";

type ProductListingProps = {
  products: Product[];
  pageSize: number;
  searchLabel: string;
  emptyMessage: string;
};

export function ProductListing({ products, pageSize, searchLabel, emptyMessage }: ProductListingProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) =>
      [product.title, product.brand, product.category, ...product.tags]
        .some((value) => value.toLowerCase().includes(normalizedQuery)),
    );
  }, [products, query]);
  const pageCount = Math.ceil(filteredProducts.length / pageSize);
  const currentPage = Math.min(page, Math.max(0, pageCount - 1));
  const visibleProducts = filteredProducts.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  function updateQuery(value: string) {
    setQuery(value);
    setPage(0);
  }

  return (
    <section>
      <label className="mb-6 block">
        <span className="sr-only">{searchLabel}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          placeholder={searchLabel}
          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#193B8C] focus:ring-2 focus:ring-[#193B8C]/15"
        />
      </label>

      <p className="mb-4 text-sm text-slate-500" aria-live="polite">
        {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
      </p>

      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 xl:gap-8">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <p className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">{emptyMessage}</p>
      )}

      {pageCount > 1 ? (
        <nav className="mt-8 flex items-center justify-center gap-4" aria-label="Product pages">
          <button
            type="button"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:border-[#193B8C] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-slate-600">Page {currentPage + 1} of {pageCount}</span>
          <button
            type="button"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage >= pageCount - 1}
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:border-[#193B8C] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      ) : null}
    </section>
  );
}
