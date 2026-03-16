"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import SplashCursor from "@/components/SplashCursor";

export default function Page() {
  return (
    <main>
      <SplashCursor />
      <section className="relative overflow-hidden border-b border-(--border) bg-(--background)">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(167,139,250,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.16),transparent_30%),linear-gradient(to_bottom,#fafafc,rgba(245,243,255,0.75))]" />

        <div className="relative mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="max-w-xl">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-(--text-primary) sm:text-5xl md:text-6xl">
              Fragrance that
              <span className="block text-(--accent-hover)">
                makes people remember you
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-(--text-secondary) sm:text-lg">
              Explore elegant perfumes for every mood — from soft floral notes
              to bold, unforgettable evening scents. Find the bottle that feels
              like you.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-(--accent) bg-(--accent) px-10 py-3.5 text-xl font-semibold text-white shadow-md transition-all duration-300 hover:bg-white hover:border-(--accent) hover:text-(--accent) focus-visible:outline focus-visible:outline-(--accent)"
              >
                Shop now
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-(--text-secondary)">
              <div>
                <span className="block text-xl font-semibold text-(--text-primary)">
                  50+
                </span>
                luxury fragrances
              </div>
              <div className="h-10 w-px bg-(--border)" />
              <div>
                <span className="block text-xl font-semibold text-(--text-primary)">
                  Top
                </span>
                gift-worthy picks
              </div>
              <div className="h-10 w-px bg-(--border)" />
              <div>
                <span className="block text-xl font-semibold text-(--text-primary)">
                  New
                </span>
                seasonal arrivals
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute h-105 w-105 rounded-full bg-(--accent)/20 blur-3xl" />

            <div className="relative w-full max-w-130 rounded-4xl border border-white/60 bg-white/50 p-4 shadow-[0_25px_80px_rgba(167,139,250,0.18)] backdrop-blur-md">
              <div className="relative overflow-hidden rounded-3xl border border-(--border) bg-[linear-gradient(135deg,#fdf4ff_0%,#f5f3ff_35%,#ede9fe_100%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.95),transparent_25%),radial-gradient(circle_at_80%_25%,rgba(255,255,255,0.55),transparent_20%),radial-gradient(circle_at_50%_80%,rgba(167,139,250,0.15),transparent_35%)]" />

                <div className=" flex  items-center justify-center ">
                  <Image
                    loading="eager"
                    src="/hero-perfume.png"
                    width={320}
                    height={320}
                    alt="Elegant perfume bottle"
                    className="relative z-10 h-auto w-150 object-contain drop-shadow-[0_30px_50px_rgba(47,47,58,0.2)]"
                  />

                  <div className="absolute left-6 top-6 z-10 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-md backdrop-blur-sm">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-(--text-secondary)">
                      Best Seller
                    </p>
                    <p className="mt-1 text-sm font-semibold text-(--text-primary)">
                      Floral & Sweet
                    </p>
                  </div>

                  <div className="absolute bottom-6 right-6 z-10 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-right shadow-md backdrop-blur-sm">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-(--text-secondary)">
                      New Drop
                    </p>
                    <p className="mt-1 text-sm font-semibold text-(--text-primary)">
                      Limited Edition
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
