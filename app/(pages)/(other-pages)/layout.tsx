import "@fortawesome/fontawesome-svg-core/styles.css";
// import { config } from "@fortawesome/fontawesome-svg-core";
// config.autoAddCss = false;
import "../../globals.css";
import { Roboto, Roboto_Mono, Vazirmatn } from "next/font/google";
import PromotionalBanner from "../../components/promotional-banner";
import Header from "../../components/header";
import Footer from "../../components/footer";

const vazirmatn = Vazirmatn({ subsets: ["latin"] });
export const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
const footerContent = "";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${vazirmatn.className} `}>
      <link rel="icon" href="/icon.ico" sizes="any" />
      <body className={`${vazirmatn.className} min-h-screen flex flex-col`}>
        <PromotionalBanner />
        <Header />
        <div className="grow">{children}</div>
        <Footer>{footerContent}</Footer>
      </body>
    </html>
  );
}
