import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/api/products";
import { AddToBasketButton } from "@/components/AddToBasketButton";
import { Star } from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-lg border">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-gray-600">{product.description}</p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-6 text-xl font-semibold">
            £{product.price.toFixed(2)}
          </div>

          <div className="flex gap-2 mt-2 text-sm text-gray-600">
            Rating: <Star size={16} color="#edf503"></Star> {product.rating}
          </div>

          <AddToBasketButton product={product} />
        </div>
      </div>
    </main>
  );
}
