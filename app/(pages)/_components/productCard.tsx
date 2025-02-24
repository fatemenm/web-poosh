import { apiBaseUrl, nextServerUrl } from "@config";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ProductModel } from "@/_models/product.model";

import ProductModal from "./productModal";

export default function ProductCard({
  product,
  hoverMode,
}: {
  product: ProductModel;
  hoverMode: "image-only" | "full-hover" | "none";
}) {
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const availableColors = product.getAvailableColors();
  const availableSizes = product.getAvailableSizes();

  const defaultImage =
    isImageHovered || hoverMode === "none"
      ? product.getImagesByColor(availableColors[0].name)[1]
      : product.getImagesByColor(availableColors[0].name)[0];
  return (
    <div className="group flex flex-col gap-4">
      {hoverMode === "full-hover" && (
        <div
          className="relative"
          onMouseOver={() => setIsImageHovered(true)}
          onMouseOut={() => setIsImageHovered(false)}
        >
          <Link
            href={`${nextServerUrl}/products/${product.data.documentId}`}
            className=""
          >
            <Image
              src={apiBaseUrl + defaultImage.url}
              alt={defaultImage.alternativeText}
              width={defaultImage.width}
              height={defaultImage.height}
            />
          </Link>
          <button
            onClick={() => setIsProductModalOpen(true)}
            className="invisible absolute bottom-4 left-0 right-0 m-auto flex w-4/5 flex-row items-center justify-center gap-2 bg-stone-800 bg-opacity-70 px-4 py-3 text-sm text-white hover:bg-opacity-85 group-hover:visible"
          >
            مشاهده سریع
            <FontAwesomeIcon icon={faSearch} className="text-sm" />
          </button>
        </div>
      )}
      {hoverMode === "image-only" && (
        <Link
          onMouseOver={() => setIsImageHovered(true)}
          onMouseOut={() => setIsImageHovered(false)}
          href={`${nextServerUrl}/products/${product.data.documentId}`}
        >
          <Image
            src={apiBaseUrl + defaultImage.url}
            alt={defaultImage.alternativeText}
            width={defaultImage.width}
            height={defaultImage.height}
          />
        </Link>
      )}
      {hoverMode === "none" && (
        <Link href={`${nextServerUrl}/products/${product.data.documentId}`}>
          <Image
            src={apiBaseUrl + defaultImage.url}
            alt={defaultImage.alternativeText}
            width={defaultImage.width}
            height={defaultImage.height}
          />
        </Link>
      )}
      <div className="flex flex-col gap-3">
        {/* product name */}
        <Link
          href={`${nextServerUrl}/products/${product.data.documentId}`}
          className="text-sm font-medium text-stone-600"
        >
          {product.data.name + " " + product.data.id.toLocaleString("fa-ir")}
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
      <div
        className={classNames("flex flex-col gap-3", {
          "invisible group-hover:visible": hoverMode === "full-hover",
        })}
      >
        <div className="flex flex-row gap-1">
          {availableColors.map((color, index) => (
            <span
              key={index}
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: color.hexCode }}
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
      <ProductModal
        product={product}
        isOpen={isProductModalOpen}
        onOpenChange={(value) => setIsProductModalOpen(value)}
      />
    </div>
  );
}
