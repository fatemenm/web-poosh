import Link from "next/link";

import { Banner } from "@/lib/definitions";

export default function PromotionalBanner({ data }: { data: Banner }) {
  const { promoMessage, siteTagline, ctaUrl, ctaText } = data;
  return (
    <div className="bg-stone-800 w-full p-2 flex flex-row justify-start items-center text-white text-sm font-light min-h-11 max-h-11 box-border">
      <span className="basis-1/3">{siteTagline}</span>
      <div className="basis-1/3 text-center">
        {promoMessage} &nbsp;&nbsp;&nbsp;
        <Link href={ctaUrl} className="underline">
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
