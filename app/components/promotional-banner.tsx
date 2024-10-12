import Link from "next/link";

export default function PromotionalBanner() {
  return (
    <div className="bg-blue-900 w-full p-2 flex flex-row justify-start text-white text-md">
      <span className="text-sm basis-1/3">وب پوش پوشاک اقایان</span>
      <div className="basis-1/3 text-center">
        <Link href="/" className="underline">
          مشاهده محصولات
        </Link>
        &nbsp;&nbsp;&nbsp;جین برای تمام سلیقه ها
      </div>
    </div>
  );
}
