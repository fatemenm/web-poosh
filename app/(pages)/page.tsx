import Image from "next/image";
import Link from "next/link";

import AutoSlider from "@/components/autoSlider";
import ClickSlider from "@/components/clickSlider";
import {
  getCategories,
  getClotheProducts,
  getClotheSetBanners,
  getHeroBanners,
} from "@/lib/data";

import { apiBaseUrl } from "../../config";

const heroBanners = await getHeroBanners();
const categories = await getCategories();
const clothingSetBanners = await getClotheSetBanners();
const clotheProducts = await getClotheProducts();

export default async function Page() {
  return (
    <div className=" flex flex-col items-center">
      {/* Hero Banners */}
      <div className="flex flex-row-reverse">
        {heroBanners?.map((banner, id) => {
          return (
            <div key={id} className="flex flex-col items-center gap-4">
              <Image
                src={`${apiBaseUrl}${banner.image?.url}`}
                alt={banner.image.alternativeText}
                width={banner.image.width}
                height={banner.image.height}
                priority
              />
              <div className="flex flex-col items-center text-stone-900 font-medium gap-1">
                <span className="text-lg ">{banner.texts.primary}</span>
                <span className="tracking-[.2em] font-normal text-stone-700 text-sm font-english">
                  {banner.texts.secondary}
                </span>
                <Link
                  className="border-b pb-2 border-stone-900"
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
      {categories && <ClickSlider categories={categories} />}
      {/* Daily Set Banners */}
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-3 w-full mt-16 px-12">
          <div className="flex flex-row-reverse items-center justify-between text-stone-800">
            <span className="text-lg"> ست‌‌‌‌‌‌‌های جدید</span>
            <Link href="/sets" className="text-xs ">
              مشاهده همه
            </Link>
          </div>
          <hr className="bg-stone-400 h-px w-full mb-4" />
        </div>
        <div className="flex flex-row-reverse gap-8">
          {clothingSetBanners?.map((banner, id) => {
            return (
              <div key={id} className="flex flex-col items-center gap-4">
                <Image
                  src={`${apiBaseUrl}${banner.image?.url}`}
                  alt={banner.image.alternativeText}
                  width={banner.image.width}
                  height={banner.image.height}
                />
                <div className="flex flex-col items-center text-base text-stone-700 font-light gap-3">
                  <span className="text-lg ">{banner.title}</span>
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
      <div className="flex flex-col gap-3 w-full mt-16 px-12">
        <div className="flex flex-row-reverse items-center justify-between text-stone-800">
          <span className="text-lg">محصولات جدید</span>
          <Link href="/" className="text-xs ">
            مشاهده همه
          </Link>
        </div>
        <hr className="bg-stone-400 h-px w-full mb-4" />
      </div>
      {clotheProducts && <AutoSlider data={clotheProducts} />}
    </div>
  );
}
