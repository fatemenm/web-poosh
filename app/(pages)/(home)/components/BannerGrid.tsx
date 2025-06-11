import { apiBaseUrl } from "@config";
import Image from "next/image";
import Link from "next/link";

import { ClotheSetBanner } from "@/lib/definitions";

export default function BannerGrid({
  banners,
}: {
  banners: ClotheSetBanner[];
}) {
  return (
    <div className="my-8 flex w-full flex-col gap-4 px-4 lg:my-16 lg:gap-7 lg:px-0">
      <div className="flex w-full flex-col gap-3">
        <div className="flex flex-row items-center justify-between text-stone-800">
          <span className="text-sm lg:text-lg">محصولات محبوب</span>
        </div>
        <hr className="w-full bg-stone-400 lg:mb-4" />
      </div>
      <div className="mx-auto flex w-2/3 flex-col gap-10 xs:w-auto xs:flex-row xs:gap-3 md:justify-center lg:mx-0 lg:gap-16">
        {banners.map((banner) => {
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
                <span className="text-center text-sm xs:text-xs md:text-sm lg:text-base xl:text-lg">
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
  );
}
