import { apiBaseUrl, nextServerUrl } from "@config";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ProductModel } from "@/models/product.model";

export default function ProductCard({
  product,
  buttonOptions = null,
  viewOptions = null,
}: {
  product: ProductModel;
  buttonOptions?: {
    text?: string;
    onClick?: (product: ProductModel, isModalOpen: boolean) => void;
    iconName?: string;
  } | null;
  viewOptions?: {
    colorVisibility?: "onHover" | "default";
    sizeVisibility?: "onHover" | "default";
    defaultImageIndex?: number;
    hoverImageIndex?: number;
    showModelImage?: boolean;
  } | null;
}) {
  const [isImageHovered, setIsImageHovered] = useState<boolean>();
  const availableColors = product.getAvailableColors();
  const availableSizes = product.getAvailableSizes();
  const finalViewOptions = {
    colorVisibility: "default",
    sizeVisibility: "default",
    defaultImageIndex: 0,
    hoverImageIndex: 1,
    showModelImage: false,
    ...viewOptions,
  };
  const defaultImage = product.getImagesByColor(availableColors[0].name)[
    finalViewOptions.defaultImageIndex as number
  ];
  const hoverImage = product.getImagesByColor(availableColors[0].name)[
    finalViewOptions.hoverImageIndex as number
  ];
  const productCardImage = (
    <Link
      href={`${nextServerUrl}/products/${product.data.documentId}`}
      className="relative block"
    >
      <Image
        className={`absolute inset-0 transition-opacity duration-700 ${
          finalViewOptions.showModelImage || isImageHovered
            ? "opacity-0"
            : "opacity-100"
        }`}
        src={apiBaseUrl + defaultImage.url}
        alt={defaultImage.alternativeText}
        width={defaultImage.width}
        height={defaultImage.height}
      />
      <Image
        className={`transition-opacity duration-700 ${
          finalViewOptions.showModelImage || isImageHovered
            ? "opacity-100"
            : "opacity-0"
        }`}
        src={apiBaseUrl + hoverImage.url}
        alt={hoverImage.alternativeText}
        width={hoverImage.width}
        height={hoverImage.height}
      />
    </Link>
  );
  return (
    <div className="group flex flex-col gap-4">
      <div
        className="relative"
        onMouseOver={() => setIsImageHovered(true)}
        onMouseOut={() => setIsImageHovered(false)}
      >
        {productCardImage}
        {buttonOptions && (
          <button
            onClick={() =>
              buttonOptions?.onClick
                ? buttonOptions?.onClick(product, true)
                : undefined
            }
            className="invisible absolute bottom-4 left-0 right-0 m-auto flex w-4/5 flex-row items-center justify-center gap-2 bg-stone-800 bg-opacity-70 px-2 py-2 text-xs text-white hover:bg-opacity-85 group-hover:visible sm:px-4 sm:py-3 sm:text-sm"
          >
            مشاهده سریع
            <FontAwesomeIcon icon={faSearch} className="text-xs sm:text-sm" />
          </button>
        )}
      </div>
      {/* product name & price */}
      <div className="flex flex-col gap-3">
        <Link
          href={`${nextServerUrl}/products/${product.data.documentId}`}
          className="text-xs font-medium text-stone-600 sm:text-sm"
        >
          {product.data.name}
        </Link>
        <div className="flex flex-col gap-2 text-xs text-stone-600 sm:text-sm">
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
      <div className={classNames("flex flex-col gap-3")}>
        <div
          className={classNames("flex flex-row gap-1", {
            "invisible group-hover:visible":
              finalViewOptions.colorVisibility === "onHover",
          })}
        >
          {availableColors.map((color, index) => (
            <span
              key={index}
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: color.hexCode }}
            />
          ))}
        </div>
        <div
          className={classNames("flex flex-row gap-1", {
            "invisible group-hover:visible":
              finalViewOptions.sizeVisibility === "onHover",
          })}
        >
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
    </div>
  );
}
