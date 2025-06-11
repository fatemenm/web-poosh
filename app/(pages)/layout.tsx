import "@fortawesome/fontawesome-svg-core/styles.css";
import { Vazirmatn } from "next/font/google";
import Head from "next/head";
import { Suspense } from "react";

import Providers from "@/(pages)/Providers";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import PromoBanner from "@/components/layout/promoBanner";
import "@/globals.css";
import { getNavbarItems, getPromoBannerData } from "@/lib/data";

import Loading from "./loading";

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
      <Head>
        <link rel="icon" href="/icon.ico" sizes="any" />
      </Head>
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
