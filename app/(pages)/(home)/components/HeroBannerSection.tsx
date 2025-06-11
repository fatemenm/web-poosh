import { apiBaseUrl } from "@config";
import Image from "next/image";
import Link from "next/link";

import { HeroBanner } from "@/lib/definitions";

export default function HeroBannerSection({
  banners,
}: {
  banners: HeroBanner[];
}) {
  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:gap-[2vw] lg:px-0">
      {banners.map((banner, id) => {
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
              <span className="text-sm lg:text-lg">{banner.texts.primary}</span>
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
  );
}
