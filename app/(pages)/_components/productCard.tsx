import { apiBaseUrl, nextServerUrl } from "@config";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Product } from "@/_lib/definitions";
import { ProductModel } from "@/_models/product.model";

// import ProductModal from "./productModal";

export default function productCard({ data }: { data: Product }) {
  const [isQuickViewVisible, setIsQuickViewVisible] = useState<boolean>(false);
  // const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const product = new ProductModel(data);
  const availableColors = product.getAvailableColors();
  const availableSizes = product.getAvailableSizes();
  const defaultImage = isQuickViewVisible
    ? product.getImagesByColor(availableColors[0].name)[1]
    : product.getImagesByColor(availableColors[0].name)[0];
  return (
    <div className="group flex flex-col gap-4">
      <div className="">
        <Link
          href={`${nextServerUrl}/products/${product.data.documentId}`}
          className="relative"
          onMouseOver={() => setIsQuickViewVisible(true)}
          onMouseOut={() => setIsQuickViewVisible(false)}
          onClick={() =>
            router.push(`${nextServerUrl}/products/${product.data.documentId}`)
          }
        >
          <Image
            src={apiBaseUrl + defaultImage.url}
            alt={defaultImage.alternativeText}
            width={defaultImage.width}
            height={defaultImage.height}
          />
          <button
            // onClick={() => setIsProductModalOpen(true)}
            className="invisible absolute bottom-4 left-0 right-0 m-auto flex w-4/5 flex-row items-center justify-center gap-2 bg-stone-800 bg-opacity-70 px-4 py-3 text-sm text-white hover:bg-opacity-85 group-hover:visible"
          >
            مشاهده سریع
            <FontAwesomeIcon icon={faSearch} className="text-sm" />
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {/* product name */}
        <Link
          href={`${nextServerUrl}/products/${product.data.documentId}`}
          className="text-sm font-medium text-stone-600"
        >
          {product.data.name + " " + product.data.id}
        </Link>
        {/* price */}
        <div className="flex flex-row items-center gap-2 text-[13px] text-stone-600">
          <span
            className={classNames(product.data.salePrice && "line-through")}
          >
            {product.data.originalPrice.toLocaleString("fa-IR")} تومان
          </span>
          {product.data.salePrice ? (
            <div className="flex flex-row gap-2">
              <span className="">
                (
                {(
                  ((product.data.originalPrice - product.data.salePrice) /
                    product.data.originalPrice) *
                  100
                ).toLocaleString("fa-IR")}
                %)
              </span>
              <span className="text-red-600">
                {product.data.salePrice.toLocaleString("fa-IR")} تومان
              </span>
            </div>
          ) : null}
        </div>
      </div>
      {/* product colors and sizes */}
      <div className="invisible flex flex-col gap-3 group-hover:visible">
        <div className="flex flex-row gap-1">
          {availableColors.map((color, index) => (
            <span
              key={index}
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: color.colorHex }}
            />
          ))}
        </div>
        <div className="flex flex-row gap-1">
          {availableSizes.map((size, index) => (
            <span
              key={index}
              className="border border-stone-300 p-1 text-[10px] font-light text-stone-500"
            >
              {size.value}
            </span>
          ))}
        </div>
      </div>
      {/* <ProductModal
        product={product}
        isOpen={isProductModalOpen}
        onOpenChange={(value) => setIsProductModalOpen(value)}
      /> */}
    </div>
  );
}
