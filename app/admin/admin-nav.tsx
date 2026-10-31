"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  ["Overview", "/admin"],
  ["Products", "/admin/products"],
  ["Brands", "/admin/brands"],
  ["Categories", "/admin/categories"],
  ["Inventory", "/admin/inventory"],
  ["Storefront content", "/admin/content"],
] as const;

export function AdminNav() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function signOut() {
    setError("");
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) {
        throw new Error("Could not sign out.");
      }
      router.replace("/admin/login");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not sign out.");
    }
  }

  return (
    <>
    {error ? <p role="alert" className="mb-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
    <nav aria-label="Admin navigation" className="mb-8 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      {links.map(([label, href]) => (
        <Link key={href} href={href} className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-[#193B8C]">
          {label}
        </Link>
      ))}
      <button type="button" onClick={() => void signOut()} className="ml-auto rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-red-300 hover:text-red-700">
        Sign out
      </button>
    </nav>
    </>
  );
}
