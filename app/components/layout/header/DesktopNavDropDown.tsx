import { apiBaseUrl, nextServerUrl } from "@config";
import Image from "next/image";
import Link from "next/link";

import { Image as ImageType, NavigationLink } from "@/lib/definitions";

export default function DesktopNavDropDown({
  content,
  image,
  onClose,
}: {
  content: NavigationLink[][];
  image: ImageType | null;
  onClose: () => void;
}) {
  return (
    <div className="absolute left-0 top-16 z-10 hidden w-screen flex-row justify-center bg-stone-100 lg:flex">
      <div className="flex flex-row justify-between p-5 lg:w-11/12 xl:w-10/12 2xl:w-9/12">
        <div className="flex flex-row justify-between gap-14 xl:gap-20 2xl:gap-32">
          {content.map((col, colNumber) => {
            return (
              <ul
                key={col[0]?.url || colNumber}
                className="flex flex-col gap-5 text-right text-sm font-normal text-stone-600"
              >
                {col.map((item) => {
                  return (
                    <li className="whitespace-nowrap" key={item.url}>
                      <Link onClick={onClose} href={nextServerUrl + item.url}>
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
        {image && (
          <div className="w-3/12 2xl:w-auto">
            <Image
              src={apiBaseUrl + image.url}
              alt={image?.alternativeText}
              width={image.width}
              height={image.height}
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  );
}
