"use client";

// import SizeGuideModal from "./sizeGuideModal";
import Image from "next/image";
import { useState } from "react";

import ColorSelector from "@/_components/colorSelector";
import GallerySlider from "@/_components/gallerySlider";
import SizeSelector from "@/_components/sizeSelector";
import { ProductModel } from "@/_models/product.model";

import { ProductHeader } from "./productHeader";

export default function ProductDetails({
  product,
  selectedColor,
  onSelectColor,
  onSelectSizeGuideLink,
}: {
  product: ProductModel;
  selectedColor: string;
  onSelectColor: (value: string) => void;
  onSelectSizeGuideLink: (value: boolean) => void;
}) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  const [isSizeErrorVisible, setIsSizeErrorVisible] = useState<boolean>(false);

  const selectedProduct = {
    id: product.data.id,
    documentId: product.data.documentId,
    name: product.data.name,
    originalPrice: product.data.originalPrice,
    salePrice: product.data.salePrice,
    color: selectedColor,
    size: selectedSize,
    image: product.getImagesByColor(selectedColor)?.[0],
  };

  return (
    <div className="flex flex-row justify-end gap-10">
      <div className="block w-5/12">
        {
          <GallerySlider
            images={product.getImagesByColor(selectedColor)}
            isExpandable={true}
          />
        }
      </div>
      <div className="ml-32 flex w-3/12 flex-col gap-6 text-right">
        <ProductHeader
          name={product.data.name}
          originalPrice={product.data.originalPrice}
          salePrice={product.data.salePrice}
          id={product.data.id}
        />
        <hr />
        <div className="flex flex-col gap-6 text-stone-800">
          <div className="text-sm font-light">
            رنگ انتخابی شما:
            <span className="pr-1 font-normal">{selectedColor}</span>
          </div>
          <ColorSelector
            selectedColor={selectedColor}
            colors={product.getAvailableColors()}
            onSelect={(color: string) => {
              onSelectColor(color);
              setSelectedSize("");
            }}
          />
        </div>
        <SizeSelector
          sizes={product.getAvailableSizes(selectedColor)}
          selectedSize={selectedSize}
          onSelect={(size: string) => {
            setSelectedSize(size);
            setIsSizeErrorVisible(false);
          }}
        />
        <button
          onClick={() => onSelectSizeGuideLink(true)}
          className="border-non flex w-fit flex-row gap-3 border-none pr-1 text-sm text-blue-500 underline underline-offset-8"
        >
          <Image
            className="rotate-45"
            src="/ruler.png"
            width="24"
            height="24"
            alt="راهنمای سایز"
            quality={100}
          />
          <span className="text-blue-500 underline underline-offset-8">
            راهنمای سایز
          </span>
        </button>
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
