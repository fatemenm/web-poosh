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
    <div className="flex flex-row items-stretch justify-center gap-28 bg-stone-100 p-10">
      <div className="w-3/12">
        <Image
          src={apiBaseUrl + images[0].url}
          alt={images[0].alternativeText}
          width={images[0].width}
          height={images[0].height}
          quality={100}
        />
      </div>
      <div className="flex w-6/12 flex-col justify-between py-3 text-stone-800">
        <h2 className="text-xl">
          توضیحات {product.data.name} {product.data.id.toLocaleString("fa-IR")}
        </h2>
        <p className="flex flex-col gap-4 text-sm font-light">
          <span>{product.data.information.productInfo}</span>
          <span> {product.data.information.modelSizeInfo}</span>
          <span> {product.data.information.colorInfo}</span>
        </p>
        <div className="flex flex-col gap-5">
          <span className="text-sm font-medium">روش شستشو و نگهداری</span>
          <div className="flex-row justify-between gap-12 pr-8 text-sm font-light leading-7">
            <ul className="list-disc columns-2 gap-8">
              {product.data.category.careTips.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-row gap-20 text-xs">
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
