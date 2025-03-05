import { nextServerUrl } from "@config";
import Link from "next/link";

import type { PromoBanner } from "@/_lib/definitions";

export default function PromoBanner({ data }: { data: PromoBanner }) {
  const { promoMessage, siteTagline, ctaUrl, ctaText } = data;
  return (
    <div className="box-border flex max-h-10 min-h-10 w-full flex-row items-center justify-end bg-stone-800 p-2 text-sm font-light text-white">
      <div className="flex basis-1/3 flex-row justify-center gap-4">
        {promoMessage}
        <Link
          href={ctaUrl.startsWith("/") ? nextServerUrl + ctaUrl : ctaUrl}
          className="underline"
        >
          {ctaText}
        </Link>
      </div>
      <span className="basis-1/3 text-left">{siteTagline}</span>
    </div>
  );
}
