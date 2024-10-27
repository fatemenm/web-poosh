import "@fortawesome/fontawesome-svg-core/styles.css";
import { Metadata } from "next";
import { Roboto, Vazirmatn } from "next/font/google";
import Head from "next/head";

import Footer from "@/components/footer";
import Header from "@/components/header";
import "@/globals.css";

const vazirmatn = Vazirmatn({ subsets: ["latin"] });
export const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
const footerContent = (
  <div className="flex flex-col gap-10 text-right py-5">
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-stone-800">
        فروشگاه اینترنتی پوشاک و لباس مردانه وب پوش
      </h1>
      <p className="text-xs leading-5 text-stone-800">
        فروشگاه لباس مردانه وب پوش از سال 1393 با هدف ایجاد بستری مناسب و مطمئن
        و نیز راحتی هرچه بیشتر مشتریان، برای خرید حضوری و غیرحضوری پوشاک مردانه
        شروع به فعالیت نمود. ما با ارائه انواع البسه مردانه نظیر: انواع پیراهن
        مردانه (پیراهن های رسمی، یقه دپلمات، آستین کوتاه، چهارخانه، جین و...)،
        انواع شلوار مردانه (شلوارهای پارچه ای، کتان، جین واسلش)، انواع تیشرت و
        پولوشرت و انواع کت، جلیقه، سویشرت، کاپشن، پلیور و ... همچنین انواع کفش
        های مردانه (کفش های رسمی، روزمره و ورزشی) و اکسسوری هایی نظیر کمربند،
        کلاه و... به دنبال ارائه تجربه ای راحت و لذت بخش از خرید اینترنتی برای
        مشتریان می باشیم. مجموعه وب پوش ارائه محصولات با کیفیت را در دستور کار
        خود قرار داده است. از این رو تمامی محصولات ارائه شده در سایت و فروشگاه
        های وب پوش از محصولات با کیفیت می باشند. برای اطمینان خاطر مشتریان، تیم
        پشتیبانی وب پوش شنبه تا پنجشنبه از ساعت 9 الی 17 آماده راهنمایی و
        پاسخگویی به سوالات شما مشتریان عزیز می باشند. همچنین جهت رفاه هرچه بیشتر
        مشتریان پنج فروشگاه حضوری وب پوش (فروشگاه های اقدسیه، شهرک غرب،
        ایران‌مال G1، ایران‌مال G2 و هدیش مال) هر روز هفته از ساعت 11 صبح الی 10
        شب آماده خدمت رسانی به مشتریان می باشد
      </p>
    </div>
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-stone-800">خرید اقساطی لباس مردانه</h1>
      <p className="text-xs leading-5 text-stone-800">
        از این پس امکان خرید قسطی لباس از فروشگاه اینترنتی وبپوش فراهم شده است.
        مشتریان عزیز می‌توانند با استفاده از اعتبار اسنپ پی خود ماهانه در چهار
        قسط، بدون هیچ گونه ضمانت، بهره و یا وثیقه ای خرید خود را انجام دهند. با
        استفاده از این سرویس، هزینه کالای مورد نظر به چهار قسط تقسیم می‌شود و به
        محض پرداخت قسط اول خرید نهایی می‌شود و می‌توان هر قسط را ماهیانه از طریق
        اپلیکیشن اسنپ پی پرداخت نمود.
      </p>
    </div>
  </div>
);
export const metadata: Metadata = {
  title: "👔 لباس مردانه | فروشگاه اینترنتی پوشاک و خرید لباس مردانه | وب پوش",
  description:
    "فروشگاه اینترنتی لباس مردانه وب‌پوش : خرید اینترنتی جدیدترین مدل لباس‌ مجلسی، اسپرت و شیک مردانه | پوشاک مردانه webpoosh. خرید اقساطی لباس مردانه در وبپوش",
};
export default function RootLayout({
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
        <Header />
        <div className="grow">{children}</div>
        <Footer>{footerContent}</Footer>
      </body>
    </html>
  );
}
