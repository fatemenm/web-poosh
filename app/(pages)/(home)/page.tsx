// import Carousel from "./carousel";
// import { getImages } from "../../lib/utils";
import Link from "next/link";
import Image from "next/image";
import { categoriesNames } from "../../lib/data";

export default function Page() {
  // const categoryImages = await getImages("category");
  return (
    <div className="pt-10 flex flex-col gap-10">
      {/* <Carousel images={categoryImages} imageType="category" /> */}
      {/* sets */}
      {/* <div className="flex flex-col gap-12 mb-20">
        <div className="px-10">
          <div className="flex flex-row justify-between w-full items-center">
            <Link className="text-xs font-normal text-stone-600" href="">
              مشاهده همه
            </Link>
            <span className="text-lg">ست های جدید</span>
          </div>
          <hr className="mt-3" />
        </div>
        <div className="flex flex-row w-full gap-8">
          <div className="flex flex-col gap-6">
            <Link href="">
              <Image
                src="/images/home-sets/15_1728719638_p-large.jpg"
                alt=""
                width={1000}
                height={1000}
              />
            </Link>
            <div className="flex flex-col items-center gap-4 text-stone-700 font-light">
              <span>چطور روزمره لباس بپوشیم و هنوز خوش تیپ باشیم</span>
              <Link href="" className="underline underline-offset-8">
                مشاهده جزئیات
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <Link href="">
              <Image
                src="/images/home-sets/1728556310_p-large.jpg"
                alt=""
                width={1000}
                height={1000}
              />
            </Link>
            <div className="flex flex-col items-center gap-4 text-stone-700 font-light">
              <span>امکان نداره این ترکیب بهتون نیاد</span>
              <Link href="" className="underline underline-offset-8">
                مشاهده جزئیات
              </Link>
            </div>
          </div>
        </div>
      </div> */}
      {/* new products */}
      {/* <div className="flex flex-col gap-12">
        <div className="px-10">
          <div className="flex flex-row justify-between w-full items-center">
            <Link className="text-xs font-normal text-stone-600" href="">
              مشاهده همه
            </Link>
            <span className="text-lg">محصولات جدید</span>
          </div>
          <hr className="mt-3" />
        </div>
      </div> */}
    </div>
  );
}
