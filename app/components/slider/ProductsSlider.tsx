"use client";

import { apiBaseUrl, nextServerUrl } from "@config";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

import BasicSlider from "@/components/slider/basicSlider";
import { Product } from "@/lib/definitions";

const sliderSetting = {
  infinite: true,
  slidesToScroll: 1,
  slidesToShow: 5,
};

export default function ProductsSlider({
  products,
  sliderTitle,
}: {
  products: Product[];
  sliderTitle: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="mt-16 flex w-full flex-col gap-4 px-4 lg:mt-0 lg:px-0">
        <div className="flex flex-row items-center justify-between text-stone-800">
          <span className="text-sm lg:text-lg">{sliderTitle}</span>
          <Link href="/newest" className="text-xs">
            مشاهده همه
          </Link>
        </div>
        <hr className="w-full bg-stone-400 lg:mb-4" />
      </div>

      <BasicSlider<Product>
        setting={{
          ...sliderSetting,
          speed: 400,
          autoplay: true,
          autoplaySpeed: 4000,
          cssEase: "linear",
        }}
        containerClass="mx-auto mb-8 mt-4 lg:mt-4 px-2 lg:px-0 "
        items={products}
        renderItem={(item, ctx: { isSwiping: boolean }) => {
          return (
            <Link
              key={item.id}
              href={`${nextServerUrl}/products/${item.documentId}`}
              className="cursor-pointer px-1 outline-none lg:px-3"
              onClick={(e) => {
                if (ctx.isSwiping) e.preventDefault();
              }}
            >
              <Image
                src={apiBaseUrl + item.imagesByColor[0].images[0].url}
                alt={item.imagesByColor[0].images[0].alternativeText}
                width={item.imagesByColor[0].images[0].width}
                height={item.imagesByColor[0].images[0].height}
              />
              <div
                style={{ direction: "rtl" }}
                className="mt-4 flex flex-col items-center gap-2 text-center text-xs text-stone-600 lg:text-sm"
              >
                <span className="font-medium">{item.name}</span>
                <div className="flex flex-col items-center gap-3">
                  <span
                    className={classNames(item.salePrice && "line-through")}
                  >
                    {item.originalPrice.toLocaleString("fa-IR")} تومان
                  </span>
                  {item.salePrice ? (
                    <div className="flex flex-col items-center gap-3 md:flex-row">
                      <span className="text-red-600">
                        {Boolean(item.salePrice) &&
                          item.salePrice.toLocaleString("fa-IR")}{" "}
                        تومان
                      </span>
                      <span className="text-xs lg:text-sm">
                        (
                        {(
                          ((item.originalPrice - item.salePrice) /
                            item.originalPrice) *
                          100
                        ).toLocaleString("fa-IR")}
                        %)
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </Link>
          );
        }}
      />
    </div>
  );
}
