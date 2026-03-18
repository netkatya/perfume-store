import { Product } from "@/types/product";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <li className="overflow-hidden rounded-3xl border border-(--border) bg-(--hover-bg)/60 transition hover:shadow-md">
      <Link
        href={`/products/${product.id}`}
        className="flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-(--accent) focus-visible:ring-offset-2"
        aria-label={`View ${product.name} by ${product.brand}`}
      >
        <div className="bg-gray-100">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt=""
              className="h-full w-full object-cover"
              width={200}
              height={200}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 p-5">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-(--text-secondary)">
              {product.brand}
            </p>
            <p className="flex items-center gap-1 text-xs text-gray-500">
              <Star size={16} color="#edf503" aria-hidden="true" />
              <span aria-label={`Rating ${product.rating} out of 5`}>
                {product.rating}
              </span>
            </p>
          </div>

          <h2 className="mt-1 text-xl font-semibold text-(--text-primary)">
            {product.name}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-(--text-secondary)">
            {product.description}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
            {product.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-(--border) bg-white shadow-sm px-3 py-1 text-sm font-medium text-(--text-secondary) capitalize"
              >
                {tag}
              </li>
            ))}
          </ul>

          <p className="mt-5 text-lg font-semibold text-(--text-primary)">
            <span className="sr-only">Price: </span>£{product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </li>
  );
}
