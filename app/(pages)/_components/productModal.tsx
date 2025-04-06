import { nextServerUrl } from "@config";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";

import Accordion from "@/_components/accordion";
import ColorSelector from "@/_components/colorSelector";
import GallerySlider from "@/_components/gallerySlider";
import SizeSelector from "@/_components/sizeSelector";
import { BasketItem } from "@/_lib/definitions";
import { ProductModel } from "@/_models/product.model";
import styles from "@/_styles/gallerySlider.module.css";

export default function ProductModal({
  isOpen,
  onOpenChange,
  product,
  primaryButtonLabel,
  defaultColor = product?.getAvailableColors()[0].name,
  defaultSize,
  onSelectPrimaryButton,
}: {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  product: ProductModel;
  primaryButtonLabel: string;
  defaultColor?: string;
  defaultSize?: string;
  onSelectPrimaryButton: (item: BasketItem) => void;
}) {
  const [selectedColor, setSelectedColor] = useState<string>(defaultColor);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    defaultSize
  );
  const [isSizeErrorVisible, setIsSizeErrorVisible] = useState<boolean>(false);
  console.log("product in product modal", product);

  return (
    <Dialog.Root
      modal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) setIsSizeErrorVisible(false);
        onOpenChange(open);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex justify-center overflow-y-auto bg-black/50">
          <Dialog.Content className="absolute my-6 flex w-full min-w-[300px] max-w-5xl flex-col overflow-hidden border border-stone-500 bg-white p-0">
            <VisuallyHidden.Root asChild>
              <Dialog.Title>مشاهده سریع محصول</Dialog.Title>
            </VisuallyHidden.Root>
            <VisuallyHidden.Root asChild>
              <Dialog.Description>
                نمایش جزییات محصول - شامل عکس ها - رنگ ها و سایزها
              </Dialog.Description>
            </VisuallyHidden.Root>
            <Dialog.Close className="absolute right-2 top-3 px-2 text-slate-500 hover:text-slate-600">
              <FontAwesomeIcon icon={faClose} className="text-[16px]" />
            </Dialog.Close>
            <div className="flex flex-row">
              {/* gallery slider */}
              <div className="mr-24 w-1/2">
                <GallerySlider
                  dotsClassName={styles.slickDotsModal}
                  images={product.getImagesByColor(
                    selectedColor ?? defaultColor
                  )}
                  isExpandable={false}
                />
              </div>
              {/* product overview */}
              <div className="flex w-1/2 flex-col justify-between">
                <ScrollArea.Root
                  className="h-[510px] w-full overflow-hidden pt-6"
                  dir="rtl"
                >
                  <ScrollArea.Viewport className="size-full rounded px-6">
                    <div className="flex flex-col gap-6">
                      {/* product header */}
                      <div className="flex flex-col gap-4">
                        <h1 className="text-xl font-medium">
                          {product.data.name}{" "}
                          {product.data.id.toLocaleString("fa-IR")}
                        </h1>
                        <div className="flex flex-row items-center gap-3 text-sm">
                          <span
                            className={classNames(
                              product.data.salePrice && "line-through"
                            )}
                          >
                            {product.data.originalPrice.toLocaleString("fa-IR")}{" "}
                            تومان
                          </span>
                          {product.data.salePrice ? (
                            <div className="flex flex-row items-center gap-3">
                              <span className="">
                                (
                                {(
                                  ((product.data.originalPrice -
                                    product.data.salePrice) /
                                    product.data.originalPrice) *
                                  100
                                ).toLocaleString("fa-IR")}
                                %)
                              </span>
                              <span className="text-red-600">
                                {product.data.salePrice.toLocaleString("fa-IR")}{" "}
                                تومان
                              </span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <hr />
                      {/* product color & size */}
                      <div className="flex flex-col gap-4 text-stone-800">
                        <div className="text-sm font-light">
                          رنگ انتخابی شما:
                          <span className="pr-1 font-normal">
                            {selectedColor ?? defaultColor}
                          </span>
                        </div>
                        <ColorSelector
                          selectedColor={selectedColor ?? defaultColor}
                          colors={product.getAvailableColors()}
                          onSelect={(color: string) => {
                            setSelectedColor(color);
                            setSelectedSize("");
                            setIsSizeErrorVisible(false);
                          }}
                        />
                      </div>
                      <SizeSelector
                        sizes={product.getAvailableSizes(
                          selectedColor ?? defaultColor
                        )}
                        selectedSize={selectedSize}
                        onSelect={(size: string) => {
                          setSelectedSize(size);
                          setIsSizeErrorVisible(false);
                        }}
                      />
                      <hr />
                      <Accordion
                        triggerButtonText={["توضیحات"]}
                        triggerButtonClass="font-medium text-base"
                        items={[
                          <div className="flex flex-col gap-10" key={0}>
                            <div className="flex flex-col gap-4 text-sm font-light text-stone-800">
                              {Object.values(product.data.information).map(
                                (value, index) => (
                                  <span key={index}>{value}</span>
                                )
                              )}
                            </div>
                            <div className="flex flex-col gap-4">
                              <span className="text-sm font-medium">
                                روش شستشو و نگهداری
                              </span>
                              <div className="flex-row justify-between gap-12 pr-8 text-sm font-light leading-7">
                                <ul className="list-disc">
                                  {product.data.category.careTips.map(
                                    (item, index) => (
                                      <li key={index}>{item}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>,
                        ]}
                      />
                      <hr />
                      <Link
                        href={`${nextServerUrl}/products/${product.data.documentId}`}
                        className="mb-6 border border-stone-700 px-8 py-4 text-center text-sm font-normal text-stone-900 hover:bg-stone-600 hover:text-white"
                      >
                        مشاهده تمامی اطلاعات محصول
                      </Link>
                    </div>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar
                    className="flex touch-none select-none rounded-[10px] p-0.5 transition-colors duration-150 ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                    orientation="vertical"
                  >
                    <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-400 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
                  </ScrollArea.Scrollbar>
                </ScrollArea.Root>
                <div className="w-full p-4 shadow-[0_-4px_6px_-4px_rgba(0,0,0,0.5)]">
                  {isSizeErrorVisible && (
                    <div className="bg-red-700 px-4 py-2 text-sm font-light text-white">
                      لطفا سایز را انتخاب کنید
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (!selectedSize) setIsSizeErrorVisible(true);
                      else {
                        const basketItem = {
                          id: Math.ceil(Math.random() * 1000) + Date.now(),
                          product: product,
                          color: selectedColor,
                          size: selectedSize,
                          image: product.getImagesByColor(selectedColor)?.[0],
                        };
                        onSelectPrimaryButton(basketItem);
                      }
                    }}
                    className={
                      "mt-2 w-full bg-green-700 py-4 text-sm text-white hover:bg-green-800"
                    }
                  >
                    {primaryButtonLabel}
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
