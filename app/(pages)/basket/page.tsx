"use client";

import { apiBaseUrl } from "@config";
import {
  faClock,
  faPhoneFlip,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import BreadCrumb from "@/_components/breadcrumb";
import { useBasket } from "@/_lib/context/basketContext";
import { useBreadcrumb } from "@/_lib/context/breadcrumbContext";
import { BasketItem } from "@/_lib/definitions";

import setBox from "@public/set-box.jpg";

import ProductModal from "../_components/productModal";

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
    <div className="mx-auto flex w-10/12 flex-col">
      <BreadCrumb />
      <div className="mx-auto my-16 flex w-9/12 justify-center gap-32">
        <div className="flex basis-1/2 flex-col gap-8">
          <div>
            <h2 className="mb-4 text-2xl font-light text-stone-800">
              سبد خرید شما
            </h2>
            <hr />
          </div>
          <div>
            {!items.length ? (
              <p className="text-stone-700">
                محصولی در سبد خرید شما موجود نیست!
              </p>
            ) : (
              items.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-b-stone-200 pt-6"
                  >
                    <div className="w-40">
                      <Image
                        width={item.image.width}
                        height={item.image.height}
                        src={apiBaseUrl + item.image.url}
                        alt={item.image.alternativeText}
                      />
                    </div>
                    <div className="mb-4 flex flex-col justify-between">
                      <span className="text-sm font-medium text-stone-900">
                        {item.product.data.name}
                      </span>
                      <span className="text-sm">سایز: {item.size}</span>
                      <span className="text-sm">رنگ: {item.color}</span>
                      <div className="flex gap-3">
                        <span
                          className={classNames(
                            "text-sm font-medium text-stone-800",
                            {
                              "line-through": item.product.data.salePrice,
                            }
                          )}
                        >
                          {item.product.data.originalPrice.toLocaleString(
                            "fa-ir"
                          )}{" "}
                          تومان
                        </span>
                        {item.product.data.salePrice > 0 && (
                          <span className="text-sm font-medium text-red-600">
                            {item.product.data.salePrice.toLocaleString(
                              "fa-ir"
                            )}{" "}
                            تومان
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setIsProductModalOpen(true);
                          }}
                          className="border border-stone-400 bg-white px-16 py-1 text-sm text-stone-800 hover:bg-stone-800 hover:text-white"
                        >
                          ویرایش
                        </button>
                        <button
                          onClick={() => removeItem(item)}
                          className="border border-stone-400 bg-white px-16 py-1 text-sm text-stone-800 hover:bg-stone-800 hover:text-white"
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
        <div className="flex basis-1/2 flex-col gap-20">
          <div className="flex flex-col gap-10 bg-stone-100 p-8 text-sm">
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
