import { nextServerUrl } from "@config";
import Link from "next/link";

import type { PromoBanner } from "@/lib/definitions";

export default function PromoBanner({ data }: { data: PromoBanner }) {
  const { promoMessage, siteTagline, ctaUrl, ctaText } = data;
  return (
    <div className="relative z-10 box-border flex w-full flex-col items-center bg-stone-800 py-4 text-xs font-light text-white sm:flex-row sm:justify-end sm:px-2 lg:text-sm">
      <div className="flex gap-2 sm:basis-1/3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
        <span>{promoMessage}</span>
        <Link
          href={ctaUrl.startsWith("/") ? nextServerUrl + ctaUrl : ctaUrl}
          className="underline"
        >
          {ctaText}
        </Link>
      </div>
      <span className="hidden basis-1/3 text-left sm:block">{siteTagline}</span>
    </div>
  );
}
