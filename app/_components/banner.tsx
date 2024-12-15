import Link from "next/link";

import type { Banner } from "@/_lib/definitions";

export default function Banner({ data }: { data: Banner }) {
  const { promoMessage, siteTagline, ctaUrl, ctaText } = data;
  return (
    <div className="box-border flex max-h-10 min-h-10 w-full flex-row items-center justify-end bg-stone-800 p-2 text-sm font-light text-white">
      <div className="basis-1/3 text-center">
        {promoMessage} &nbsp;&nbsp;&nbsp;
        <Link href={ctaUrl} className="underline">
          {ctaText}
        </Link>
      </div>
      <span className="basis-1/3 text-left">{siteTagline}</span>
    </div>
  );
}
