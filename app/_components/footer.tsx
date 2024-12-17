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

import logo from "@public/logo-footer.svg";

const footerContent = (
  <div className="flex flex-col gap-10 text-right">
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-stone-800">
        فروشگاه اینترنتی پوشاک و لباس مردانه وب پوش
      </h1>
      <p className="text-xs font-light leading-5 text-stone-800" dir="rtl">
        فروشگاه لباس مردانه وب پوش از سال ۱۳۹۳ با هدف ایجاد بستری مناسب و مطمئن
        و نیز راحتی هرچه بیشتر مشتریان، برای خرید حضوری و غیرحضوری پوشاک مردانه
        شروع به فعالیت نمود. ما با ارائه انواع البسه مردانه نظیر: انواع{" "}
        <strong>پیراهن مردانه</strong> (پیراهن های رسمی، یقه دپلمات، آستین
        کوتاه، چهارخانه، جین و...)، انواع <strong>شلوار مردانه</strong>{" "}
        (شلوارهای پارچه ای، کتان، جین واسلش)، انواع <strong>تیشرت</strong> و{" "}
        <strong> پولوشرت </strong>و انواع{" "}
        <strong>کت، جلیقه، سویشرت، کاپشن، پلیور</strong> و ... همچنین انواع{" "}
        <strong>کفش های مردانه</strong> (کفش های رسمی، روزمره و ورزشی) و اکسسوری
        هایی نظیر <strong>کمربند، کلاه</strong> و... به دنبال ارائه تجربه ای
        راحت و لذت بخش از <strong>خرید اینترنتی </strong> برای مشتریان می باشیم.
        مجموعه وب پوش ارائه
        <strong>محصولات با کیفیت</strong> را در دستور کار خود قرار داده است. از
        این رو تمامی محصولات ارائه شده در سایت و فروشگاه های وب پوش از محصولات
        با کیفیت می باشند. برای اطمینان خاطر مشتریان، تیم پشتیبانی وب پوش شنبه
        تا پنجشنبه از ساعت ۹ الی ۱۷ آماده راهنمایی و پاسخگویی به سوالات شما
        مشتریان عزیز می باشند. همچنین جهت رفاه هرچه بیشتر مشتریان پنج فروشگاه
        حضوری وب پوش (فروشگاه های اقدسیه، شهرک غرب، ایران‌مال
        <span dir="ltr"> G1 </span>، ایران‌مال
        <span dir="ltr"> G2 </span>و هدیش مال) هر روز هفته از ساعت ۱۱ صبح الی ۱۰
        شب آماده خدمت رسانی به مشتریان می باشد.
      </p>
    </div>
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-stone-800">خرید اقساطی لباس مردانه</h1>
      <p className="text-xs font-light leading-5 text-stone-800" dir="rtl">
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
    <footer className="flex w-full shrink-0 flex-col items-center border-t bg-stone-50">
      <div className="flex w-10/12 flex-col items-center justify-between gap-8 pb-4">
        <div className="flex flex-col">
          {/* container logo and sections */}
          <div className="flex flex-row items-start justify-between gap-24 py-12">
            <div className="basis-2/12">
              <Image src={logo} alt="logo" />
            </div>
            {/* container sections */}
            <div className="flex basis-10/12 flex-row justify-between">
              {/* container links */}
              <div className="flex flex-col gap-6 text-stone-700">
                <span className="text-md font-medium">درباره وب‌ پوش</span>
                <nav>
                  <ul className="flex flex-col gap-2 text-sm font-light">
                    <li>
                      <Link href="">درباره ما</Link>
                    </li>
                    <li>
                      <Link href="">ارتباط با ما</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="flex flex-col gap-6 text-stone-700">
                <span className="text-md font-medium">خدمات مشتریان</span>
                <nav>
                  <ul className="flex flex-col gap-2 text-sm font-light">
                    <li>
                      <Link href="">پشتیبانی: ۹۱۰۰۵۰۰۵ - ۰۲۱</Link>
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
              <div className="flex flex-col gap-6 text-stone-700">
                <span className="text-md font-medium">راهنمای خرید</span>
                <nav>
                  <ul className="flex flex-col gap-2 text-sm font-light">
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
              <div className="flex basis-2/5 flex-col gap-4 text-stone-700">
                <span className="text-md font-medium">
                  ثبت ایمیل در خبرنامه
                </span>
                <div className="flex w-full flex-col gap-10 text-sm font-light">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row">
                      <button className="basis-1/3 bg-stone-900 px-8 py-3 text-stone-50">
                        ثبت
                      </button>
                      <input
                        type="email"
                        className="basis-2/3 border border-stone-400 px-4 text-right outline-none"
                        placeholder="آدرس ایمیل شما"
                      />
                    </div>
                    <span className="font-normal text-stone-800">
                      از جدید ترین محصولات و تخفیف ها باخبر شوید
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
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
                        <FontAwesomeIcon
                          icon={faTelegram}
                          style={{ fontSize: 21 }}
                        />
                      </button>
                      <button>
                        <FontAwesomeIcon
                          icon={faInstagram}
                          style={{ fontSize: 23 }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="mb-4 h-px w-full bg-stone-400" />
          <nav className="flex flex-row items-center gap-2 text-sm font-light text-stone-700">
            <Link href="/">وبلاگ</Link>|<Link href="/">همکاری با ما</Link>|
            <Link href="/">پیراهن</Link>|<Link href="/">یقه اسکی</Link>|
            <Link href="/">دورس مردانه</Link>|<Link href="/">شلوار جین</Link>
          </nav>
        </div>
        {isHomePage && footerContent}
        <div className="flex w-full flex-row items-center justify-between text-stone-700">
          <small className="text-xs font-light">
            کلیه حقوق مادی و معنوی این سایت متعلق به فروشگاه وب‌پوش می‌باشد
          </small>
          <small className="font-english text-xs font-semibold">
            webpoosh.com - 2024 © Copyright
          </small>
        </div>
      </div>
    </footer>
  );
}
