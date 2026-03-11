"use client";

import Link from "next/link";
import { Menu, ShoppingBasket, X } from "lucide-react";
import { useBasketStore } from "@/lib/store/store";
import { useState } from "react";

export function Header() {
  const hydrated = useBasketStore((state) => state.hydrated);
  const totalItems = useBasketStore((state) => state.getTotalItems());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-(--border) bg-(--hover-bg)/60 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link
            href="/products"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-semibold tracking-tight text-(--text-primary) transition hover:text-(--accent-hover)"
          >
            Perfume<span className="text-(--accent)">Store</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/products"
              className="text-xl font-bold text-(--text-secondary) transition hover:text-(--accent-hover)"
            >
              Products
            </Link>

            <Link
              href="/basket"
              className="relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-(--text-secondary) transition hover:bg-(--hover-bg) hover:text-(--accent-hover)"
            >
              <ShoppingBasket size={24} aria-label="Basket button" />

              {hydrated && totalItems > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--accent) px-1 text-xs font-medium text-white">
                  {totalItems}
                </span>
              ) : null}
            </Link>
          </nav>

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border) bg-white text-(--text-primary) transition hover:bg-(--hover-bg) md:hidden"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-72 border-l border-(--border) bg-white p-6 shadow-xl transition-transform duration-300 ease-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/products"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-semibold tracking-tight text-(--text-primary) transition hover:text-(--accent-hover)"
          >
            Perfume<span className="text-(--accent)">Store</span>
          </Link>

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-(--border) bg-white text-(--text-primary) transition hover:bg-(--hover-bg)"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          <Link
            href="/products"
            onClick={() => setIsOpen(false)}
            className="rounded-xl px-4 py-3 text-md font-bold text-(--text-primary) transition hover:bg-(--hover-bg) hover:text-(--accent-hover)"
          >
            Products
          </Link>

          <Link
            href="/basket"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between rounded-xl px-4 py-3 text-md font-medium text-(--text-primary) transition hover:bg-(--hover-bg) hover:text-(--accent-hover)"
          >
            <span className="flex items-center gap-2">
              <ShoppingBasket size={24} />
              Basket
            </span>

            {hydrated && totalItems > 0 ? (
              <span className="flex min-w-6 items-center justify-center rounded-full bg-(--accent) px-2 py-0.5 text-xs font-medium text-white">
                {totalItems}
              </span>
            ) : null}
          </Link>
        </nav>
      </aside>
    </>
  );
}
