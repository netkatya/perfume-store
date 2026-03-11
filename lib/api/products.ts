import { GetProductsParams, Product, ProductsResponse } from "@/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

export async function getProducts(
  params: GetProductsParams,
): Promise<ProductsResponse> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  });

  const response = await fetch(`${BASE_URL}/api/products?${query.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: ProductsResponse = await response.json();

  return data;
}

export async function getProductById(id: string): Promise<Product | null> {
  const response = await fetch(`${BASE_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data: Product = await response.json();

  return data;
}
