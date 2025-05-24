"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import * as Toast from "@radix-ui/react-toast";
import { Vazirmatn } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";

import Footer from "@/_components/footer";
import Header from "@/_components/header";
import { AuthProvider } from "@/_lib/context/authContext";
import { BasketProvider } from "@/_lib/context/basketContext";
import { BreadcrumbProvider } from "@/_lib/context/breadcrumbContext";
import { getNavbarItems, getPromoBannerData } from "@/_lib/data";
import { NavbarItem, PromoBanner } from "@/_lib/definitions";
import "@/globals.css";

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
  const [banner, setBanner] = useState<PromoBanner>();
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
              <Header promoBanner={banner} navbarItems={navbarItems} />
              <BreadcrumbProvider>
                <main className="flex flex-1 flex-col items-center">
                  {children}
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
