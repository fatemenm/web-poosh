import "@fortawesome/fontawesome-svg-core/styles.css";
import { Vazirmatn } from "next/font/google";
import Head from "next/head";

import Footer from "@/components/footer";
import Header from "@/components/header";
import "@/globals.css";
import { getBannerData, getNavbarItems } from "@/lib/data";

const vazirmatn = Vazirmatn({ subsets: ["latin"] });

const banner = await getBannerData();
const navbarItems = await getNavbarItems();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon.ico" sizes="any" />
      </Head>
      <body className={`${vazirmatn.className} min-h-screen flex flex-col`}>
        <Header bannerData={banner} navbarItemsData={navbarItems} />
        <main className="grow">{children}</main>
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
