import { products } from "@/data/products";
import { ProductSort } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";

const allowedSorts: ProductSort[] = ["price_asc", "price_desc", "rating_desc"];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const q = searchParams.get("q")?.trim() || undefined;
  const tag = searchParams.get("tag")?.trim() || undefined;
  const sortParam = searchParams.get("sort")?.trim() || undefined;
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const pageParam = searchParams.get("page");
  const pageSizeParam = searchParams.get("pageSize");

  const minPrice = minPriceParam ? Number(minPriceParam) : undefined;
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;
  const page = pageParam ? Number(pageParam) : 1;
  const pageSize = pageSizeParam ? Number(pageSizeParam) : 6;

  if (sortParam && !allowedSorts.includes(sortParam as ProductSort)) {
    return NextResponse.json(
      { message: "Invalid sort value" },
      { status: 400 },
    );
  }
  if (minPrice !== undefined && !Number.isFinite(minPrice)) {
    return NextResponse.json(
      { message: "minPrice must be a valid number" },
      { status: 400 },
    );
  }
  if (maxPrice !== undefined && !Number.isFinite(maxPrice)) {
    return NextResponse.json(
      { message: "maxPrice must be a valid number" },
      { status: 400 },
    );
  }
  if (!Number.isInteger(page) || page < 1) {
    return NextResponse.json(
      { message: "page must be a positive integer" },
      { status: 400 },
    );
  }
  if (!Number.isInteger(pageSize) || pageSize < 1) {
    return NextResponse.json(
      { message: "pageSize must be a positive integer" },
      { status: 400 },
    );
  }

  // Apply filters in order of restrictiveness
  let filtered = products;

  if (tag) {
    const normalizedTag = tag.toLowerCase();
    filtered = filtered.filter((product) =>
      product.tags.some((item) => item.toLowerCase() === normalizedTag),
    );
  }

  if (q) {
    const normalizedQuery = q.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.brand.toLowerCase().includes(normalizedQuery) ||
        product.tags.some((item) =>
          item.toLowerCase().includes(normalizedQuery),
        ),
    );
  }

  if (minPrice !== undefined) {
    filtered = filtered.filter((product) => product.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    filtered = filtered.filter((product) => product.price <= maxPrice);
  }

  // Only sort if sortParam is provided
  if (sortParam) {
    if (sortParam === "price_asc") {
      filtered = filtered.slice().sort((a, b) => a.price - b.price);
    } else if (sortParam === "price_desc") {
      filtered = filtered.slice().sort((a, b) => b.price - a.price);
    } else if (sortParam === "rating_desc") {
      filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
    }
  }

  const total = filtered.length;
  const startIndex = (page - 1) * pageSize;
  const items = filtered.slice(startIndex, startIndex + pageSize);

  return NextResponse.json({
    items,
    total,
    page,
    pageSize,
  });
}
