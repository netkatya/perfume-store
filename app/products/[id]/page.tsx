import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/api/products";
import { AddToBasketButton } from "@/components/AddToBasketButton";
import { Star } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        {/* IMAGE */}
        <div className="aspect-square overflow-hidden rounded-3xl border border-(--border) bg-gray-50">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-(--text-secondary)">
              No image
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="flex flex-col">
          <p className="text-sm font-medium text-(--text-secondary)">
            {product.brand}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-(--text-primary)">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-1.5">
            <Star size={16} color="#edf503" aria-hidden="true" />
            <span className="text-sm text-(--text-secondary)">
              <span className="sr-only">Rating: </span>
              {product.rating}
            </span>
          </div>

          <p className="mt-5 leading-relaxed text-(--text-secondary)">
            {product.description}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
            {product.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-(--border) bg-white px-3 py-1 text-sm font-medium capitalize text-(--text-secondary) shadow-sm"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <p className="text-3xl font-bold text-(--text-primary)">
              <span className="sr-only">Price: </span>£
              {product.price.toFixed(2)}
            </p>

            <div className="mt-4">
              <AddToBasketButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
