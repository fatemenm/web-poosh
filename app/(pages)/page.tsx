"use client";

import { apiBaseUrl, nextServerUrl } from "@config";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import BasicSlider from "@/_components/basicSlider";
import {
  getCategories,
  getClotheSetBanners,
  getHeroBanners,
  getProducts,
} from "@/_lib/data";
import {
  Category,
  ClotheSetBanner,
  HeroBanner,
  Product,
} from "@/_lib/definitions";

const sliderSetting = {
  infinite: true,
  slidesToScroll: 1,
  slidesToShow: 5,
};
type Data = {
  heroBanners: HeroBanner[];
  categories: Category[];
  clothingSetBanners: ClotheSetBanner[];
  products: Product[];
};
export default function Page() {
  const [data, setData] = useState<Data | null>(null);
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      const [heroBanners, categories, clothingSetBanners, products] =
        await Promise.all([
          getHeroBanners(),
          getCategories(),
          getClotheSetBanners(),
          getProducts(),
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
          renderItem={(item, isSwiping) => {
            return (
              <Link
                href="/"
                key={item.id}
                className="flex cursor-pointer flex-col items-center px-4 outline-none"
                onClick={(e) => {
                  if (isSwiping) e.preventDefault();
                  else console.log(item.name);
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
        <BasicSlider<Product>
          setting={{
            ...sliderSetting,
            speed: 400,
            autoplay: true,
            autoplaySpeed: 4000,
            cssEase: "linear",
          }}
          containerClass="mx-auto mb-24 mt-8 px-20"
          items={data.products}
          renderItem={(item, isSwiping) => {
            return (
              <Link
                target="_blank"
                key={item.id}
                href={`${nextServerUrl}/products/${item.documentId}`}
                className="cursor-pointer px-4 outline-none"
                onClick={(e) => {
                  if (isSwiping) e.preventDefault();
                  else
                    router.push(`${nextServerUrl}/products/${item.documentId}`);
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
                  className="mt-4 flex flex-col items-center gap-2 text-center text-sm text-stone-600"
                >
                  <span className="font-medium">
                    {item.id.toLocaleString("fa-IR")} {item.name}
                  </span>
                  <div className="flex flex-row items-center gap-3">
                    <span
                      className={classNames(item.salePrice && "line-through")}
                    >
                      {item.originalPrice.toLocaleString("fa-IR")} تومان
                    </span>
                    {item.salePrice ? (
                      <div className="flex flex-row items-center gap-3">
                        <span className="text-sm">
                          (
                          {(
                            ((item.originalPrice - item.salePrice) /
                              item.originalPrice) *
                            100
                          ).toLocaleString("fa-IR")}
                          %)
                        </span>
                        <span className="text-red-600">
                          {item.salePrice.toLocaleString("fa-IR")} تومان
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
