"use client";

import * as Slider from "@radix-ui/react-slider";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ProductSort } from "@/types/product";

const TAGS = ["floral", "fresh", "woody", "luxury"] as const;
const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "none", label: "Sort" },
  { value: "price_asc", label: "Price ↑" },
  { value: "price_desc", label: "Price ↓" },
  { value: "rating_desc", label: "Most popular" },
];
const PRICE_MIN = 0;
const PRICE_MAX = 300;

type Props = {
  q?: string;
  tag?: string;
  sort?: ProductSort;
  minPrice?: string;
  maxPrice?: string;
};

export function ProductsFilters({ q, tag, sort, minPrice, maxPrice }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(q ?? "");
  const [priceRange, setPriceRange] = useState([
    minPrice ? Number(minPrice) : PRICE_MIN,
    maxPrice ? Number(maxPrice) : PRICE_MAX,
  ]);

  function updateParams(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.delete("page");
    router.push(`/products?${params}`);
  }

  const debouncedSearch = useDebouncedCallback((value: string) => {
    updateParams({ q: value });
  }, 400);

  const debouncedPrice = useDebouncedCallback((range: number[]) => {
    updateParams({
      minPrice: range[0] === PRICE_MIN ? undefined : String(range[0]),
      maxPrice: range[1] === PRICE_MAX ? undefined : String(range[1]),
    });
  }, 400);

  function handleTagClick(presetTag: string) {
    updateParams({ tag: tag === presetTag ? undefined : presetTag });
  }

  function handleSort(value: string) {
    updateParams({ sort: value === "none" ? undefined : value });
  }

  return (
    <div className="mb-10">
      <div className="rounded-3xl border border-(--border) bg-(--hover-bg)/60 p-6 shadow-sm backdrop-blur">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {/* SEARCH */}
          <div className="md:col-span-2">
            <label htmlFor="search" className="sr-only">
              Search perfumes
            </label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                debouncedSearch(e.target.value);
              }}
              placeholder="Search perfumes..."
              className="h-11 w-full rounded-3xl border border-(--border) bg-white px-4 text-sm outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20"
            />
          </div>

          {/* SORT */}
          <div>
            <label htmlFor="sort-trigger" className="sr-only">
              Sort products
            </label>
            <Select.Root value={sort ?? "none"} onValueChange={handleSort}>
              <Select.Trigger
                id="sort-trigger"
                aria-label="Sort products"
                className="flex h-11 w-full items-center justify-between rounded-3xl border border-(--border) bg-white px-4 text-sm text-(--text-secondary) outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20"
              >
                <Select.Value placeholder="Sort" />
                <Select.Icon>
                  <ChevronDown size={16} aria-hidden="true" />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="z-50 overflow-hidden rounded-2xl border border-(--border) bg-white shadow-lg">
                  <Select.ScrollUpButton className="flex items-center justify-center py-1">
                    <ChevronUp size={16} aria-hidden="true" />
                  </Select.ScrollUpButton>

                  <Select.Viewport className="p-1">
                    {SORT_OPTIONS.map((option) => (
                      <Select.Item
                        key={option.value}
                        value={option.value}
                        className="relative flex cursor-pointer items-center rounded-xl px-8 py-2 text-sm text-(--text-primary) outline-none hover:bg-(--hover-bg) data-highlighted:bg-(--hover-bg)"
                      >
                        <Select.ItemText>{option.label}</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-2">
                          <Check size={14} aria-hidden="true" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>

                  <Select.ScrollDownButton className="flex items-center justify-center py-1">
                    <ChevronDown size={16} aria-hidden="true" />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </div>

        {/* PRICE SLIDER */}
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <label
              htmlFor="price-slider"
              className="text-sm text-(--text-secondary)"
            >
              Price
            </label>
            <span
              aria-live="polite"
              aria-atomic="true"
              className="text-sm text-(--text-secondary)"
            >
              £{priceRange[0]} — £{priceRange[1]}
            </span>
          </div>

          <Slider.Root
            id="price-slider"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={10}
            value={priceRange}
            onValueChange={(range) => {
              setPriceRange(range);
              debouncedPrice(range);
            }}
            className="relative flex h-5 w-full touch-none items-center"
          >
            <Slider.Track className="relative h-1.5 w-full grow rounded-full bg-(--border)">
              <Slider.Range className="absolute h-full rounded-full bg-(--accent)" />
            </Slider.Track>

            {priceRange.map((_, i) => (
              <Slider.Thumb
                key={i}
                aria-label={i === 0 ? "Minimum price" : "Maximum price"}
                className="block h-5 w-5 rounded-full border-2 border-(--accent) bg-white shadow transition hover:bg-(--hover-bg) focus:outline-none focus:ring-2 focus:ring-(--accent)/20"
              />
            ))}
          </Slider.Root>
        </div>

        {/* TAGS */}
        <div
          className="mt-5 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {TAGS.map((presetTag) => {
            const active = tag === presetTag;

            return (
              <button
                key={presetTag}
                type="button"
                onClick={() => handleTagClick(presetTag)}
                aria-pressed={active}
                className={`rounded-3xl px-5 py-3 text-sm font-medium capitalize transition ${
                  active
                    ? "bg-(--accent) text-white shadow-sm"
                    : "border border-(--border) bg-white text-(--text-secondary) hover:border-(--accent) hover:text-(--accent-hover)"
                }`}
              >
                {presetTag}
              </button>
            );
          })}
        </div>

        {/* RESET */}
        <div className="mt-5">
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setPriceRange([PRICE_MIN, PRICE_MAX]);
              router.push("/products");
            }}
            className="rounded-3xl border border-(--border) bg-white px-6 py-3 text-sm font-medium text-(--text-secondary) transition hover:bg-(--hover-bg)"
          >
            Reset filters
          </button>
        </div>
      </div>
    </div>
  );
}
