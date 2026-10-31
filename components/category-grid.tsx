"use client";

import Link from "next/link";
import { useState } from "react";
import type { CatalogCategory } from "@/lib/catalog-data";

export function CategoryGrid({ categories }: { categories: CatalogCategory[] }) {
  const [query, setQuery] = useState("");
  const filteredCategories = categories.filter((category) =>
    `${category.title} ${category.description}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <>
      <label className="mb-6 block">
        <span className="sr-only">Search categories</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search categories"
          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#193B8C] focus:ring-2 focus:ring-[#193B8C]/15"
        />
      </label>
      <p className="mb-4 text-sm text-slate-500" aria-live="polite">{filteredCategories.length} categories</p>
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {filteredCategories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#193B8C]">
              <div className="relative h-28 overflow-hidden bg-slate-100 sm:h-48">
                <img src={category.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#193B8C] sm:left-4 sm:top-4 sm:px-3 sm:text-xs sm:tracking-[0.18em]">Category</span>
              </div>
              <div className="p-3 sm:p-7">
                <h2 className="text-base font-semibold leading-5 text-slate-900 sm:text-2xl sm:leading-8">{category.title}</h2>
                <p className="mt-2 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-7">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">No categories match your search.</p>
      )}
    </>
  );
}
