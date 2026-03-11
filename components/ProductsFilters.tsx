import Link from "next/link";
import { ProductSort } from "@/types/product";

type ProductFiltersProps = {
  q?: string;
  tag?: string;
  sort?: ProductSort;
  minPrice?: string;
  maxPrice?: string;
  pageSize?: string;
};

export function ProductsFilters({
  q,
  tag,
  sort,
  minPrice,
  maxPrice,
  pageSize,
}: ProductFiltersProps) {
  return (
    <div className="mb-10">
      <form
        action="/products"
        method="GET"
        className="rounded-3xl border border-(--border) bg-(--hover-bg)/60 p-6 shadow-sm backdrop-blur"
      >
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search perfumes..."
            className="h-11 rounded-3xl border border-(--border) bg-white px-4 text-sm outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20 md:col-span-2"
          />

          <input
            type="number"
            step={10}
            min={0}
            name="minPrice"
            defaultValue={minPrice}
            placeholder="Min £"
            className="h-11 rounded-3xl border border-(--border) bg-white px-4 text-sm outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20"
          />

          <input
            type="number"
            step={10}
            min={0}
            name="maxPrice"
            defaultValue={maxPrice}
            placeholder="Max £"
            className="h-11 rounded-3xl border border-(--border) bg-white px-4 text-sm outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20"
          />

          <select
            name="sort"
            defaultValue={sort}
            className="h-11 rounded-3xl border border-(--border) bg-white px-4 text-sm outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20"
          >
            <option value="">Sort</option>
            <option value="price_asc">Price ↑</option>
            <option value="price_desc">Price ↓</option>
            <option value="rating_desc">Most popular</option>
          </select>
        </div>

        <input type="hidden" name="tag" value={tag || ""} />
        <input type="hidden" name="pageSize" value={pageSize || "6"} />

        {/* TAGS */}
        <div className="mt-5 flex flex-wrap gap-2">
          {["floral", "fresh", "woody", "luxury"].map((presetTag) => {
            const active = tag === presetTag;

            return (
              <Link
                key={presetTag}
                href={`/products?tag=${presetTag}`}
                className={`rounded-3xl px-5 py-3 text-sm font-medium transition capitalize ${
                  active
                    ? "bg-(--accent) text-white shadow-sm"
                    : "border border-(--border) bg-white text-(--text-secondary) hover:border-(--accent) hover:text-(--accent-hover)"
                }`}
              >
                {presetTag}
              </Link>
            );
          })}
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="submit"
            className="rounded-3xl bg-(--accent) px-6 py-3 text-sm font-medium text-white transition hover:bg-(--accent-hover)"
          >
            Apply filters
          </button>

          <Link
            href="/products"
            className="rounded-3xl border border-(--border) bg-white px-6 py-3 text-sm font-medium text-(--text-secondary) transition hover:bg-(--hover-bg)"
          >
            Reset
          </Link>
        </div>
      </form>
    </div>
  );
}
