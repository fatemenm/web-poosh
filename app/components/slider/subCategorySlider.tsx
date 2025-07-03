"use client";

import { apiBaseUrl } from "@config";
import Image from "next/image";

import BasicSlider from "@/components/slider/basicSlider";
import { Image as ImageType } from "@/lib/definitions";

const sliderSetting = {
  infinite: true,
  slidesToScroll: 1,
  slidesToShow: 7,
  centerMode: true,
  centerPadding: "0px",
};

type propType = {
  items: ImageType[];
  selectedSubCategory?: string;
  onUpdateFilters: (value: string) => void;
};

export default function SubCategorySlider({
  items,
  onUpdateFilters,
  selectedSubCategory,
}: propType) {
  return (
    <div className="flex w-full flex-col">
      <BasicSlider
        containerClass=""
        setting={sliderSetting}
        items={items}
        renderItem={(img, ctx: { isSwiping: boolean }) => (
          <Image
            data-active={selectedSubCategory === img.alternativeText}
            key={img.id}
            className="cursor-pointer border-b-2 border-b-transparent px-2 pb-2 hover:border-b-2 hover:border-stone-700 data-[active=true]:border-b-2 data-[active=true]:border-stone-700"
            onClick={(e) => {
              if (ctx.isSwiping) e.preventDefault();
              else onUpdateFilters(img.alternativeText);
            }}
            alt={img.alternativeText}
            width={img.width}
            height={img.height}
            src={apiBaseUrl + img.url}
          />
        )}
      />
      <hr className="mt-0 h-1 w-full" />
    </div>
  );
}
