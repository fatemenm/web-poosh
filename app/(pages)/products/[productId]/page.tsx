import { apiBaseUrl } from "@config";
import Image from "next/image";
import Link from "next/link";

import ProductDetails from "@/(pages)/products/[productId]/_components/productDetails";
import BasicSlider from "@/_components/basicSlider";
import BreadCrumb from "@/_components/breadcrumb";
import { getClotheProductById, getClotheProducts } from "@/_lib/data";
import { ClotheProduct } from "@/_lib/definitions";

import ProductDescription from "./_components/productDescription";

export async function generateStaticParams() {
  const clotheProducts = await getClotheProducts();
  return clotheProducts?.map((product) => ({
    productId: product.documentId,
  }));
}

export default async function Product({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const product = await getClotheProductById((await params).productId);
  const links = [
    {
      label: "وب پوش",
      href: "/",
    },
    {
      label: "لباس",
      href: "/products",
    },
    {
      label: "شلوار جین کارگو ۴۵",
      href: ".",
    },
  ];
  const sliderContent: ClotheProduct[] = new Array(10).fill(product);

  const customSetting = {
    infinite: false,
    slidesToScroll: 5,
    slidesToShow: 5,
  };

  if (product)
    return (
      <div className="mx-auto flex w-10/12 flex-col gap-20">
        <BreadCrumb items={links} />
        {product && <ProductDetails product={product} />}
        <ProductDescription product={product} />
        <div className="mb-20 flex w-full flex-col gap-4">
          <span className="text-lg">محصولات مشابه دیگر</span>
          <BasicSlider sliderSetting={customSetting} containerClass="">
            {sliderContent.map((item) => (
              <Link
                href="/"
                key={item.id}
                className="flex cursor-pointer flex-col items-center outline-none"
              >
                <Image
                  src={apiBaseUrl + item.images[0].url}
                  alt={item.images[0].alternativeText}
                  width={item.images[0].width}
                  height={item.images[0].height}
                  quality={100}
                />
                <div className="mt-4 flex justify-center gap-1 text-center text-sm font-light text-stone-700">
                  <span> تومان</span>
                  {Number(item.price.replace(/,/g, "")).toLocaleString("fa-IR")}
                </div>
              </Link>
            ))}
          </BasicSlider>
        </div>
      </div>
    );
}
