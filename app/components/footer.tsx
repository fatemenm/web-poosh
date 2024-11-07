"use client";

import {
  faFacebook,
  faInstagram,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PN from "persian-number";

import logo from "../../public/logo-footer.svg";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
const footerContent = (
  <div className="flex flex-col gap-10 text-right py-5">
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-stone-800">
        فروشگاه اینترنتی پوشاک و لباس مردانه وب پوش
      </h1>
      <p className="text-xs leading-5 text-stone-800 font-light" dir="rtl">
        فروشگاه لباس مردانه وب پوش از سال {PN.convertEnToPe(1393)} با هدف ایجاد
        بستری مناسب و مطمئن و نیز راحتی هرچه بیشتر مشتریان، برای خرید حضوری و
        غیرحضوری پوشاک مردانه شروع به فعالیت نمود. ما با ارائه انواع البسه
        مردانه نظیر: انواع <strong>پیراهن مردانه</strong> (پیراهن های رسمی، یقه
        دپلمات، آستین کوتاه، چهارخانه، جین و...)، انواع{" "}
        <strong>شلوار مردانه</strong> (شلوارهای پارچه ای، کتان، جین واسلش)،
        انواع <strong>تیشرت</strong> و <strong> پولوشرت </strong>و انواع{" "}
        <strong>کت، جلیقه، سویشرت، کاپشن، پلیور</strong> و ... همچنین انواع{" "}
        <strong>کفش های مردانه</strong> (کفش های رسمی، روزمره و ورزشی) و اکسسوری
        هایی نظیر <strong>کمربند، کلاه</strong> و... به دنبال ارائه تجربه ای
        راحت و لذت بخش از <strong>خرید اینترنتی</strong>
        برای مشتریان می باشیم. مجموعه وب پوش ارائه{" "}
        <strong>محصولات با کیفیت</strong> را در دستور کار خود قرار داده است. از
        این رو تمامی محصولات ارائه شده در سایت و فروشگاه های وب پوش از محصولات
        با کیفیت می باشند. برای اطمینان خاطر مشتریان، تیم پشتیبانی وب پوش شنبه
        تا پنجشنبه از ساعت {PN.convertEnToPe(9)} الی {PN.convertEnToPe(17)}{" "}
        آماده راهنمایی و پاسخگویی به سوالات شما مشتریان عزیز می باشند. همچنین
        جهت رفاه هرچه بیشتر مشتریان پنج فروشگاه حضوری وب پوش (فروشگاه های
        اقدسیه، شهرک غرب، ایران‌مال
        <span dir="ltr"> G1 </span>، ایران‌مال
        <span dir="ltr"> G2 </span>و هدیش مال) هر روز هفته از ساعت{" "}
        {PN.convertEnToPe(11)} صبح الی {PN.convertEnToPe(10)} شب آماده خدمت
        رسانی به مشتریان می باشد.
      </p>
    </div>
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-stone-800">خرید اقساطی لباس مردانه</h1>
      <p className="text-xs leading-5 text-stone-800 font-light" dir="rtl">
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
export default function Footer() {
  const isHomePage = usePathname() === "/" || false;
  return (
    <footer className="flex flex-col justify-between px-48 bg-stone-50 pb-4 border-t gap-8">
      <div className="flex flex-col items-end">
        {/* container logo and sections */}
        <div className="flex flex-row items-start gap-36 py-12 w-full">
          {/* container sections */}
          <div className="flex flex-row grow gap-24">
            {/* container links */}
            <div className="flex flex-col items-end grow text-stone-700 gap-4">
              <span className="text-md font-medium">ثبت ایمیل در خبرنامه</span>
              <div className="flex flex-col text-sm font-light items-end w-full gap-10">
                <div className="flex flex-col w-full items-end gap-3">
                  <div className="flex flex-row w-full">
                    <button className="bg-stone-900 text-stone-50 px-8 py-3 basis-1/3">
                      ثبت
                    </button>
                    <input
                      type="email"
                      className="basis-2/3 text-right px-4 outline-none border border-stone-400"
                      placeholder="آدرس ایمیل شما"
                    />
                  </div>
                  <span className="font-normal text-stone-800">
                    از جدید ترین محصولات و تخفیف ها باخبر شوید
                  </span>
                </div>
                <div className="flex flex-col gap-3 items-end">
                  <span className="font-normal text-stone-800">
                    ما را در شبکه‌های اجتماعی دنبال کنید
                  </span>
                  <div className="flex flex-row gap-4 pr-2">
                    <button>
                      <FontAwesomeIcon
                        icon={faFacebook}
                        style={{ fontSize: 20 }}
                      />
                    </button>
                    <button>
                      {" "}
                      <FontAwesomeIcon
                        icon={faTelegram}
                        style={{ fontSize: 20 }}
                      />
                    </button>
                    <button>
                      <FontAwesomeIcon
                        icon={faInstagram}
                        style={{ fontSize: 20 }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end text-stone-700 gap-6">
              <span className="text-md font-medium">درباره وب‌ پوش</span>
              <nav>
                <ul className="flex flex-col text-sm font-light items-end gap-2">
                  <li>
                    <Link href="">درباره ما</Link>
                  </li>
                  <li>
                    <Link href="">ارتباط با ما</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex flex-col items-end text-stone-700 gap-6">
              <span className="text-md font-medium">خدمات مشتریان</span>
              <nav>
                <ul className="flex flex-col text-sm font-light items-end gap-2">
                  <li>
                    <Link href="">
                      پشتیبانی: {PN.convertEnToPe(91005005)} -
                      {PN.convertEnToPe(0)}
                      {PN.convertEnToPe(21)}
                    </Link>
                  </li>
                  <li>
                    <Link href="">سوالات متداول</Link>
                  </li>
                  <li>
                    {" "}
                    <Link href="">بازگشت کالا</Link>
                  </li>
                  <li>
                    <Link href="">حریم خصوصی</Link>
                  </li>
                  <li>
                    <Link href="">فروشگاه حضوری</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex flex-col items-end text-stone-700 gap-6">
              <span className="text-md font-medium">راهنمای خرید</span>
              <nav>
                <ul className="flex flex-col text-sm font-light items-end gap-2">
                  <li>
                    <Link href="">راهنمای انتخاب سایز</Link>
                  </li>
                  <li>
                    <Link href="">روش ارسال</Link>
                  </li>
                  <li>
                    <Link href="">روش پرداخت</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <Image
            src={logo}
            alt="logo"
            style={{ width: "240px", height: "185px" }}
          />
        </div>
        <hr className="bg-stone-400 h-px w-full mb-4" />
        <nav className="flex flex-row-reverse justify-end items-center gap-2 text-sm text-stone-700 font-light bg-pink ">
          <Link href="/">وبلاگ</Link>|<Link href="/">همکاری با ما</Link>|
          <Link href="/">پیراهن</Link>|<Link href="/">یقه اسکی</Link>|
          <Link href="/">دورس مردانه</Link>|<Link href="/">شلوار جین</Link>
        </nav>
      </div>
      {isHomePage && footerContent}
      <div className="flex flex-row justify-between items-center text-stone-700">
        <small className={`font-semibold text-xs ${roboto.className}`}>
          webpoosh.com - 2024 © Copyright
        </small>
        <small className="font-light text-xs">
          کلیه حقوق مادی و معنوی این سایت متعلق به فروشگاه وب‌پوش می‌باشد
        </small>
      </div>
    </footer>
  );
}
