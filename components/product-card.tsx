"use client";

import Link from "next/link";
import type { Product } from "@/lib/site-data";
import { ProductActions } from "@/components/product-actions";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_40px_-24px_rgba(15,23,42,0.3)] transition hover:-translate-y-1 hover:shadow-[0_25px_50px_-25px_rgba(15,23,42,0.4)]">
      <div className="relative flex h-36 items-center justify-center overflow-hidden bg-slate-100 sm:h-64">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="px-4 text-center text-sm font-medium text-slate-500">Product image coming soon</span>
        )}
        <div className="absolute left-4 top-4 flex gap-2">
          {product.isDeal ? (
            <span className="rounded-full bg-[#E63946] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
              Deal
            </span>
          ) : null}
          {product.isNew ? (
            <span className="rounded-full bg-emerald-500 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
              New
            </span>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-2.5 sm:gap-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 sm:text-xs">
          <span className="truncate font-medium text-[#193B8C]">
            {product.brand}
          </span>
          <span className="shrink-0">{product.reviews} reviews</span>
        </div>
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-slate-900 hover:text-[#193B8C] sm:min-h-14 sm:text-lg sm:leading-7"
        >
          {product.title}
        </Link>
        {product.summary ? (
          <p className="hidden md:block line-clamp-3 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
            {product.summary}
          </p>
        ) : null}
        <div className="mt-[0px]  flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[#193B8C]">
          {product.price > 0 ? (
            <>
              <span className="text-sm font-semibold sm:text-lg">
                ₦{product.price.toLocaleString()}
              </span>
              {product.compareAt > product.price ? (
                <span className="text-xs text-slate-400 line-through sm:text-sm">
                  ₦{product.compareAt.toLocaleString()}
                </span>
              ) : null}
            </>
          ) : (
            <span className="text-sm font-semibold sm:text-lg">Contact for price</span>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            {product.price > 0 ? (
              <>
                {product.reviews > 0 ? <div className="text-xs text-amber-500 sm:text-sm">★★★★★</div> : null}
                <div className="mt-1 text-xs text-slate-500">
                  {product.inventory} in stock
                </div>
              </>
            ) : (
              <span className="text-xs text-slate-500">Availability to be confirmed</span>
            )}
          </div>
          {product.price > 0 ? (
            <ProductActions
              productId={product.id}
              productSlug={product.slug}
              productTitle={product.title}
              compact
            />
          ) : (
            <Link
              href={`mailto:support@recettech.ng?subject=${encodeURIComponent(`Price and availability: ${product.title}`)}`}
              className="rounded-full bg-[#193B8C] px-3 py-2 text-xs font-semibold text-white sm:px-4 sm:text-sm"
            >
              Ask us
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
