"use client";

import Image from "next/image";
import { useState } from "react";

import GallerySlider from "@/components/slider/gallerySlider";
import ColorSelector from "@/components/ui/colorSelector";
import SizeSelector from "@/components/ui/sizeSelector";
import { useBasket } from "@/lib/context/basketContext";
import { ProductModel } from "@/models/product.model";

import { ProductHeader } from "./productHeader";

export default function ProductDetails({
  product,
  selectedColor,
  onSelectColor,
  onClickSizeGuideLink,
}: {
  product: ProductModel;
  selectedColor: string;
  onSelectColor: (value: string) => void;
  onClickSizeGuideLink: () => void;
}) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isSizeErrorVisible, setIsSizeErrorVisible] = useState<boolean>(false);
  const { addItem, openBasketPopUp, closeBasketPopUp } = useBasket();

  const selectedProduct = {
    id: Math.ceil(Math.random() * 1000) + Date.now(),
    product: product,
    color: selectedColor,
    size: selectedSize,
    image: product.getImagesByColor(selectedColor)?.[0],
  };

  return (
    <div className="flex w-full flex-col gap-10 sm:flex-row lg:w-auto lg:gap-16 xl:justify-center">
      <div className="sm:block sm:w-1/2 lg:mr-32 xl:w-5/12">
        <GallerySlider
          images={product.getImagesByColor(selectedColor)}
          isExpandable={true}
        />
      </div>
      <div className="flex flex-col gap-6 sm:w-1/2 sm:gap-6 sm:text-right md:w-1/3 xl:w-3/12">
        <ProductHeader
          name={product.data.name}
          originalPrice={product.data.originalPrice}
          salePrice={product.data.salePrice}
        />
        <hr />
        <div className="flex flex-col gap-3 text-stone-800 sm:gap-6">
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
              setIsSizeErrorVisible(false);
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
          onClick={onClickSizeGuideLink}
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
            else {
              addItem(selectedProduct);
              openBasketPopUp();
              closeBasketPopUp();
            }
          }}
          className={"bg-green-700 py-5 text-sm text-white hover:bg-green-800"}
        >
          اضافه به سبد خرید
        </button>
      </div>
    </div>
  );
}
