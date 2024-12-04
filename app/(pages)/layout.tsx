import "@fortawesome/fontawesome-svg-core/styles.css";
import { Vazirmatn } from "next/font/google";
import Head from "next/head";

import Footer from "@/components/general/footer";
import Header from "@/components/general/header";
import "@/globals.css";
import { getBannerData, getNavbarItems } from "@/lib/data";

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
  const banner = await getBannerData();
  const navbarItems = await getNavbarItems();
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
        <Header bannerData={banner} navbarItemsData={navbarItems} />
        <main className="shrink-0 grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// export const metadata: Metadata = {
//   title: "👔 لباس مردانه | فروشگاه اینترنتی پوشاک و خرید لباس مردانه | وب پوش",
//   description:
//     "فروشگاه اینترنتی لباس مردانه وب‌پوش : خرید اینترنتی جدیدترین مدل لباس‌ مجلسی، اسپرت و شیک مردانه | پوشاک مردانه webpoosh. خرید اقساطی لباس مردانه در وبپوش",
// };
