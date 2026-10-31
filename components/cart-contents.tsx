"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { CART_STORAGE_KEY, CART_UPDATED_EVENT, parseCart, readCart, writeCart, type CartItem } from "@/lib/cart";
import type { Product } from "@/lib/site-data";

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

export function CartContents({ products }: { products: Product[] }) {
  const storedCart = useSyncExternalStore(subscribeToCart, getCartSnapshot, () => null);
  const [updateError, setUpdateError] = useState("");
  const { cart, error } = useMemo(() => {
    if (storedCart === storageUnavailable) {
      return { cart: [] as CartItem[], error: "Cart storage is unavailable. Check your browser storage settings." };
    }
    try {
      return { cart: parseCart(storedCart), error: "" };
    } catch {
      return { cart: [] as CartItem[], error: "Your saved cart data could not be read. Clear it to continue." };
    }
  }, [storedCart]);

  const cartProducts = useMemo(
    () => cart.flatMap((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return product ? [{ product, quantity: item.quantity }] : [];
    }),
    [cart, products],
  );
  const subtotal = cartProducts.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const hasUnpricedProduct = cartProducts.some(({ product }) => product.price <= 0);

  function changeQuantity(productId: number, quantity: number) {
    try {
      const nextCart = readCart()
        .map((item) => item.productId === productId ? { ...item, quantity } : item)
        .filter((item) => item.quantity > 0);
      writeCart(nextCart);
      setUpdateError("");
    } catch {
      setUpdateError("Could not update your cart. Please refresh the page and try again.");
    }
  }

  function clearSavedCart() {
    try {
      window.localStorage.removeItem(CART_STORAGE_KEY);
      window.dispatchEvent(new Event(CART_UPDATED_EVENT));
    } catch {
      setUpdateError("Could not clear your saved cart. Please check your browser storage settings and try again.");
    }
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
        <p>{error}</p>
        <button type="button" onClick={clearSavedCart} disabled={storedCart === storageUnavailable} className="mt-4 rounded-full bg-amber-900 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
          Clear saved cart
        </button>
      </div>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Your cart is empty</h2>
        <p className="mt-3 text-slate-600">Go to the shop to add products to your cart.</p>
        <Link href="/shop" className="mt-6 inline-flex rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white">
          Go to shop
        </Link>
      </div>
    );
  }

  return (
    <div>
    {updateError ? <p className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert">{updateError}</p> : null}
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        {cartProducts.map(({ product, quantity }) => (
          <article key={product.id} className="flex flex-wrap items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <img src={product.image} alt={product.title} className="h-24 w-24 rounded-2xl object-cover" />
            <div className="min-w-[10rem] flex-1">
              <Link href={`/products/${product.slug}`} className="font-semibold text-slate-900 hover:text-[#193B8C]">{product.title}</Link>
              <p className="mt-1 text-sm text-slate-600">{product.price > 0 ? `₦${product.price.toLocaleString()}` : "Contact for price"}</p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" aria-label={`Decrease ${product.title} quantity`} onClick={() => changeQuantity(product.id, quantity - 1)} className="h-9 w-9 rounded-full border border-slate-300 text-slate-700">−</button>
              <span className="min-w-6 text-center text-sm font-medium">{quantity}</span>
              <button type="button" aria-label={`Increase ${product.title} quantity`} onClick={() => changeQuantity(product.id, quantity + 1)} className="h-9 w-9 rounded-full border border-slate-300 text-slate-700">+</button>
            </div>
            <p className="w-full text-right font-semibold text-[#193B8C] sm:w-auto">
              {product.price > 0 ? `₦${(product.price * quantity).toLocaleString()}` : "Price to be confirmed"}
            </p>
          </article>
        ))}
      </div>
      <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Summary</h2>
        <div className="mt-6 space-y-3 text-sm text-slate-600">
          <div className="flex justify-between"><span>Subtotal</span><span>₦{subtotal.toLocaleString()}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>Calculated at checkout</span></div>
          <div className="flex justify-between border-t border-slate-200 pt-3 font-semibold text-slate-900"><span>Total</span><span>{hasUnpricedProduct ? "Price to be confirmed" : `₦${subtotal.toLocaleString()}`}</span></div>
        </div>
        {hasUnpricedProduct ? (
          <p className="mt-6 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
            Remove products with unconfirmed prices to continue to checkout.
          </p>
        ) : (
          <Link href="/checkout" className="mt-6 inline-flex w-full justify-center rounded-full bg-[#193B8C] px-6 py-3 text-sm font-semibold text-white">
            Continue to checkout
          </Link>
        )}
      </aside>
    </div>
    </div>
  );
}
