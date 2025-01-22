"use client";

import { useMemo, useState } from "react";

import GallerySlider from "@/_components/gallerySlider";
import { Product } from "@/_lib/definitions";

import ColorSelector from "./colorSelector";
import { ProductHeader } from "./productHeader";
import SizeGuide from "./sizeGuide";
import SizeSelector from "./sizeSelector";

export default function ProductDetails({ product }: { product: Product }) {
  const colorToSizes = useMemo(() => hasStockBy("color"), []);
  const sizeToColors = useMemo(() => hasStockBy("size"), []);
  const colors = useMemo(getColors, []);
  const [selectedColor, setSelectedColor] = useState<string>(colors[0].name);
  const sizes = useMemo(() => getSizes(selectedColor), [selectedColor]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [isSizeErrorVisible, setIsSizeErrorVisible] = useState<boolean>(false);
  const selectedProduct = {
    id: product.id,
    documentId: product.documentId,
    name: product.name,
    basePrice: product.basePrice,
    discountPrice: product.discountPrice,
    color: selectedColor,
    size: selectedSize,
    image: product.imagesByColor.find((item) => item.color === selectedColor)
      ?.images[0],
  };

  function hasStockBy(type: "color" | "size") {
    const filter = type === "color" ? "size" : "color";
    return product.stocks.reduce(
      (acc, currStock) => {
        if (currStock.quantity) {
          if (!Array.isArray(acc[currStock[type]])) {
            acc[currStock[type]] = new Array();
          }
          acc[currStock[type]].push(currStock[filter]);
        }
        return acc;
      },
      {} as Record<string, string[]>
    );
  }
  function getColors() {
    return product.colors
      .filter((color) => colorToSizes[color.name])
      .map((color) => {
        return { ...color, isAvailable: true };
      });
  }
  function getSizes(colorFilter?: string) {
    return product.sizes.map((size) => {
      let sizeValue;
      if (colorFilter)
        sizeValue = colorToSizes[colorFilter].find((s) => s === size);
      else sizeValue = sizeToColors[size];
      return {
        value: size,
        isAvailable: Boolean(sizeValue),
      };
    });
  }
  return (
    <div className="flex flex-row justify-end gap-10">
      <div className="block w-5/12">
        {selectedColor ? (
          <GallerySlider
            images={
              product.imagesByColor.find((item) => item.color === selectedColor)
                ?.images
            }
            isExpandable={true}
          />
        ) : (
          <div>loading...</div>
        )}
      </div>
      <div className="ml-32 flex w-3/12 flex-col gap-6 text-right">
        <ProductHeader
          name={product.name}
          basePrice={product.basePrice}
          discountPrice={product.discountPrice}
          id={product.id}
        />
        <hr />
        <div className="flex flex-col gap-6 text-stone-800">
          <div className="text-sm font-light">
            رنگ انتخابی شما:
            <span className="pr-1 font-normal">{selectedColor}</span>
          </div>
          {selectedColor && colors ? (
            <ColorSelector
              selectedColor={selectedColor}
              colors={colors}
              onSelect={(color: string) => {
                setSelectedColor(color);
                setSelectedSize("");
              }}
            />
          ) : (
            <div>loading</div>
          )}
        </div>

        {sizes ? (
          <SizeSelector
            sizes={sizes}
            selectedSize={selectedSize}
            onSelect={(size: string) => {
              setSelectedSize(size);
              setIsSizeErrorVisible(false);
            }}
          />
        ) : (
          <div>loading</div>
        )}
        <SizeGuide
          productImages={product.imagesByColor[0].images}
          className="text-sm"
          sizeTableInfo={product.category.sizeTable}
          information={product.information}
          sizeGuideImage={product.category.sizeGuideImage}
          productId={product.id}
          productName={product.name}
        />
        <span className="text-sm font-light text-stone-800">
          ارسال رایگان برای خرید بالای ۲,۰۰۰,۰۰۰ تومان
        </span>
        {isSizeErrorVisible && (
          <div className="bg-red-700 px-4 py-3 text-sm font-light text-white">
            لطفا سایز را انتخاب کنید
          </div>
        )}
        <button
          onClick={() => {
            if (!selectedProduct.size) setIsSizeErrorVisible(true);
            else console.log(selectedProduct);
          }}
          className={"bg-green-700 py-5 text-sm text-white hover:bg-green-800"}
        >
          اضافه به سبد خرید
        </button>
      </div>
    </div>
  );
}
