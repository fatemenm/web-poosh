import { categoriesNames } from "../lib/placeholder-data";
import Link from "next/link";
import Image from "next/image";

export default function Carousel({
  images,
  imageType,
}: {
  images: Array<string> | undefined;
  imageType: string;
}) {
  return (
    <div className="flex overflow-x-auto items-center justify-start gap-4 bg-blue-50">
      {images.map((img, index) => (
        <div key={index} className="bg-pink-50">
          <Image
            src={`/images/${imageType}/${img}`}
            alt={img}
            width={342}
            height={432}
            className="max-w-min object-contain"
          />
        </div>
      ))}
      <Link href="/"></Link>
    </div>
  );
}
