import Link from "next/link";

interface promotionalBannerData {
  promotionalText: string;
  slogan: string;
  url: string;
  text: string;
}

export default function PromotionalBanner({
  data,
}: {
  data: promotionalBannerData;
}) {
  const { promotionalText, slogan, url, text } = data;
  return (
    <div className="bg-stone-800 w-full p-2 flex flex-row justify-start text-white text-sm font-light ">
      <span className="basis-1/3">{slogan}</span>
      <div className="basis-1/3 text-center">
        {promotionalText} &nbsp;&nbsp;&nbsp;
        <Link href={url} className="underline">
          {text}
        </Link>
      </div>
    </div>
  );
}
