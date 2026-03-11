import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <Image
        src="/not-found/not-found.png"
        alt="fragrance"
        width={400}
        height={400}
      ></Image>
      <div>
        <p className="text-3xl font-bold uppercase tracking-[0.2em] text-(--accent)">
          404 error
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-(--text-primary) sm:text-4xl">
          Page not found
        </h1>

        <p className="mt-4 max-w-md text-sm leading-6 text-(--text-secondary) sm:text-base">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-(--accent) px-5 text-sm font-medium text-white transition hover:bg-(--accent-hover)"
          >
            Back to products
          </Link>

          <Link
            href="/basket"
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-(--border) bg-(--background) px-5 text-sm font-medium text-(--text-primary) transition hover:bg-(--hover-bg) hover:text-(--accent-hover)"
          >
            Open basket
          </Link>
        </div>
      </div>
    </main>
  );
}
