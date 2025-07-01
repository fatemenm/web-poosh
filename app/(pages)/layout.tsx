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
  title: "فروشگاه آنلاین لباس مردانه کایزن",
  description:
    "پوشاک مردانه با استایل شیک و راحتی بی‌نظیر — از پیراهن و شلوار تا آیتم‌های ضروری، با طراحی مدرن و کاربردی",
  icons: {
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "فروشگاه آنلاین لباس مردانه کایزن",
    description:
      "پوشاک مردانه با استایل شیک و راحتی بی‌نظیر — از پیراهن و شلوار تا آیتم‌های ضروری، با طراحی مدرن و کاربردی",
    url: "https://kaizen.fatemenoori.ir",
    siteName: "کایزن",
    images: [
      {
        url: "https://kaizen.fatemenoori.ir/preview-v2.png",
        width: 1200,
        height: 630,
        alt: "Kaizen store preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "فروشگاه آنلاین لباس مردانه کایزن",
    description:
      "پوشاک مردانه با استایل شیک و راحتی بی‌نظیر — از پیراهن و شلوار تا آیتم‌های ضروری، با طراحی مدرن و کاربردی",
    images: ["https://kaizen.fatemenoori.ir/preview-v2.png"],
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
