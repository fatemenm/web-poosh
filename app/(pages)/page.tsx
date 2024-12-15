import { apiBaseUrl } from "@config";
import Image from "next/image";
import Link from "next/link";

import CategorySlider from "@/(pages)/_components/categorySlider";
import NewProductsSlider from "@/(pages)/_components/newProductsSlider";
import {
  getCategories,
  getClotheProducts,
  getClotheSetBanners,
  getHeroBanners,
} from "@/_lib/data";

export default async function Page() {
  const heroBanners = await getHeroBanners();
  const categories = await getCategories();
  const clothingSetBanners = await getClotheSetBanners();
  const clotheProducts = await getClotheProducts();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Banners */}
      <div className="flex flex-row">
        {heroBanners?.map((banner, id) => {
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
      {categories && <CategorySlider categories={categories} />}
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
          {clothingSetBanners?.map((banner) => {
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
      {clotheProducts && <NewProductsSlider data={clotheProducts} />}
    </div>
  );
}
