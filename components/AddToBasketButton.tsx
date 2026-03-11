"use client";

import { useBasketStore } from "@/lib/store/store";
import { Product } from "@/types/product";

type AddToBasketButtonProps = {
  product: Product;
};

export function AddToBasketButton({ product }: AddToBasketButtonProps) {
  const addItem = useBasketStore((state) => state.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      className="mt-6 rounded-3xl bg-(--accent) px-6 py-3 text-sm font-medium text-white transition hover:bg-(--accent-hover)"
    >
      Add to Basket
    </button>
  );
}
