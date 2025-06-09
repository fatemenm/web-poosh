"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import * as Toast from "@radix-ui/react-toast";
import { Vazirmatn } from "next/font/google";
import Head from "next/head";
import { Suspense, useEffect, useState } from "react";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import PromoBanner from "@/components/layout/promoBanner";
import "@/globals.css";
import { AuthProvider } from "@/lib/context/authContext";
import { BasketProvider } from "@/lib/context/basketContext";
import { BreadcrumbProvider } from "@/lib/context/breadcrumbContext";
import { getNavbarItems, getPromoBannerData } from "@/lib/data";
import { NavbarItem, PromoBanner as PromoBannerType } from "@/lib/definitions";

import Loading from "./loading";

const vazirmatn = Vazirmatn({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [banner, setBanner] = useState<PromoBannerType>();
  const [navbarItems, setNavbarItems] = useState<NavbarItem[]>();

  useEffect(() => {
    const getData = async () => {
      const banner = await getPromoBannerData();
      const navbarItems = await getNavbarItems();
      setBanner(banner);
      setNavbarItems(navbarItems);
    };
    getData();
  }, []);
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
        <AuthProvider>
          <BasketProvider>
            <Toast.Provider swipeDirection="right">
              {banner ? (
                <PromoBanner data={banner} />
              ) : (
                <div className="box-border flex w-full justify-center bg-stone-800 py-4 text-xs font-light text-white sm:px-2 lg:text-sm">
                  ... در حال بارگذاری
                </div>
              )}
              <Header navbarItems={navbarItems} />
              <BreadcrumbProvider>
                <main className="flex flex-1 flex-col items-center">
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                </main>
              </BreadcrumbProvider>
              <Footer />
            </Toast.Provider>
          </BasketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
