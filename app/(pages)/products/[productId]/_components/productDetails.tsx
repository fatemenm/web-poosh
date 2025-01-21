"use client";

import classNames from "classnames";
import { useState } from "react";

import GallerySlider from "@/_components/gallerySlider";
import { Product } from "@/_lib/definitions";

import ColorSelector from "./colorSelector";
import { ProductHeader } from "./productHeader";
import SizeGuide from "./sizeGuide";
import SizeSelector from "./sizeSelector";

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0].name
  );
  const [selectedSize, setSelectedSize] = useState<string>();

  function hasStockBy(type: "color" | "size") {
    return product.stocks.reduce(
      (acc, currStock) => {
        acc[currStock[type]] ||= Boolean(currStock.quantity);
        return acc;
      },
      {} as Record<string, boolean>
    );
  }
  function getColors() {
    const colorAvailabilityMap = hasStockBy("color");
    return product.colors.map((color) => ({
      ...color,
      isAvailable: colorAvailabilityMap[color.name] || false,
    }));
  }
  function getSizes() {
    const sizeAvailabilityMap = hasStockBy("size");
    return product.sizes.map((size) => ({
      value: size,
      isAvailable: sizeAvailabilityMap[size] || false,
    }));
  }
  const colors = getColors();
  const sizes = getSizes();
  const isProductAvailable = !product.stocks.every(
    (variant) => variant.quantity === 0
  );
  return (
    <div className="flex flex-row justify-end gap-10">
      <div className="block w-5/12">
        <GallerySlider
          images={
            product.imagesByColor.find((item) => item.color === selectedColor)
              ?.images
          }
          isExpandable={true}
        />
      </div>
      <div className="ml-32 flex w-3/12 flex-col gap-6 text-right">
        <ProductHeader
          name={product.name}
          price={product.basePrice}
          id={product.id}
        />
        <hr />
        <div className="flex flex-col gap-6 text-stone-800">
          <div className="text-sm font-light">
            رنگ انتخابی شما:
            <span className="pr-1 font-normal">{selectedColor}</span>
          </div>
          <ColorSelector
            selectedColor={selectedColor}
            colors={colors}
            onSelect={setSelectedColor}
          />
        </div>

        <SizeSelector sizes={sizes} onSelect={setSelectedSize} />
        <SizeGuide images={product.imagesByColor[0].images} />
        <span className="text-sm font-light text-stone-800">
          ارسال رایگان برای خرید بالای ۲,۰۰۰,۰۰۰ تومان
        </span>
        <button
          onClick={() => {
            const selectedProduct = {
              id: product.id,
              documentId: product.documentId,
              name: product.name,
              basePrice: product.basePrice,
              color: selectedColor,
              size: selectedSize,
              image: product.imagesByColor.find(
                (item) => item.color === selectedColor
              )?.images[0],
            };
            console.log(selectedProduct);
          }}
          disabled={!isProductAvailable}
          className={classNames("py-5 text-sm text-white", {
            "bg-neutral-400 hover:bg-neutral-400": !isProductAvailable,
            "bg-green-700 hover:bg-green-800": isProductAvailable,
          })}
        >
          {isProductAvailable ? "اضافه به سبد خرید" : "ناموجود"}
        </button>
      </div>
    </div>
  );
}
