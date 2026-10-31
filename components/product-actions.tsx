"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addCartItem, notifyCartItemAdded } from "@/lib/cart";

type ProductActionsProps = {
  productId: number;
  productSlug: string;
  productTitle: string;
  compact?: boolean;
};

export function ProductActions({
  productId,
  productSlug,
  productTitle,
  compact = false,
}: ProductActionsProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  function handleAddToCart() {
    try {
      addCartItem(productId);
      notifyCartItemAdded(productTitle);
      setMessage(`${productTitle} added to cart.`);
    } catch {
      setMessage("Could not add this item to your cart. Please try again.");
    }
  }

  function handleBuyNow() {
    router.push(`/checkout?buyNow=${encodeURIComponent(productSlug)}`);
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleAddToCart}
          aria-label={`Add ${productTitle} to cart`}
          title="Add to cart"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-[#193B8C] hover:text-[#193B8C]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l2.1 11.1a2 2 0 002 1.6h8.8a2 2 0 002-1.6L21 8H6"
            />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="rounded-full bg-[#193B8C] px-4 py-1.5 font-semibold text-white transition hover:bg-[#122e72] sm:px-4 sm:py-2 lg:text-sm"
        >
          <span className="text-[14px]">Buy Now</span>
         
        </button>
        {message ? (
          <span className="sr-only" role="status">
            {message}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          className="rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white"
        >
          Add to cart
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="rounded-full bg-[#E63946] px-6 py-3 text-sm font-semibold text-white"
        >
          Buy Now
        </button>
        <button
          type="button"
          className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700"
        >
          Add to wishlist
        </button>
      </div>
      {message ? (
        <p className="mt-3 text-sm text-slate-600" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
