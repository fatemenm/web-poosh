import "@fortawesome/fontawesome-svg-core/styles.css";
// import { config } from "@fortawesome/fontawesome-svg-core";
// config.autoAddCss = false;
import "./globals.css";
import { Roboto, Vazirmatn } from "next/font/google";
import PromotionalBanner from "./ui/promotional-banner";
import Header from "./ui/header";

const vazirmatn = Vazirmatn({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${vazirmatn.className} ${roboto.className}`}>
      <link rel="icon" href="/icon.ico" sizes="any" />
      <body className={vazirmatn.className}>
        <PromotionalBanner />
        <div className="flex flex-col ">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
