"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  CART_ITEM_ADDED_EVENT,
  CART_STORAGE_KEY,
  CART_UPDATED_EVENT,
  parseCart,
} from "@/lib/cart";

const storageUnavailable = "storage-unavailable";

function getCartSnapshot() {
  try {
    return window.localStorage.getItem(CART_STORAGE_KEY);
  } catch {
    return storageUnavailable;
  }
}

function subscribeToCart(onChange: () => void) {
  window.addEventListener(CART_UPDATED_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CART_UPDATED_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function CartLink() {
  const savedCart = useSyncExternalStore(subscribeToCart, getCartSnapshot, () => null);
  const [addedTitle, setAddedTitle] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const itemCount = useMemo(() => {
    if (!savedCart || savedCart === storageUnavailable) return 0;
    try {
      return parseCart(savedCart).reduce((total, item) => total + item.quantity, 0);
    } catch {
      return 0;
    }
  }, [savedCart]);

  useEffect(() => {
    let animationTimeout: number | undefined;
    let messageTimeout: number | undefined;

    function showCartFeedback(event: Event) {
      const { productTitle } = (event as CustomEvent<{ productTitle: string }>).detail;
      setAddedTitle(productTitle);
      setIsAnimating(false);
      window.requestAnimationFrame(() => setIsAnimating(true));
      window.clearTimeout(animationTimeout);
      window.clearTimeout(messageTimeout);
      animationTimeout = window.setTimeout(() => setIsAnimating(false), 550);
      messageTimeout = window.setTimeout(() => setAddedTitle(""), 2600);
    }

    window.addEventListener(CART_ITEM_ADDED_EVENT, showCartFeedback);
    return () => {
      window.removeEventListener(CART_ITEM_ADDED_EVENT, showCartFeedback);
      window.clearTimeout(animationTimeout);
      window.clearTimeout(messageTimeout);
    };
  }, []);

  return (
    <div className="relative">
      <Link
        href="/cart"
        aria-label={`Shopping cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
        className={`inline-flex items-center gap-2 rounded-full bg-[#193B8C] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#122e72] sm:px-4 ${isAnimating ? "cart-bump" : ""}`}
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
        <span>Cart</span>
        <span className="min-w-5 rounded-full bg-white/15 px-1.5 text-center text-xs">
          {itemCount}
        </span>
      </Link>
      {addedTitle ? (
        <div
          aria-hidden="true"
          className="absolute right-0 top-full z-[60] mt-3 w-64 rounded-2xl border border-emerald-100 bg-white p-3 text-sm text-slate-700 shadow-xl"
        >
          <p className="font-semibold text-emerald-700">Added to cart</p>
          <p className="mt-1 line-clamp-2 text-xs leading-5">{addedTitle}</p>
        </div>
      ) : null}
    </div>
  );
}
