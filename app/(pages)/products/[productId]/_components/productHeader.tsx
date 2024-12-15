import Image from "next/image";

import { ClotheProduct } from "@/_lib/definitions";

const billCount = 4;

export function ProductHeader({ product }: { product: ClotheProduct }) {
  return (
    <div className="flex flex-col gap-6">
      {/* title */}
      <h1 className="text-2xl">
        {product.name} {product.id.toLocaleString("fa-IR")}
      </h1>
      {/* price */}
      <div className="flex flex-row gap-1">
        <span>
          {Number(product.price.replace(/,/g, "")).toLocaleString("fa-IR")}
        </span>
        <span>تومان</span>
      </div>
      {/* snap pay */}
      <div className="flex flex-row items-center justify-start gap-4 rounded-sm bg-sky-100 p-2">
        <Image
          src="/snappay.png"
          width="32"
          height="32"
          alt="snappay logo"
          className="cursor-zoom-in"
        />
        <div className="flex flex-col gap-1 text-xs text-sky-900">
          <span className="font-medium">امکان پرداخت اقساطیِ اسنپ پی</span>
          <span dir="rtl">
            {billCount.toLocaleString("fa-IR")} قسط ماهیانه{" "}
            {(
              Number(product.price.replace(/,/g, "")) / billCount
            ).toLocaleString("fa-IR")}{" "}
            تومان (بدون کارمزد)
          </span>
        </div>
      </div>
    </div>
  );
}
