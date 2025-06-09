"use client";

import { apiBaseUrl } from "@config";
import { faPhoneFlip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";

import BreadCrumb from "@/components/layout/breadcrumb";
import { useBasket } from "@/lib/context/basketContext";
import { useBreadcrumb } from "@/lib/context/breadcrumbContext";
import { BasketItem } from "@/lib/definitions";

import ProductModal from "../../features/product/productModal";

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

export default function Page() {
  const { items, removeItem, editItem } = useBasket();
  const [selectedItem, setSelectedItem] = useState<BasketItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const { setItems } = useBreadcrumb();
  useEffect(() => {
    setItems(breadcrumbItems);
  }, [setItems]);

  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4 lg:w-11/12 xl:w-10/12">
      <BreadCrumb />
      <div className="mb-8 flex w-full flex-col gap-8 lg:mt-4 lg:flex-row lg:gap-16 xl:mx-0 xl:justify-center">
        <div className="flex flex-col lg:w-1/2 lg:gap-8">
          <div>
            <h2 className="mb-4 text-base font-light text-stone-800 lg:text-2xl">
              سبد خرید شما
            </h2>
            <hr />
          </div>
          <div className="xs:mx-auto xs:w-10/12 sm:flex sm:w-2/3 sm:flex-col sm:items-center md:w-3/5 lg:mx-0 lg:w-full lg:items-start">
            {!items.length ? (
              <p className="text-stone-700">
                محصولی در سبد خرید شما موجود نیست!
              </p>
            ) : (
              items.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-row gap-4 border-b border-b-stone-200 pt-6 lg:w-full"
                  >
                    <div className="w-1/2 lg:w-40">
                      <Image
                        width={item.image.width}
                        height={item.image.height}
                        src={apiBaseUrl + item.image.url}
                        alt={item.image.alternativeText}
                      />
                    </div>
                    <div className="mb-4 flex w-1/2 flex-col justify-between gap-2 text-xs xs:text-sm lg:w-auto">
                      <span className="font-medium text-stone-900">
                        {item.product.data.name}
                      </span>
                      <span className="">سایز: {item.size}</span>
                      <span className="">رنگ: {item.color}</span>
                      <div className="flex flex-col gap-2 lg:flex-row lg:gap-3">
                        <span
                          className={classNames("font-medium text-stone-800", {
                            "line-through": item.product.data.salePrice,
                          })}
                        >
                          {item.product.data.originalPrice.toLocaleString(
                            "fa-ir"
                          )}{" "}
                          تومان
                        </span>
                        {item.product.data.salePrice > 0 && (
                          <span className="font-medium text-red-600">
                            {item.product.data.salePrice.toLocaleString(
                              "fa-ir"
                            )}{" "}
                            تومان
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 lg:flex-row">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setIsProductModalOpen(true);
                          }}
                          className="border border-stone-400 bg-white py-1 text-stone-800 hover:bg-stone-800 hover:text-white lg:px-16"
                        >
                          ویرایش
                        </button>
                        <button
                          onClick={() => removeItem(item)}
                          className="border border-stone-400 bg-white py-1 text-stone-800 hover:bg-stone-800 hover:text-white lg:px-16"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="flex flex-col gap-20 text-xs xs:mx-auto xs:w-10/12 xs:text-sm sm:w-2/3 md:w-3/5 lg:mx-0 lg:w-1/2 xl:w-1/3">
          <div className="flex flex-col gap-10 bg-stone-100 p-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span>جمع سفارش</span>
                <span className="flex gap-1">
                  {(() => {
                    let totalPrice = 0;
                    items.forEach((item) => {
                      totalPrice += item.product.data.originalPrice;
                    });
                    return totalPrice.toLocaleString("fa-ir");
                  })()}
                  <span>تومان</span>
                </span>
              </div>
              <div className="flex items-center justify-between text-green-600">
                <span>سود شما از این خرید</span>
                <span className="flex gap-1">
                  {(() => {
                    let totalDiscount = 0;
                    items.forEach((item) => {
                      totalDiscount += item.product.data.salePrice
                        ? item.product.data.originalPrice -
                          item.product.data.salePrice
                        : 0;
                    });
                    return totalDiscount.toLocaleString("fa-ir");
                  })()}
                  <span>تومان</span>
                </span>
              </div>
              <hr className="border-t-2 border-stone-200" />
              <div className="flex items-center justify-between">
                <span>جمع کل پس از تخفیف</span>
                <span className="flex gap-1">
                  {(() => {
                    let totalPrice = 0;
                    items.forEach((item) => {
                      totalPrice += item.product.data.salePrice
                        ? item.product.data.salePrice
                        : item.product.data.originalPrice;
                    });
                    return totalPrice.toLocaleString("fa-ir");
                  })()}
                  <span>تومان</span>
                </span>
              </div>
            </div>
            <hr className="border-t-2 border-stone-300" />
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                className="text-sm text-stone-700"
                icon={faPhoneFlip}
              />
              <span>خدمات مشتریان</span>
              05 50 00 91 - 021
            </div>
          </div>
        </div>
      </div>
      {selectedItem && (
        <ProductModal
          onRequestClose={() => {
            setIsProductModalOpen(false);
            setSelectedItem(null);
          }}
          isOpen={isProductModalOpen}
          product={selectedItem.product}
          onOpenChange={(value) => {
            setIsProductModalOpen(value);
          }}
          primaryButtonLabel="ویرایش سبد خرید"
          initialColor={selectedItem.color}
          initialSize={selectedItem.size}
          onPrimaryAction={({ selectedColor, selectedSize }) => {
            editItem({
              id: selectedItem.id,
              product: selectedItem.product,
              color: selectedColor,
              size: selectedSize,
              image: selectedItem.product.getImagesByColor(selectedColor)?.[0],
            });
          }}
        />
      )}
    </div>
  );
}
