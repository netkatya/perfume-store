import type { Metadata } from "next";
import { Cormorant, Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Toaster } from "sonner";

const manrope = Manrope({
  variable: "--manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PerfumeStore",
  description:
    "Discover luxury perfumes, signature scents, and elegant fragrance collections for every occasion.",
  openGraph: {
    title: "PerfumeStore",
    description:
      "Discover luxury perfumes, signature scents, and elegant fragrance collections for every occasion.",
    url: "https://perfume-store-eight-omega.vercel.app",
    siteName: "PerfumeStore",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PerfumeStore — luxury fragrance collections",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PerfumeStore",
    description:
      "Discover luxury perfumes, signature scents, and elegant fragrance collections for every occasion.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://perfume-store-eight-omega.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <Header />
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
