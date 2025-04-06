"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { Vazirmatn } from "next/font/google";
import Head from "next/head";
import { createContext, useEffect, useState } from "react";

import Footer from "@/_components/footer";
import Header from "@/_components/header";
import { BasketProvider } from "@/_lib/context/basketContext";
import { getNavbarItems, getPromoBannerData } from "@/_lib/data";
import { Image, NavbarItem, PromoBanner } from "@/_lib/definitions";
import "@/globals.css";

type ProductType = {
  id: number;
  documentId: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  color: string;
  size: string;
  image: Image;
};

type basketContextType = {
  items: ProductType[];
  addItem: (item: ProductType) => void;
  removeItem: (item: ProductType) => void;
};

const vazirmatn = Vazirmatn({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export const basketContext = createContext<basketContextType | null>(null);

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
        <BasketProvider>
          <Header promoBanner={banner} navbarItems={navbarItems} />
          <main className="shrink-0 grow">{children}</main>
          <Footer />
        </BasketProvider>
      </body>
    </html>
  );
}
