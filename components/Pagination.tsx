import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
};

function buildPageLink(
  searchParams: Record<string, string | undefined>,
  nextPage: number,
) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  params.set("page", String(nextPage));

  return `/products?${params.toString()}`;
}

export function Pagination({ currentPage, totalPages, searchParams }: Props) {
  return (
    <div className="mt-10 flex items-center gap-4 justify-center">
      {currentPage > 1 ? (
        <Link
          href={buildPageLink(searchParams, currentPage - 1)}
          className="inline-flex h-11 items-center justify-center rounded-3xl border border-(--border) bg-white px-5 text-sm font-medium text-(--text-primary) transition hover:border-(--accent) hover:bg-(--hover-bg) hover:text-(--accent-hover)"
        >
          Previous
        </Link>
      ) : (
        <span className="inline-flex h-11 items-center justify-center rounded-3xl border border-(--border) bg-(--background) px-5 text-sm font-medium text-(--text-secondary) opacity-60">
          Previous
        </span>
      )}

      <div className="inline-flex h-11 items-center justify-center text-sm font-medium text-(--text-secondary)">
        <span className="text-(--text-primary)">{currentPage}</span>
        <span className="mx-2 text-(--text-secondary)">/</span>
        <span>{totalPages || 1}</span>
      </div>

      {currentPage < totalPages ? (
        <Link
          href={buildPageLink(searchParams, currentPage + 1)}
          className="inline-flex h-11 items-center justify-center rounded-3xl bg-(--accent) px-5 text-sm font-medium text-white transition hover:bg-(--accent-hover)"
        >
          Next
        </Link>
      ) : (
        <span className="inline-flex h-11 items-center justify-center rounded-3xl bg-(--hover-bg) px-5 text-sm font-medium text-(--text-secondary) opacity-60">
          Next
        </span>
      )}
    </div>
  );
}
