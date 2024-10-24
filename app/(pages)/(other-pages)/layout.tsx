import "@fortawesome/fontawesome-svg-core/styles.css";
import { Metadata } from "next";
import { Head } from "next/document";
import { Roboto, Roboto_Mono, Vazirmatn } from "next/font/google";

import Footer from "../../components/footer";
import Header from "../../components/header";
import PromotionalBanner from "../../components/promotional-banner";
// import { config } from "@fortawesome/fontawesome-svg-core";
// config.autoAddCss = false;
import "../../globals.css";

const vazirmatn = Vazirmatn({ subsets: ["latin"] });
export const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
export const metadata: Metadata = {
  title: "👔 لباس مردانه | فروشگاه اینترنتی پوشاک و خرید لباس مردانه | وب پوش",
  description:
    "فروشگاه اینترنتی لباس مردانه وب‌پوش : خرید اینترنتی جدیدترین مدل لباس‌ مجلسی، اسپرت و شیک مردانه | پوشاک مردانه webpoosh. خرید اقساطی لباس مردانه در وبپوش",
};
const footerContent = "";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${vazirmatn.className} `}>
      <Head>
        <link rel="icon" href="/icon.ico" sizes="any" />
      </Head>
      <body className={`${vazirmatn.className} min-h-screen flex flex-col`}>
        <PromotionalBanner />
        <Header />
        <div className="grow">{children}</div>
        <Footer>{footerContent}</Footer>
      </body>
    </html>
  );
}
