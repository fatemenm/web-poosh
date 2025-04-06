"use client";

import { apiBaseUrl, nextServerUrl } from "@config";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import BasicSlider from "@/_components/basicSlider";
import BreadCrumb from "@/_components/breadcrumb";
import { getProductById, getProducts } from "@/_lib/data";
import { ProductModel } from "@/_models/product.model";

import ProductDescription from "./_components/productDescription";
import ProductDetails from "./_components/productDetails";
import SizeGuideModal from "./_components/sizeGuideModal";

const sliderSetting = {
  infinite: true,
  slidesToScroll: 1,
  slidesToShow: 5,
};

export default function Product({ params }: { params: { productId: string } }) {
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductModel[] | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const defaultColor = product?.getAvailableColors()[0].name;
  const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] =
    useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const product = await getProductById(params.productId);
      const res = await getProducts();
      setProduct(product);
      setRelatedProducts(res.products);
    };
    getData();
  }, [params.productId]);

  if (!product || !relatedProducts || !defaultColor)
    return <div>product is not available</div>;
  const breadcrumbItems = [
    {
      label: "وب پوش",
      href: "/",
    },
    {
      label: product.data.category.name,
      href: nextServerUrl + "/category/" + product.data.category.documentId,
    },
    {
      label: product.data.name,
      href: ".",
    },
  ];

  return (
    <div className="mx-auto flex w-10/12 flex-col gap-16">
      <BreadCrumb items={breadcrumbItems} />
      <ProductDetails
        onClickSizeGuideLink={() => setIsSizeGuideModalOpen(true)}
        product={product}
        selectedColor={selectedColor ?? defaultColor}
        onSelectColor={(value: string) => setSelectedColor(value)}
      />
      <ProductDescription
        onClickSizeGuideLink={() => setIsSizeGuideModalOpen(true)}
        product={product}
        images={product.getImagesByColor(selectedColor ?? defaultColor)}
      />
      <div className="mb-20 flex w-full flex-col gap-4">
        <span className="text-lg">محصولات مشابه دیگر</span>
        <BasicSlider<ProductModel>
          setting={sliderSetting}
          items={relatedProducts}
          renderItem={(item, ctx: { isSwiping: boolean }) => {
            return (
              <Link
                href={`${nextServerUrl}/products/${item.data.documentId}`}
                key={item.data.id}
                className="flex cursor-pointer flex-col items-center outline-none"
                onClick={(e) => {
                  if (ctx.isSwiping) e.preventDefault();
                }}
              >
                <Image
                  src={apiBaseUrl + item.data.imagesByColor[0].images[0].url}
                  alt={item.data.imagesByColor[0].images[0].alternativeText}
                  width={item.data.imagesByColor[0].images[0].width}
                  height={item.data.imagesByColor[0].images[0].height}
                  quality={100}
                />
                <div
                  style={{ direction: "rtl" }}
                  className="mt-4 flex flex-col items-center gap-2 text-center text-sm text-stone-600"
                >
                  <span className="font-medium">{item.data.name}</span>
                  <div className="flex flex-row items-center gap-3">
                    <span
                      className={classNames(
                        item.data.salePrice && "line-through"
                      )}
                    >
                      {item.data.originalPrice.toLocaleString("fa-IR")} تومان
                    </span>
                    {item.data.salePrice ? (
                      <span className="text-red-600">
                        {item.data.salePrice.toLocaleString("fa-IR")} تومان
                      </span>
                    ) : null}
                  </div>
                </div>
              </Link>
            );
          }}
        />
      </div>
      <SizeGuideModal
        isOpen={isSizeGuideModalOpen}
        onChangeOpen={(value: boolean) => setIsSizeGuideModalOpen(value)}
        data={{
          sizeTableInfo: product.data.category.sizeTable,
          information: product.data.information,
          sizeGuideImage: product.data.category.sizeGuideImage,
          productName: product.data.name,
          productImages: product.getImagesByColor(
            selectedColor ?? defaultColor
          ),
        }}
      />
    </div>
  );
}
