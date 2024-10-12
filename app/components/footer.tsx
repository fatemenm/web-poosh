import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import logo from "../../public/logo-footer.svg";
import Image from "next/image";
import { roboto } from "../(pages)/(home)/layout";

export default function Footer({
  children,
}: {
  children: string | JSX.Element;
}) {
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
          <div className="">
            <Image src={logo} alt="logo" width={240} height={185} />
          </div>
        </div>
        <hr className="bg-stone-400 h-px w-full mb-4" />
        <div className="flex flex-row justify-end items-center gap-2 text-sm text-stone-700 font-light bg-pink ">
          <Link href="/">وبلاگ</Link>|<Link href="/">همکاری با ما</Link>|
          <Link href="/">پیراهن</Link>|<Link href="/">یقه اسکی</Link>|
          <Link href="/">دورس مردانه</Link>|<Link href="/">شلوار جین</Link>
        </div>
      </div>
      {children}
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
