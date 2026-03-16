import { Pagination } from "@/components/Pagination";
import { ProductCard } from "@/components/ProductCard";
import { ProductsFilters } from "@/components/ProductsFilters";
import { getProducts } from "@/lib/api/products";
import { ProductSort } from "@/types/product";

type Props = {
  searchParams: Promise<{
    q?: string;
    tag?: string;
    sort?: ProductSort;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    pageSize?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;

  const result = await getProducts({
    q: params.q,
    tag: params.tag,
    sort: params.sort,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    page: params.page,
    pageSize: params.pageSize,
  });

  const totalPages = Math.ceil(result.total / result.pageSize);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Products</h1>

      <ProductsFilters
        q={params.q}
        tag={params.tag}
        sort={params.sort}
        minPrice={params.minPrice}
        maxPrice={params.maxPrice}
        pageSize={params.pageSize ?? "6"}
      />

      {result.items.length === 0 ? (
        <div className=" p-8 text-center">
          <h2 className="text-xl font-semibold">No products found</h2>
          <p className="mt-2 text-sm text-gray-600">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {result.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>

          <Pagination
            currentPage={result.page}
            totalPages={totalPages}
            searchParams={{
              q: params.q,
              tag: params.tag,
              sort: params.sort,
              minPrice: params.minPrice,
              maxPrice: params.maxPrice,
              pageSize: params.pageSize ?? "6",
            }}
          />
        </>
      )}
    </main>
  );
}
