import Image from "next/image";
import Link from "next/link";

import Carousel from "@/components/carousel";
import ClickSlider from "@/components/clickSlider";
import { getCategories, getHeroBanners } from "@/lib/data";

import { apiBaseUrl } from "../../config";

const heroBanners = await getHeroBanners();
const categories = await getCategories();

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
      {/* Category Carousel */}
      {/* {categories && <Carousel categories={categories} />} */}
      {categories && <ClickSlider categories={categories} />}
      {/* Daily Set Banners */}
      {/* New Products Carousel */}
    </div>
  );
}
