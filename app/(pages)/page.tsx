"use client";

import { apiBaseUrl, nextServerUrl } from "@config";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import BasicSlider from "@/_components/basicSlider";
import {
  getCategories,
  getClotheSetBanners,
  getHeroBanners,
  getProducts,
} from "@/_lib/data";
import { Category, ClotheSetBanner, HeroBanner } from "@/_lib/definitions";
import { ProductModel } from "@/_models/product.model";

const sliderSetting = {
  infinite: true,
  slidesToScroll: 1,
  slidesToShow: 5,
};
type Data = {
  heroBanners: HeroBanner[];
  categories: Category[];
  clothingSetBanners: ClotheSetBanner[];
  products: ProductModel[];
};
export default function Page() {
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    const getData = async () => {
      const [heroBanners, categories, clothingSetBanners, products] =
        await Promise.all([
          getHeroBanners(),
          getCategories(),
          getClotheSetBanners(),
          (await getProducts()).products,
        ]);
      const data = { heroBanners, categories, clothingSetBanners, products };
      setData(data);
    };
    getData();
  }, []);
  if (!data) return <div>data is not available</div>;

  return (
    <div className="flex w-full flex-col items-center lg:w-11/12 xl:w-10/12">
      {/* Hero Banners */}
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-[2vw] lg:px-0">
        {data.heroBanners?.map((banner, id) => {
          return (
            <Link
              href={banner.linkUrl}
              key={id}
              className="flex w-full flex-col items-center gap-4"
            >
              <Image
                src={apiBaseUrl + banner.image.url}
                alt={banner.image.alternativeText}
                width={banner.image.width}
                height={banner.image.height}
                priority
              />
              <div className="flex flex-col items-center gap-2 font-medium text-stone-900 lg:gap-1">
                <span className="text-sm lg:text-lg">
                  {banner.texts.primary}
                </span>
                <span className="font-english text-xs font-normal tracking-[.2em] text-stone-700 lg:text-sm">
                  {banner.texts.secondary}
                </span>
                <span className="border-b border-stone-900 pb-2 text-sm lg:text-base">
                  {banner.linkText}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      {/* Category Slider */}
      {data.categories && (
        <BasicSlider<Category>
          containerClass="my-8 md:my-16 px-2  w-full lg:px-0 "
          setting={sliderSetting}
          items={data.categories}
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
      )}
      {/* Daily Set Banners */}
      <div className="my-8 flex w-full flex-col gap-4 px-4 lg:my-16 lg:gap-7 lg:px-0">
        <div className="flex w-full flex-col gap-3">
          <div className="flex flex-row items-center justify-between text-stone-800">
            <span className="text-sm lg:text-lg">محصولات محبوب</span>
          </div>
          <hr className="w-full bg-stone-400 lg:mb-4" />
        </div>
        <div className="xs:w-auto xs:flex-row xs:gap-3 mx-auto flex w-2/3 flex-col gap-10 md:justify-center lg:mx-0 lg:gap-16">
          {data.clothingSetBanners?.map((banner) => {
            return (
              <Link
                href={banner.linkUrl}
                key={banner.id}
                className="flex flex-col items-center gap-4 md:w-1/3 md:gap-4"
              >
                <Image
                  className="h-auto w-full cursor-pointer object-contain"
                  src={apiBaseUrl + banner.image.url}
                  alt={banner.image.alternativeText}
                  width={banner.image.width}
                  height={banner.image.height}
                />
                <div className="flex flex-col items-center gap-3 text-xs font-light text-stone-700 lg:text-base">
                  <span className="xs:text-xs text-center text-sm md:text-sm lg:text-base xl:text-lg">
                    {banner.title}
                  </span>
                  <span className="underline underline-offset-8">
                    {banner.linkText}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* New Products Slider */}
      <div className="mt-16 flex w-full flex-col gap-4 px-4 lg:mt-0 lg:px-0">
        <div className="flex flex-row items-center justify-between text-stone-800">
          <span className="text-sm lg:text-lg">محصولات جدید</span>
          <Link href="/newest" className="text-xs">
            مشاهده همه
          </Link>
        </div>
        <hr className="w-full bg-stone-400 lg:mb-4" />
      </div>
      {data.products && (
        <BasicSlider<ProductModel>
          setting={{
            ...sliderSetting,
            speed: 400,
            autoplay: true,
            autoplaySpeed: 4000,
            cssEase: "linear",
          }}
          containerClass="mx-auto mb-8 mt-4 lg:mt-4 px-2 lg:px-0 "
          items={data.products}
          renderItem={(item, ctx: { isSwiping: boolean }) => {
            return (
              <Link
                key={item.data.id}
                href={`${nextServerUrl}/products/${item.data.documentId}`}
                className="cursor-pointer px-1 outline-none lg:px-3"
                onClick={(e) => {
                  if (ctx.isSwiping) e.preventDefault();
                }}
              >
                <Image
                  src={apiBaseUrl + item.data.imagesByColor[0].images[0].url}
                  alt={item.data.imagesByColor[0].images[0].alternativeText}
                  width={item.data.imagesByColor[0].images[0].width}
                  height={item.data.imagesByColor[0].images[0].height}
                />
                <div
                  style={{ direction: "rtl" }}
                  className="mt-4 flex flex-col items-center gap-2 text-center text-xs text-stone-600 lg:text-sm"
                >
                  <span className="font-medium">{item.data.name}</span>
                  <div className="flex flex-col items-center gap-3">
                    <span
                      className={classNames(
                        item.data.salePrice && "line-through"
                      )}
                    >
                      {item.data.originalPrice.toLocaleString("fa-IR")} تومان
                    </span>
                    {item.data.salePrice ? (
                      <div className="flex flex-col items-center gap-3 md:flex-row">
                        <span className="text-red-600">
                          {Boolean(item.data.salePrice) &&
                            item.data.salePrice.toLocaleString("fa-IR")}{" "}
                          تومان
                        </span>
                        <span className="text-xs lg:text-sm">
                          (
                          {(
                            ((item.data.originalPrice - item.data.salePrice) /
                              item.data.originalPrice) *
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
      )}
    </div>
  );
}
