"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/site-data";
import type { CatalogBrand } from "@/lib/catalog-data";

const brandsPerPage = 10;

export function BrandGrid({ brands, products }: { brands: CatalogBrand[]; products: Product[] }) {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const filteredBrands = brands.filter((brand) =>
    `${brand.name} ${brand.description}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const pageCount = Math.ceil(filteredBrands.length / brandsPerPage);
  const currentPage = Math.min(page, Math.max(0, pageCount - 1));
  const visibleBrands = filteredBrands.slice(currentPage * brandsPerPage, (currentPage + 1) * brandsPerPage);

  return (
    <div>
      <label className="mb-6 block">
        <span className="sr-only">Search brands</span>
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(0);
          }}
          placeholder="Search brands by name"
          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#193B8C] focus:ring-2 focus:ring-[#193B8C]/15"
        />
      </label>
      <p className="mb-4 text-sm text-slate-500" aria-live="polite">{filteredBrands.length} brands</p>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {visibleBrands.map((brand) => {
          const productCount = products.filter((product) => product.brand === brand.name).length;

          return (
            <Link key={brand.slug} href={`/brands/${brand.slug}`} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-[#193B8C] sm:p-6">
              <div className="mb-3 flex flex-col items-start gap-3 sm:mb-5 sm:flex-row sm:items-center sm:gap-4">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 text-sm font-bold text-[#193B8C] sm:h-16 sm:w-16 sm:text-lg">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="absolute inset-0 h-full w-full object-contain p-2"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      event.currentTarget.parentElement!.textContent = brand.name.slice(0, 2).toUpperCase();
                    }}
                  />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-900 sm:text-xl">{brand.name}</h2>
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">{productCount} products</p>
                </div>
              </div>
              <p className="text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">{brand.description}</p>
            </Link>
          );
        })}
      </div>

      {visibleBrands.length === 0 ? (
        <p className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">No brands match your search.</p>
      ) : null}
      {pageCount > 1 ? (
        <nav className="mt-8 flex items-center justify-center gap-4" aria-label="Brand pages">
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
    </div>
  );
}
