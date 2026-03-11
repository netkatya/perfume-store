import Link from "next/link";
import { Product } from "@/types/product";
import Image from "next/image";
import { Star } from "lucide-react";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-(--border) bg-(--hover-bg)/60">
      <div className=" bg-gray-100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
            width={200}
            height={200}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-center">
          <p className="text-md font-medium text-(--text-secondary)">
            {product.brand}
          </p>
          <p className="flex gap-1 text-xs text-gray-500">
            <Star size={16} color="#edf503"></Star> {product.rating}
          </p>
        </div>

        <h2 className="mt-1 text-xl font-semibold text-(--text-primary)">
          {product.name}
        </h2>

        <p className="mt-2 line-clamp-2 text-md leading-relaxed text-(--text-secondary)">
          {product.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-(--border) bg-white shadow-sm px-3 py-1 text-md font-medium text-(--text-secondary) capitalize"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-lg font-semibold text-(--text-primary)">
            £{product.price.toFixed(2)}
          </span>
          <Link
            href={`/products/${product.id}`}
            className="rounded-3xl border border-(--accent) bg-(--accent) px-5 py-2 text-sm font-medium shadow-sm text-white transition hover:bg-white hover:text-(--accent)"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
