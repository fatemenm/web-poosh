"use client";

import { apiBaseUrl, nextServerUrl } from "@config";
import Image from "next/image";
import Link from "next/link";

import BasicSlider from "@/components/slider/basicSlider";
import { Category } from "@/lib/definitions";

const sliderSetting = {
  infinite: true,
  slidesToScroll: 1,
  slidesToShow: 5,
};

export default function CategorySlider({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <BasicSlider<Category>
      containerClass="my-8 md:my-16 px-2  w-full lg:px-0 "
      setting={sliderSetting}
      items={categories}
      renderItem={(item, ctx: { isSwiping: boolean }) => {
        return (
          <Link
            href={nextServerUrl + "/category/" + item.documentId}
            key={item.id}
            className="flex cursor-pointer flex-col items-center px-4 outline-none"
            onClick={(e) => {
              if (ctx.isSwiping) e.preventDefault();
            }}
          >
            <Image
              src={apiBaseUrl + item.image.url}
              alt={item.image.alternativeText}
              width={item.image.width}
              height={item.image.height}
              quality={100}
            />
            <div className="text-center text-xs text-stone-600 underline underline-offset-8 md:text-sm lg:text-base">
              {item.name}
            </div>
          </Link>
        );
      }}
    />
  );
}
