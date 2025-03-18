"use client";

import { apiBaseUrl } from "@config";
import {
  faClock,
  faPhoneFlip,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import BreadCrumb from "@/_components/breadcrumb";
import { getProducts } from "@/_lib/data";
import { ProductModel } from "@/_models/product.model";

import setBox from "@public/set-box.jpg";

export default function Page() {
  const [products, setProducts] = useState<ProductModel[]>();
  useEffect(() => {
    const getData = async () => {
      const res = await getProducts({
        pagination: {
          page: 1,
          pageSize: 3,
        },
      });
      setProducts(res.products);
    };
    getData();
  }, []);
  const breadcrumbItems = [
    {
      label: "وب پوش",
      href: "/",
    },
    {
      label: "سبد خرید",
      href: "",
    },
  ];

  return (
    <div className="mx-auto flex w-10/12 flex-col">
      <BreadCrumb items={breadcrumbItems} />
      <div className="mx-auto my-16 flex w-9/12 justify-center">
        <div className="flex basis-1/2 flex-col gap-8 pl-10">
          <div>
            <h2 className="mb-4 text-2xl font-light text-stone-800">
              سبد خرید شما
            </h2>
            <hr />
          </div>
          <div>
            {products?.map((product) => {
              const image = product.getImagesByColor(
                product.getAvailableColors()[0].name
              )[0];
              return (
                <div
                  key={product.data.documentId}
                  className="flex gap-4 border-b border-b-stone-200 pt-6"
                >
                  <div className="w-40">
                    <Image
                      width={image.width}
                      height={image.height}
                      src={apiBaseUrl + image.url}
                      alt={image.alternativeText}
                    />
                  </div>
                  <div className="mb-4 flex flex-col justify-between">
                    <span className="text-sm font-medium text-stone-900">
                      {product.data.name}
                    </span>
                    <span className="text-sm">
                      سایز: {product.data.sizes[0]}
                    </span>
                    <span className="text-sm">
                      رنگ: {product.data.colors[0].name}
                    </span>
                    <span className="text-sm font-medium text-stone-800">
                      {product.data.originalPrice} تومان
                    </span>
                    <div className="flex gap-2">
                      <button className="border border-stone-400 bg-white px-16 py-1 text-sm text-stone-800 hover:bg-stone-800 hover:text-white">
                        ویرایش
                      </button>
                      <button className="border border-stone-400 bg-white px-16 py-1 text-sm text-stone-800 hover:bg-stone-800 hover:text-white">
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex basis-1/2 flex-col gap-20 pr-10">
          <div className="flex flex-col gap-4">
            <div>
              <Image src={setBox} alt="set-box" />
            </div>
            <div className="flex items-center">
              <button className="flex grow flex-row justify-center gap-8 border bg-white px-4 py-3 text-sm text-stone-800 hover:bg-stone-800 hover:text-white">
                <span> خرید جعبه هدیه ست</span>
                <span> ۲۶۰۰۰۰ تومان</span>
              </button>
              <Link href="#" className="px-10 text-sm font-light underline">
                درباره جعبه هدیه ست
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-stone-100 p-8 text-sm">
            <div className="flex items-center justify-between">
              <span>جمع سفارش</span>
              <span>۲۶۰۰۰۰ تومان</span>
            </div>
            <hr />
            <div className="flex flex-col gap-4">
              <span className="flex items-center gap-2">
                <FontAwesomeIcon
                  className="text-sm text-stone-700"
                  icon={faClock}
                />
                یادآوری
              </span>
              <span className="flex items-center gap-2">
                <FontAwesomeIcon
                  className="text-sm text-stone-700"
                  icon={faPhoneFlip}
                />
                خدمات مشتریان 05 50 00 91 - 021
              </span>
              <span className="flex items-center gap-2">
                <FontAwesomeIcon
                  className="text-sm text-stone-700"
                  icon={faTruckFast}
                />
                روش ارسال
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
