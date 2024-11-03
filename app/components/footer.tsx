"use client";

import {
  faFacebook,
  faInstagram,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { roboto } from "../(pages)/layout";
import logo from "../../public/logo-footer.svg";

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
                      {" "}
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
              <div className="flex flex-col text-sm font-light items-end gap-2">
                <Link href="">درباره ما</Link>
                <Link href="">ارتباط با ما</Link>
              </div>
            </div>
            <div className="flex flex-col items-end text-stone-700 gap-6">
              <span className="text-md font-medium">خدمات مشتریان</span>
              <div className="flex flex-col text-sm font-light items-end gap-2">
                <Link href="">پشتیبانی: 91005005 - 021</Link>
                <Link href="">سوالات متداول</Link>
                <Link href="">بازگشت کالا</Link>
                <Link href="">حریم خصوصی</Link>
                <Link href="">فروشگاه حضوری</Link>
              </div>
            </div>
            <div className="flex flex-col items-end text-stone-700 gap-6">
              <span className="text-md font-medium">راهنمای خرید</span>
              <div className="flex flex-col text-sm font-light items-end gap-2">
                <Link href="">راهنمای انتخاب سایز</Link>
                <Link href="">روش ارسال</Link>
                <Link href="">روش پرداخت</Link>
              </div>
            </div>
          </div>
          <Image
            src={logo}
            alt="logo"
            style={{ width: "240px", height: "185px" }}
          />
        </div>
        <hr className="bg-stone-400 h-px w-full mb-4" />
        <div className="flex flex-row justify-end items-center gap-2 text-sm text-stone-700 font-light bg-pink ">
          <Link href="/">وبلاگ</Link>|<Link href="/">همکاری با ما</Link>|
          <Link href="/">پیراهن</Link>|<Link href="/">یقه اسکی</Link>|
          <Link href="/">دورس مردانه</Link>|<Link href="/">شلوار جین</Link>
        </div>
      </div>
      {isHomePage && footerContent}
      <div className="flex flex-row justify-between items-center text-xs text-stone-700">
        <span className={`font-semibold ${roboto.className}`}>
          webpoosh.com - 2024 © Copyright
        </span>
        <span className="font-light">
          کلیه حقوق مادی و معنوی این سایت متعلق به فروشگاه وب‌پوش می‌باشد
        </span>
      </div>
    </footer>
  );
}
