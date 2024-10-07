import Link from "next/link";

export default function PromotionalBanner() {
  return (
    <div className="bg-blue-900 w-full p-1 flex flex-row gap-4 justify-center text-white">
      <Link href="/" className="underline">
        مشاهده محصولات
      </Link>
      <span>جین برای تمام سلیقه ها</span>
    </div>
  );
}
