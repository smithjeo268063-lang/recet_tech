"use client";

import Link from "next/link";
import { useRef } from "react";

type NavigationItem = {
  href: string;
  label: string;
};

export function MobileNavigation({ items }: { items: NavigationItem[] }) {
  const menuRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    menuRef.current?.removeAttribute("open");
  }

  return (
    <details ref={menuRef} className="relative lg:hidden">
      <summary
        aria-label="Open navigation menu"
        className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:border-[#193B8C] hover:text-[#193B8C] [&::-webkit-details-marker]:hidden"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <nav
        aria-label="Mobile navigation"
        className="absolute right-0 top-12 z-50 grid min-w-52 gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-[#193B8C]"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/wishlist"
          onClick={closeMenu}
          className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-[#193B8C]"
        >
          Wishlist
        </Link>
      </nav>
    </details>
  );
}
