import { apiBaseUrl } from "@config";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

import { getClotheProducts } from "@/lib/data";
import Link from "next/link";

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
              <Link href="">اولین نظر را بنویسید</Link>
            </div>
            <hr />
            {/* color picker */}
            <div className="flex flex-col gap-6">
              <div className="text-sm font-light">
                رنگ انتخابی شما:
                <span className="pr-1 font-normal"> آبی روشن</span>
              </div>
              <div className="flex flex-row-reverse flex-wrap gap-2">
                <Link
                  href=""
                  className="flex h-10 w-10 flex-row items-center justify-center rounded-full border border-stone-200 p-[3px] hover:border-2 hover:border-stone-900"
                >
                  <div className="h-full w-full rounded-full bg-indigo-100"></div>
                </Link>
                <Link
                  href=""
                  className="flex h-10 w-10 flex-row items-center justify-center rounded-full border border-stone-200 p-[3px] hover:border-2 hover:border-stone-900"
                >
                  <div className="h-full w-full rounded-full bg-blue-900"></div>
                </Link>
              </div>
            </div>
            {/* sizing table */}
            <table className="border-collapse border-spacing-0 border border-stone-400">
              <tbody>
                <tr>
                  <td className="p-0 text-center text-sm text-stone-500">31</td>
                  <td className="text-center text-sm text-stone-500">31</td>
                  <td className="text-center text-sm text-stone-500">31</td>
                  <td className="text-center text-sm text-stone-500">31</td>
                </tr>
              </tbody>
            </table>
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
