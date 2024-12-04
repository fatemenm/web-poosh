import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faChevronLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

import { ClotheProduct } from "@/lib/definitions";

import ColorPicker from "./colorPicker";
import ClotheProductGallerySlider from "./productGallerySlider";
import { ProductHeader } from "./productHeader";
import RatingNavigator from "./ratingNavigator";

export default function ProductDetails({
  product,
  targetId,
}: {
  product: ClotheProduct;
  targetId: string;
}) {
  const colors = [
    { name: "آبی روشن", colorCode: "#90b3de" },
    { name: "آبی تیره", colorCode: "#3e5f87" },
  ];

  return (
    <div className="flex w-10/12 flex-row justify-end gap-10">
      {/* product image */}
      <div className="block w-5/12">
        <ClotheProductGallerySlider product={product} />
      </div>
      {/* specifications */}
      <div className="ml-32 flex w-3/12 flex-col gap-6 text-right">
        <ProductHeader product={product} />
        <RatingNavigator targetId={targetId} starRatingNumber={5} />
        <hr />
        <ColorPicker colors={colors} />
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
        <Link className="mt-2 flex flex-row gap-3 pr-1" href="">
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
        <button className="mt-4 flex flex-row justify-between px-4 py-3 text-sm text-stone-800 outline outline-1 hover:bg-stone-800 hover:text-stone-50">
          <span>
            <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 20 }} />
          </span>
          مشاهده موجودی در فروشگاه حضوری
          <span>
            <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: 20 }} />
          </span>
        </button>
      </div>
    </div>
  );
}
