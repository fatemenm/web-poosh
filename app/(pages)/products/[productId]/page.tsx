import Image from "next/image";

import { getClotheProducts } from "@/lib/data";

import { apiBaseUrl } from "../../../../config";

const clotheProducts = await getClotheProducts();
export async function generateStaticParams() {
  return clotheProducts?.map((product) => ({
    productId: product.id.toString(),
  }));
}
export default function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  const product = clotheProducts?.find(
    (product) => product.id === Number(productId)
  );
  return (
    <div className="flex flex-col items-center mt-20 bg-slate-200 mx-48">
      {product && (
        <div className="flex flex-row gap-10 bg-blue-100 w-full pl-28 pr-48">
          <div className="flex flex-col w-1/3 gap-6 text-right bg-green-50">
            <h1 className="text-2xl">
              {product.name} {product.id}
            </h1>
            <span className="flex flex-row-reverse gap-1">
              <span>
                {Number(product.price.replace(/,/g, "")).toLocaleString(
                  "fa-IR"
                )}
              </span>
              <span>تومان</span>
            </span>
          </div>
          <div className="">
            <Image
              src={apiBaseUrl + product.image.url}
              alt={product.image.alternativeText}
              height={product.image.height}
              width={product.image.width}
              quality={100}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-slate-300 w-20 h-40">img</div>
            <div className="bg-slate-300 w-20 h-40">img</div>
            <div className="bg-slate-300 w-20 h-40">img</div>
            <div className="bg-slate-300 w-20 h-40">img</div>
          </div>
        </div>
      )}
    </div>
  );
}
