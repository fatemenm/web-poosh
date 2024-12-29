"use client";

import {
  faChevronLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import Button from "@/_components/button";
import GallerySlider from "@/_components/gallerySlider";
import Modal from "@/_components/modal";
import { ClotheProduct } from "@/_lib/definitions";

import ColorSelector from "./colorSelector";
import { ProductHeader } from "./productHeader";
import SizeGuide from "./sizeGuide";
import SizeSelector from "./sizeSelector";

const colors = [
  { name: "آبی روشن", colorCode: "#90b3de", isAvailable: true },
  { name: "خاکستری", colorCode: "#808080", isAvailable: false },
];
const sizes = [
  { value: "31", isAvailable: true },
  { value: "32", isAvailable: true },
  { value: "33", isAvailable: false },
  { value: "34", isAvailable: true },
  { value: "35", isAvailable: true },
];

export default function ProductDetails({
  product,
}: {
  product: ClotheProduct;
}) {
  const [galleryViewState, setGalleryViewState] = useState<
    "default" | "fullscreen"
  >("default");

  const gallerySlider = (
    <GallerySlider
      images={product.images}
      onSelect={(viewMode: string) => {
        if (viewMode === "fullscreen") setGalleryViewState("fullscreen");
      }}
      viewMode={galleryViewState}
    />
  );

  return (
    <div className="flex w-10/12 flex-row justify-end gap-10">
      <div className="block w-5/12">
        {galleryViewState === "fullscreen" ? (
          <Modal
            onSelect={(modalAction: string) => {
              if (modalAction === "close") setGalleryViewState("default");
            }}
            isOpen={galleryViewState === "fullscreen" ? true : false}
            style={{
              container: "fixed left-0 top-0 z-10 h-full w-full p-10 ",
              closeButton:
                "absolute right-0 top-0 z-10 p-4 text-stone-700 hover:text-stone-900 text-2xl",
            }}
          >
            {gallerySlider}
          </Modal>
        ) : (
          gallerySlider
        )}
      </div>
      <div className="ml-32 flex w-3/12 flex-col gap-6 text-right">
        <ProductHeader {...product} />
        <hr />
        <ColorSelector colors={colors} />
        <SizeSelector sizes={sizes} />
        <SizeGuide images={product.images} />
        <span className="text-sm font-light text-stone-800">
          ارسال رایگان برای خرید بالای ۲,۰۰۰,۰۰۰ تومان
        </span>
        <Button
          // isDisabled={true}
          onClick={() => console.log("clicked")}
          className="bg-green-700 py-5 text-sm text-white hover:bg-green-800"
        >
          اضافه به سبد خرید
        </Button>
        <Button className="mt-4 flex flex-row justify-between px-4 py-3 text-sm text-stone-800 outline outline-1 hover:bg-stone-800 hover:text-stone-50">
          <span>
            <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: 20 }} />
          </span>
          مشاهده موجودی در فروشگاه حضوری
          <span>
            <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: 20 }} />
          </span>
        </Button>
      </div>
    </div>
  );
}
