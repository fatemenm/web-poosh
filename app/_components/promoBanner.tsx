import { nextServerUrl } from "@config";
import Link from "next/link";

import type { PromoBanner } from "@/_lib/definitions";

export default function PromoBanner({ data }: { data: PromoBanner }) {
  const { promoMessage, siteTagline, ctaUrl, ctaText } = data;
  return (
    <div className="box-border flex w-full flex-col items-center bg-stone-800 py-4 text-sm font-light text-white md:flex-row md:justify-end md:px-2">
      <div className="flex gap-4 md:basis-1/3 md:flex-row md:items-center md:justify-center md:gap-4">
        <span>{promoMessage}</span>
        <Link
          href={ctaUrl.startsWith("/") ? nextServerUrl + ctaUrl : ctaUrl}
          className="underline"
        >
          {ctaText}
        </Link>
      </div>
      <span className="hidden basis-1/3 text-left md:block">{siteTagline}</span>
    </div>
  );
}
