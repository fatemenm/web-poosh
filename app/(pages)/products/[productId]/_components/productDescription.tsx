import { apiBaseUrl } from "@config";
import {
  faArrowRightArrowLeft,
  faRulerHorizontal,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

import { ClotheProduct } from "@/_lib/definitions";

import SizeGuide from "./sizeGuide";

export default function ProductDescription({
  product,
}: {
  product: ClotheProduct;
}) {
  const productImage = product.images[0];
  return (
    <div className="flex flex-row items-stretch justify-center gap-28 bg-stone-100 p-10">
      <div className="w-3/12">
        <Image
          src={apiBaseUrl + productImage.url}
          alt={productImage.alternativeText}
          width={productImage.width}
          height={productImage.height}
          quality={100}
        />
      </div>
      <div className="flex w-6/12 flex-col justify-between py-3 text-stone-800">
        <h2 className="text-xl">
          توضیحات {product.name} {product.id.toLocaleString("fa-IR")}
        </h2>
        <p className="flex flex-col gap-4 text-sm font-light">
          <span>
            {" "}
            کفش روزمره بندی مردانه، راحت و ساخته شده از چرم طبیعی با کیفیت، شیک
            و اسپرت
          </span>

          <span>
            {" "}
            با توجه به تفاوت نمایش رنگ‌ها در صفحه نمایش دستگاه‌های مختلف، رنگ
            محصولات در تصویر تا 20% با واقعیت متفاوت خواهد بود
          </span>
        </p>
        <div className="flex flex-col gap-5">
          <span className="text-sm font-medium">روش شستشو و نگهداری</span>
          <div className="flex flex-row justify-between gap-12 pr-8 text-sm font-light leading-7">
            <ul className="flex w-1/2 list-disc flex-col">
              <li>
                برای تمیز کردن کفش یک دستمال یا اسفنج مرطوب را با کف شامپو آغشته
                کنید و به نرمی بر روی سطح کفش بکشید. سپس سطح کفش را با پارچه‌ی
                تمیز خشک کنید.
              </li>
              <li>کفش های چرم ، جیر و نبوک را با ماشین لباسشویی نشویید.</li>
            </ul>
            <ul className="flex w-1/2 list-disc flex-col">
              <li>از برخورد کفش با اشیاء نوک تیز جلوگیری کنید.</li>
              <li>
                درصورت خیس شدن کفش‌، آنرا بدور از حرارت و نور خورشید و در دمای
                معمولی اتاق خشک کنید
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row gap-20">
          <SizeGuide
            images={product.images}
            buttonClassName="flex flex-row items-center gap-2 text-xs"
            children={
              <>
                <FontAwesomeIcon
                  icon={faRulerHorizontal}
                  style={{ fontSize: 12 }}
                />
                <span className="text-blue-600 underline underline-offset-8">
                  راهنمای انتخاب سایز
                </span>
              </>
            }
          />

          <Link href="" className="flex flex-row items-center gap-2 text-xs">
            <FontAwesomeIcon icon={faTruckFast} style={{ fontSize: 12 }} />
            روش ارسال
          </Link>

          <Link href="" className="flex flex-row items-center gap-2 text-xs">
            <FontAwesomeIcon
              icon={faArrowRightArrowLeft}
              style={{ fontSize: 12 }}
            />
            تعویض یا بازگشت آسان
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <hr />
          <span className="text-xs font-light text-neutral-400">
            کد محصول: ۴۳۷۵۳۴۸۹
          </span>
        </div>
      </div>
    </div>
  );
}
