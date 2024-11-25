import { apiBaseUrl } from "@config";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

import { getClotheProducts } from "@/lib/data";
import Link from "next/link";
import {
  faChevronLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const clotheProducts = await getClotheProducts();
export async function generateStaticParams() {
  return clotheProducts?.map((product) => ({
    productId: product.id.toString(),
  }));
}
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId;
  const product = clotheProducts?.find(
    (product) => product.id === Number(productId)
  );
  return (
    <div className="flex flex-col items-center gap-8">
      {/* product card */}
      {product && (
        <div className="flex w-full flex-row justify-center gap-10">
          {/* product detail */}
          <div className="flex w-3/12 flex-col gap-6 text-right">
            {/* title */}
            <h1 className="text-2xl">
              {product.name} {product.id}
            </h1>
            {/* price */}
            <div className="flex flex-row-reverse gap-1">
              <span>
                {Number(product.price.replace(/,/g, "")).toLocaleString(
                  "fa-IR"
                )}
              </span>
              <span>تومان</span>
            </div>
            {/* snap pay */}
            <div className="flex flex-row-reverse items-center justify-start gap-4 rounded-sm bg-sky-100 p-2">
              <Image
                src="/snappay.png"
                width="32"
                height="32"
                alt="snappay logo"
                className="cursor-zoom-in"
              />
              {/* <div className="w-8 h-8 bg-blue-400 rounded-xl"></div> */}
              <div className="flex flex-col gap-1 text-xs text-sky-900">
                <span className="font-medium">
                  امکان پرداخت اقساطیِ اسنپ پی
                </span>
                <span dir="rtl">۴ قسط ماهیانه 448,750 تومان (بدون کارمزد)</span>
              </div>
            </div>
            {/* star feedback */}
            <div className="flex flex-row-reverse items-center gap-2 stroke-stone-700 text-xs font-light">
              <div>
                {[1, 2, 3, 4, 5].map((index) => {
                  return (
                    <span key={index}>
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ fontSize: 20, color: "lightgray" }}
                      />
                    </span>
                  );
                })}
              </div>
              <Link href="" className="text-stone-800">
                اولین نظر را بنویسید
              </Link>
            </div>
            <hr />
            {/* color picker */}
            <div className="flex flex-col gap-6 text-stone-800">
              <div className="text-sm font-light">
                رنگ انتخابی شما:
                <span className="pr-1 font-normal"> آبی روشن</span>
              </div>
              <div className="flex flex-row-reverse flex-wrap gap-2">
                <button className="flex h-10 w-10 flex-row items-center justify-center rounded-full border border-stone-200 p-[3px] hover:border-2 hover:border-stone-900">
                  <div className="h-full w-full rounded-full bg-indigo-100"></div>
                </button>
                <button className="flex h-10 w-10 flex-row items-center justify-center rounded-full border border-stone-200 p-[3px] hover:border-2 hover:border-stone-900">
                  <div className="h-full w-full rounded-full bg-blue-900"></div>
                </button>
              </div>
            </div>
            {/* sizing table */}
            <div className="flex flex-row items-center" dir="rtl">
              <table className="border-collapse">
                <tbody>
                  <tr>
                    <td className="h-9 w-12 border border-stone-600 p-0 text-center text-stone-500 hover:bg-stone-800 hover:text-stone-50">
                      <button className="w-full text-sm">31</button>
                    </td>
                    <td className="h-9 w-12 border border-stone-600 p-0 text-center text-stone-500 hover:bg-stone-800 hover:text-stone-50">
                      <button className="w-full text-sm">32</button>
                    </td>
                    <td className="h-9 w-12 border border-stone-600 p-0 text-center text-stone-500 hover:bg-stone-800 hover:text-stone-50">
                      <button className="w-full text-sm">33</button>
                    </td>
                    <td className="h-9 w-12 border border-stone-600 p-0 text-center text-stone-500 hover:bg-stone-800 hover:text-stone-50">
                      <button className="w-full text-sm">34</button>
                    </td>
                    <td className="h-9 w-12 border border-stone-600 p-0 text-center text-stone-500 hover:bg-stone-800 hover:text-stone-50">
                      <button className="w-full text-sm">35</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* sizing guidance */}
            <Link className="mt-2 flex flex-row-reverse gap-3 pr-1" href="">
              <Image
                className="rotate-45"
                src="/ruler.png"
                width="24"
                height="24"
                alt="راهنمای سایز"
                quality={100}
              />
              <span className="text-sm text-blue-500 underline underline-offset-8">
                راهنمای سایز
              </span>
            </Link>
            <span className="text-sm font-light text-stone-800">
              ارسال رایگان برای خرید بالای ۲,۰۰۰,۰۰۰ تومان
            </span>
            <button className="bg-green-700 py-5 text-sm text-white hover:bg-green-800">
              اضافه به سبد خرید
            </button>
            <button className="mt-4 flex flex-row-reverse justify-between px-4 py-3 text-sm text-stone-800 outline outline-1 hover:bg-stone-800 hover:text-stone-50">
              <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 20 }} />
              مشاهده موجودی در فروشگاه حضوری
              <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: 20 }} />
            </button>
          </div>
          <div className="w-5/12">
            <Image
              src={apiBaseUrl + product.image.url}
              alt={product.image.alternativeText}
              height={product.image.height}
              width={product.image.width}
              quality={100}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-28 w-20 bg-slate-300">img</div>
            <div className="h-28 w-20 bg-slate-300">img</div>
            <div className="h-28 w-20 bg-slate-300">img</div>
            <div className="h-28 w-20 bg-slate-300">img</div>
          </div>
        </div>
      )}
      <div className="w-full bg-orange-50">
        here is gonna be product explanation
      </div>
    </div>
  );
}
