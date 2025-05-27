"use client";

import { apiBaseUrl } from "@config";
import {
  faArrowRightArrowLeft,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

import { Image as ProductImage } from "@/_lib/definitions";
import { ProductModel } from "@/_models/product.model";

export default function ProductDescription({
  product,
  images,
  onClickSizeGuideLink,
}: {
  product: ProductModel;
  images: ProductImage[];
  onClickSizeGuideLink: () => void;
}) {
  return (
    <div className="xs:p-6 flex flex-col bg-stone-100 p-4 md:flex-row md:items-stretch md:justify-center md:gap-8 lg:p-10 xl:gap-16">
      <div className="hidden w-full md:inline md:w-3/12 md:grow xl:grow-0">
        <Image
          src={apiBaseUrl + images[0].url}
          alt={images[0].alternativeText}
          width={images[0].width}
          height={images[0].height}
          quality={100}
        />
      </div>
      <div className="flex w-full flex-col justify-between gap-8 text-stone-800 md:w-6/12 md:grow md:py-3 xl:grow-0">
        <h2 className="text-xl">توضیحات {product.data.name}</h2>
        <p className="flex flex-col gap-4 text-sm font-light">
          <span>{product.data.information.productInfo}</span>
          <span> {product.data.information.modelSizeInfo}</span>
          <span> {product.data.information.colorInfo}</span>
        </p>
        <div className="flex flex-col gap-2 md:gap-5">
          <span className="text-sm font-medium">روش شستشو و نگهداری</span>
          <div className="flex-row justify-between gap-12 pr-8 text-sm font-light leading-7">
            <ul className="xs:columns-2 list-disc gap-8">
              {product.data.category.careTips.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-between gap-2 gap-y-3 text-xs sm:justify-start sm:gap-10 md:flex-nowrap md:gap-y-0">
          <button
            onClick={onClickSizeGuideLink}
            className="border-non flex w-fit flex-row items-center gap-3 border-none pr-1 text-xs text-blue-500"
          >
            <Image
              className="rotate-45"
              src="/ruler.png"
              width="24"
              height="24"
              alt="راهنمای سایز"
              quality={100}
            />
            <span className="text-blue-500">راهنمای سایز</span>
          </button>
          <Link href="" className="flex flex-row items-center gap-2 text-xs">
            <FontAwesomeIcon className="text-[12px]" icon={faTruckFast} />
            روش ارسال
          </Link>
          <Link href="" className="flex flex-row items-center gap-2">
            <FontAwesomeIcon
              icon={faArrowRightArrowLeft}
              className="text-[12px]"
            />
            تعویض یا بازگشت آسان
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <hr />
          <span className="text-xs font-light text-neutral-400">
            کد محصول: {product.data.id.toLocaleString("fa-IR")}
          </span>
        </div>
      </div>
    </div>
  );
}
