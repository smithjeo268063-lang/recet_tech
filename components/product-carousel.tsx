"use client";

import { useRef } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/site-data";

export function ProductCarousel({
  products,
  label,
}: {
  products: Product[];
  label: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);

  function scroll(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction * Math.max(rail.clientWidth * 0.8, 280),
      behavior: "smooth",
    });
  }

  if (products.length === 0) {
    return (
      <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        Products will appear here when they are available.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label={`Scroll ${label} left`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-[#193B8C] hover:text-[#193B8C]"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label={`Scroll ${label} right`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-[#193B8C] hover:text-[#193B8C]"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <div
        ref={railRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <div key={product.id} className="w-[65vw] max-w-[280px] shrink-0 snap-start sm:w-[280px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}