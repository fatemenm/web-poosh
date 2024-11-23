import Image from "next/image";

import { Category } from "@/lib/definitions";

import { apiBaseUrl } from "../../config";

export default function CarouselItem({ item }: { item: Category }) {
  return (
    <div className="flex flex-col items-center ">
      <Image
        src={apiBaseUrl + item.image.url}
        alt={item.image.alternativeText}
        width={item.image.width}
        height={item.image.height}
        className="max-w-fit"
      />
      <div className="underline underline-offset-8 ">{item.name}</div>
    </div>
  );
}
