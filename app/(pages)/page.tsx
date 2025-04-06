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
    <div className="flex flex-col items-center">
      {/* Hero Banners */}
      <div className="flex flex-row">
        {data.heroBanners?.map((banner, id) => {
          return (
            <div
              key={id}
              className="flex cursor-pointer flex-col items-center gap-4"
            >
              <Image
                src={apiBaseUrl + banner.image.url}
                alt={banner.image.alternativeText}
                width={banner.image.width}
                height={banner.image.height}
                priority
              />
              <div className="flex flex-col items-center gap-1 font-medium text-stone-900">
                <span className="text-lg">{banner.texts.primary}</span>
                <span className="font-english text-sm font-normal tracking-[.2em] text-stone-700">
                  {banner.texts.secondary}
                </span>
                <Link
                  className="border-b border-stone-900 pb-2"
                  href={banner.linkUrl}
                >
                  {banner.linkText}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      {/* Category Slider */}
      {data.categories && (
        <BasicSlider<Category>
          containerClass="my-16 px-20"
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
                <div className="text-center text-stone-600 underline underline-offset-8">
                  {item.name}
                </div>
              </Link>
            );
          }}
        />
      )}
      {/* Daily Set Banners */}
      <div className="flex flex-col gap-7">
        <div className="mt-16 flex w-full flex-col gap-3 px-12">
          <div className="flex flex-row items-center justify-between text-stone-800">
            <span className="text-lg"> ست‌‌‌‌‌‌‌های جدید</span>
            <Link href="/sets" className="text-xs">
              مشاهده همه
            </Link>
          </div>
          <hr className="mb-4 h-px w-full bg-stone-400" />
        </div>
        <div className="flex flex-row gap-8">
          {data.clothingSetBanners?.map((banner) => {
            return (
              <div key={banner.id} className="flex flex-col items-center gap-4">
                <Image
                  className="cursor-pointer"
                  src={apiBaseUrl + banner.image.url}
                  alt={banner.image.alternativeText}
                  width={banner.image.width}
                  height={banner.image.height}
                />
                <div className="flex flex-col items-center gap-3 text-base font-light text-stone-700">
                  <span className="text-lg">{banner.title}</span>
                  <Link
                    className="underline underline-offset-8"
                    href={banner.linkUrl}
                  >
                    {banner.linkText}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* New Products Slider */}
      <div className="mt-16 flex w-full flex-col gap-3 px-12">
        <div className="flex flex-row items-center justify-between text-stone-800">
          <span className="text-lg">محصولات جدید</span>
          <Link href="/" className="text-xs">
            مشاهده همه
          </Link>
        </div>
        <hr className="mb-4 h-px w-full bg-stone-400" />
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
          containerClass="mx-auto mb-24 mt-8 px-20"
          items={data.products}
          renderItem={(item, ctx: { isSwiping: boolean }) => {
            return (
              <Link
                key={item.data.id}
                href={`${nextServerUrl}/products/${item.data.documentId}`}
                className="cursor-pointer px-4 outline-none"
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
                  className="mt-4 flex flex-col items-center gap-2 text-center text-sm text-stone-600"
                >
                  <span className="font-medium">{item.data.name}</span>
                  <div className="flex flex-row items-center gap-3">
                    <span
                      className={classNames(
                        item.data.salePrice && "line-through"
                      )}
                    >
                      {item.data.originalPrice.toLocaleString("fa-IR")} تومان
                    </span>
                    {item.data.salePrice ? (
                      <div className="flex flex-row items-center gap-3">
                        <span className="text-sm">
                          (
                          {(
                            ((item.data.originalPrice - item.data.salePrice) /
                              item.data.originalPrice) *
                            100
                          ).toLocaleString("fa-IR")}
                          %)
                        </span>
                        <span className="text-red-600">
                          {Boolean(item.data.salePrice) &&
                            item.data.salePrice.toLocaleString("fa-IR")}{" "}
                          تومان
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
