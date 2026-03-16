"use client";

import { useBasketStore } from "@/lib/store/store";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function BasketPage() {
  const hydrated = useBasketStore((state) => state.hydrated);

  const items = useBasketStore((state) => state.items);
  const removeItem = useBasketStore((state) => state.removeItem);
  const updateQuantity = useBasketStore((state) => state.updateQuantity);
  const clearBasket = useBasketStore((state) => state.clearBasket);

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (!hydrated) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl font-bold">Your Basket</h1>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold">Your Basket</h1>

        <div className="rounded-2xl border border-(--border) bg-white p-8 text-center shadow-sm">
          <p className="text-(--text-secondary)">Your basket is empty.</p>

          <Link
            href="/products"
            className="mt-5 inline-block rounded-xl bg-(--accent) px-6 py-3 text-sm font-medium text-white transition hover:bg-(--accent-hover)"
          >
            Browse perfumes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-(--text-primary)">
          Your Basket
        </h1>

        <button
          onClick={clearBasket}
          className="rounded-xl border border-(--border) bg-white px-4 py-2 text-sm font-medium text-(--text-secondary) transition hover:bg-(--hover-bg) hover:text-(--accent-hover)"
        >
          Clear basket
        </button>
      </div>

      {/* ITEMS */}
      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="grid gap-4 rounded-2xl border border-(--border) bg-white p-4 shadow-sm md:grid-cols-[120px_1fr_auto]"
          >
            <div className="overflow-hidden rounded-xl bg-(--background)">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="h-30 w-full object-cover"
                />
              ) : (
                <div className="flex h-30 items-center justify-center text-sm text-(--text-secondary)">
                  No image
                </div>
              )}
            </div>

            <div>
              <p className="text-sm text-(--text-secondary)">{item.brand}</p>

              <h2 className="text-lg font-semibold text-(--text-primary)">
                {item.name}
              </h2>

              <p className="mt-2 text-sm text-(--text-secondary)">
                £{item.price.toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <span className="text-sm text-(--text-secondary)">Quantity</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-(--border) bg-white text-lg text-(--text-primary) transition hover:bg-(--hover-bg)"
                >
                  −
                </button>

                <span className="min-w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-(--border) bg-white text-lg text-(--text-primary) transition hover:bg-(--hover-bg)"
                >
                  +
                </button>
              </div>

              <p className="text-sm font-semibold text-(--text-primary)">
                £{(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeItem(item.id)}
                className="text-sm text-(--text-secondary) transition hover:text-red-500"
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-(--border) bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-(--text-primary)">
            Total
          </span>

          <span className="text-2xl font-bold text-(--text-primary)">
            £{totalPrice.toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => {
            toast.success("Checkout completed successfully");
            clearBasket();
          }}
          className="mt-6 w-full rounded-xl bg-(--accent) px-6 py-3 text-sm font-medium text-white transition hover:bg-(--accent-hover)"
        >
          Checkout
        </button>
      </div>
    </main>
  );
}
