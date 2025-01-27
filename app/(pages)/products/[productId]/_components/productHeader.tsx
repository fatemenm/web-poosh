import classNames from "classnames";
import Image from "next/image";

const billCount = 4;

export function ProductHeader({
  name,
  originalPrice,
  salePrice,
  id,
}: {
  name: string;
  originalPrice: number;
  salePrice: number;
  id: number;
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* title */}
      <h1 className="text-2xl">
        {name} {id.toLocaleString("fa-IR")}
      </h1>
      {/* price */}
      <div className="flex flex-row items-center gap-3">
        <span className={classNames(salePrice && "line-through")}>
          {originalPrice.toLocaleString("fa-IR")} تومان
        </span>
        {salePrice ? (
          <div className="flex flex-row items-center gap-3">
            <span className="text-sm">
              (
              {(
                ((originalPrice - salePrice) / originalPrice) *
                100
              ).toLocaleString("fa-IR")}
              %)
            </span>
            <span className="text-red-600">
              {salePrice.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        ) : null}
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
              (salePrice ? salePrice : originalPrice) / billCount
            ).toLocaleString("fa-IR")}{" "}
            تومان (بدون کارمزد)
          </span>
        </div>
      </div>
    </div>
  );
}
