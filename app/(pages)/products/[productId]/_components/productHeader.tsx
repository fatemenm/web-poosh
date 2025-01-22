import Image from "next/image";

const billCount = 4;

export function ProductHeader({
  name,
  basePrice,
  discountPrice,
  id,
}: {
  name: string;
  basePrice: string;
  discountPrice: string;
  id: number;
}) {
  const basePriceNum = Number(basePrice);
  const discountPriceNum = Number(discountPrice);
  return (
    <div className="flex flex-col gap-6">
      {/* title */}
      <h1 className="text-2xl">
        {name} {id.toLocaleString("fa-IR")}
      </h1>
      {/* price */}
      <div className="flex flex-row items-center gap-3">
        <span className="line-through">
          {basePriceNum.toLocaleString("fa-IR")} تومان
        </span>
        {discountPrice && (
          <div className="flex flex-row items-center gap-3">
            <span className="text-sm">
              (
              {(
                ((basePriceNum - discountPriceNum) / basePriceNum) *
                100
              ).toLocaleString("fa-IR")}
              %)
            </span>
            <span className="text-red-600">
              {discountPriceNum.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        )}
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
              (discountPrice ? discountPriceNum : basePriceNum) / billCount
            ).toLocaleString("fa-IR")}{" "}
            تومان (بدون کارمزد)
          </span>
        </div>
      </div>
    </div>
  );
}
