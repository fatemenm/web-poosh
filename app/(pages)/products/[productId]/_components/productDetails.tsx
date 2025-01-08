"use client";

import {
  faChevronLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import GallerySlider from "@/_components/gallerySlider";
import { ClotheProduct } from "@/_lib/definitions";

import ColorSelector from "./colorSelector";
import { ProductHeader } from "./productHeader";
import SizeGuide from "./sizeGuide";
import SizeSelector from "./sizeSelector";

const colors = [
  { name: "آبی روشن", colorCode: "#90b3de", isAvailable: true },
  { name: "خاکستری", colorCode: "#808080", isAvailable: false },
];
const sizes = [
  { value: "31", isAvailable: true },
  { value: "32", isAvailable: true },
  { value: "33", isAvailable: false },
  { value: "34", isAvailable: true },
  { value: "35", isAvailable: true },
];

export default function ProductDetails({
  product,
}: {
  product: ClotheProduct;
}) {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  return (
    <div className="flex flex-row justify-end gap-10">
      <div className="block w-5/12">
        <GallerySlider images={product.images} isExpandable={true} />
      </div>
      <div className="ml-32 flex w-3/12 flex-col gap-6 text-right">
        <ProductHeader {...product} />
        <hr />
        <ColorSelector colors={colors} />
        <SizeSelector sizes={sizes} />
        <SizeGuide images={product.images} />
        <span className="text-sm font-light text-stone-800">
          ارسال رایگان برای خرید بالای ۲,۰۰۰,۰۰۰ تومان
        </span>
        <button
          onClick={() => console.log("clicked")}
          disabled={isButtonDisabled}
          className={`py-5 text-sm text-white ${isButtonDisabled ? "bg-neutral-400 hover:bg-neutral-400" : "bg-green-700 hover:bg-green-800"}`}
        >
          {isButtonDisabled ? "ناموجود" : "اضافه به سبد خرید"}
        </button>

        <button
          onClick={() => console.log("clicked second button")}
          className="mt-4 flex flex-row justify-between px-4 py-3 text-sm text-stone-800 outline outline-1 hover:bg-stone-800 hover:text-stone-50"
        >
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
