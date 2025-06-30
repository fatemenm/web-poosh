import "@fortawesome/fontawesome-svg-core/styles.css";
import { Vazirmatn } from "next/font/google";
import { Suspense } from "react";

import Providers from "@/(pages)/Providers";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import PromoBanner from "@/components/layout/promoBanner";
import "@/globals.css";
import { getNavbarItems, getPromoBannerData } from "@/lib/data";

import Loading from "./loading";

export const metadata = {
  title: "Kaizen Clothing Store",
  description:
    "Shop men's fashion including shirts, pants, and essentials — designed for comfort, built for style.",
  icons: {
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Kaizen Clothing Store",
    description:
      "Shop men's fashion including shirts, pants, and essentials — designed for comfort, built for style.",
    url: "https://kaizen.fatemenoori.ir",
    siteName: "Kaizen",
    images: [
      {
        url: "https://kaizen.fatemenoori.ir/preview.jpg",
        width: 1536,
        height: 1024,
        alt: "Kaizen store preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaizen Clothing Store",
    description:
      "Shop men's fashion including shirts, pants, and essentials — designed for comfort, built for style.",
    images: ["https://kaizen.fatemenoori.ir/preview.jpg"],
  },
};

const vazirmatn = Vazirmatn({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-vazirmatn",
});

async function fetchData() {
  return Promise.all([getPromoBannerData(), getNavbarItems()]);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [banner, navbarItems] = await fetchData();

  return (
    <html
      lang="fa-IR"
      className={vazirmatn.className}
      style={{ direction: "rtl" }}
    >
      <body className="flex min-h-screen flex-col">
        <Providers>
          {banner && <PromoBanner data={banner} />}
          {navbarItems && <Header navbarItems={navbarItems} />}
          <main className="flex flex-1 flex-col items-center">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
