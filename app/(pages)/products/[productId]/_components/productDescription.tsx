"use client";

import { apiBaseUrl } from "@config";
import {
  faArrowRightArrowLeft,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/_lib/definitions";

import SizeGuideModal from "./sizeGuide";

export default function ProductDescription({ product }: { product: Product }) {
  const productImage = product.imagesByColor[0].images[0];
  return (
    <div className="flex flex-row items-stretch justify-center gap-28 bg-stone-100 p-10">
      <div className="w-3/12">
        <Image
          src={apiBaseUrl + productImage.url}
          alt={productImage.alternativeText}
          width={productImage.width}
          height={productImage.height}
          quality={100}
        />
      </div>
      <div className="flex w-6/12 flex-col justify-between py-3 text-stone-800">
        <h2 className="text-xl">
          توضیحات {product.name} {product.id.toLocaleString("fa-IR")}
        </h2>
        <p className="flex flex-col gap-4 text-sm font-light">
          <span>{product.information.productInfo}</span>
          <span> {product.information.modelSizeInfo}</span>
          <span> {product.information.colorInfo}</span>
        </p>
        <div className="flex flex-col gap-5">
          <span className="text-sm font-medium">روش شستشو و نگهداری</span>
          <div className="flex-row justify-between gap-12 pr-8 text-sm font-light leading-7">
            <ul className="list-disc columns-2 gap-8">
              {product.category.careTips.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-row gap-20 text-xs">
          <SizeGuideModal
            productImages={product.imagesByColor[0].images}
            className=""
            sizeTableInfo={product.category.sizeTable}
            information={product.information}
            sizeGuideImage={product.category.sizeGuideImage}
            productId={product.id}
            productName={product.name}
          />
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
            کد محصول: {product.id.toLocaleString("fa-IR")}
          </span>
        </div>
      </div>
    </div>
  );
}
