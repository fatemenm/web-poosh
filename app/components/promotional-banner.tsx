import Link from "next/link";

import { Banner } from "@/lib/definitions";

// Q: is there any alternative to the any type here?
export default function PromotionalBanner({ data }: { data: Banner }) {
  const { dynamicText, staticText, ctaUrl, ctaText } = data;
  return (
    <div className="bg-stone-800 w-full p-2 flex flex-row justify-start text-white text-sm font-light ">
      <span className="basis-1/3">{staticText}</span>
      <div className="basis-1/3 text-center">
        {dynamicText} &nbsp;&nbsp;&nbsp;
        <Link href={ctaUrl} className="underline">
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
