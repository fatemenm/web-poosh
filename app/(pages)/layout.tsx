import "@fortawesome/fontawesome-svg-core/styles.css";
import { Vazirmatn } from "next/font/google";
import Head from "next/head";

import Footer from "@/_components/footer";
import Header from "@/_components/header";
import { getCategories, getNavbarItems, getPromoBannerData } from "@/_lib/data";
import "@/globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-vazirmatn",
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const banner = await getPromoBannerData();
  const navbarItems = await getNavbarItems();
  const categories = await getCategories();
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
        <Header
          promoBanner={banner}
          navbarItems={navbarItems}
          categories={categories}
        />
        <main className="shrink-0 grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
