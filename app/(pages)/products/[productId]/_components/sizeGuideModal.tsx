"use client";

import { apiBaseUrl } from "@config";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { useState } from "react";

import { Image as ImageType } from "@/_lib/definitions";

type dataType = {
  productImages: ImageType[];
  sizeTableInfo: Record<string, string>[];
  sizeGuideImage: ImageType;
  information: {
    productInfo: string;
    modelSizeInfo: string;
    colorInfo: string;
  };
  productName: string;
};

export default function SizeGuideModal({
  isOpen,
  onChangeOpen,
  data,
}: {
  isOpen: boolean;
  onChangeOpen: (value: boolean) => void;
  data: dataType;
}) {
  const [activeTab, setActiveTab] = useState<"sizeTable" | "measurementMethod">(
    "sizeTable"
  );
  const {
    sizeTableInfo,
    information,
    sizeGuideImage,
    productName,
    productImages,
  } = data;
  return (
    <Dialog.Root
      modal
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) setActiveTab("sizeTable");
        onChangeOpen(open);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex justify-center overflow-y-auto bg-black/50">
          <Dialog.Content className="xs:w-9/12 absolute z-20 my-6 flex w-11/12 max-w-4xl flex-col border border-stone-500 bg-white p-0 sm:w-8/12 md:w-9/12 lg:min-w-[300px] xl:w-full">
            <VisuallyHidden.Root asChild>
              <Dialog.Title> راهنمای سایز</Dialog.Title>
            </VisuallyHidden.Root>
            <VisuallyHidden.Root asChild>
              <Dialog.Description>
                سایز مورد نظر خود را بر اساس جدول و راهنمای اندازه گیری انتخاب
                کنید
              </Dialog.Description>
            </VisuallyHidden.Root>
            <Dialog.Close className="absolute right-2 top-3 px-2 text-slate-700 hover:text-slate-800">
              <FontAwesomeIcon icon={faClose} className="text-[16px]" />
            </Dialog.Close>
            {/* row 1 */}
            <div className="flex flex-col-reverse border-b-[1px] md:flex-row">
              <div className="flex w-full flex-row items-center justify-center rounded-tr-md md:w-1/2 md:bg-stone-100 md:px-6 md:py-3">
                <div className="flex w-fit flex-col gap-2 rounded-md bg-white px-4 py-5 shadow-sm">
                  <span className="text-base font-normal text-stone-800 lg:text-xl">
                    {productName}
                  </span>
                  <hr />
                  <span className="text-sm text-stone-600">
                    {information.modelSizeInfo}
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-row-reverse md:w-1/2 md:flex-row">
                <div className="w-1/2 md:w-1/2">
                  <Image
                    src={apiBaseUrl + productImages[1].url}
                    height={productImages[1].height}
                    width={productImages[1].width}
                    alt={productImages[1].alternativeText}
                  />
                </div>
                <div className="w-1/2 md:w-1/2">
                  <Image
                    className="rounded-tl-md"
                    src={apiBaseUrl + productImages[0].url}
                    height={productImages[0].height}
                    width={productImages[0].width}
                    alt={productImages[0].alternativeText}
                  />
                </div>
              </div>
            </div>
            {/* row 2 */}
            <div className="flex flex-col gap-6 rounded-b-md px-4 py-8">
              <div className="flex flex-row justify-between border-b-[1px] text-sm hover:border-b-stone-500 lg:text-base">
                <button
                  className={`w-full py-0 pb-3 lg:px-8 lg:py-5 ${activeTab === "sizeTable" ? "border-b-[2px] border-b-stone-600" : "border-b-[2px] border-b-transparent"}`}
                  onClick={() => setActiveTab("sizeTable")}
                >
                  جدول سایز
                </button>
                <button
                  className={`w-full py-0 pb-3 lg:px-8 lg:py-5 ${activeTab === "measurementMethod" ? "border-b-[2px] border-b-stone-600" : "border-b-[2px] border-b-transparent"}`}
                  onClick={() => setActiveTab("measurementMethod")}
                >
                  روش اندازه گیری
                </button>
              </div>
              {activeTab === "sizeTable" && (
                <div className="flex flex-col justify-between gap-4">
                  <div className="text-sm font-light text-stone-800">
                    <p className="pb-2">
                      لطفا طبق{" "}
                      <button
                        onClick={() => setActiveTab("measurementMethod")}
                        className="text-blue-600"
                      >
                        روش اندازه گیری
                      </button>{" "}
                      ارائه شده سایز مناسب خود را از جدول زیر انتخاب نمایید
                    </p>
                    <ul className="list-inside list-disc pr-4">
                      <li className="py-1 marker:text-lg marker:text-stone-400">
                        اندازه های ارائه شده در جدول زیر +/- ۱ سانتی متر دارای
                        خطا می باشد
                      </li>
                      <li className="py-1 marker:text-lg marker:text-stone-400">
                        تمامی اندازه ها به سانتی متر می باشد
                      </li>
                    </ul>
                  </div>
                  <hr />
                  <table className="border-collapse border text-center text-xs md:text-sm">
                    <thead>
                      <tr>
                        {Object.keys(sizeTableInfo[0]).map((label, index) => (
                          <th
                            className="border bg-stone-100 px-2 py-3 font-medium md:px-4"
                            scope="col"
                            key={index}
                          >
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sizeTableInfo.map((sizeData, index) => {
                        const labels = Object.keys(sizeData);
                        return (
                          <tr key={index}>
                            <th className="border bg-stone-50 px-2 py-3 font-medium md:px-4">
                              {sizeData[labels[0]]}
                            </th>
                            {labels.slice(1).map((label, index) => (
                              <td
                                key={index}
                                className="border px-2 py-2 md:px-4"
                              >
                                {sizeData[label]}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === "measurementMethod" && (
                <div className="flex flex-col gap-6">
                  <p className="text-sm font-light text-stone-800">
                    لطفا طبق تصویر زیر اندازه ها را به دست آورید . سپس با مقایسه
                    اندازه های خود با{" "}
                    <button
                      onClick={() => setActiveTab("sizeTable")}
                      className="text-blue-600"
                    >
                      جدول سایز
                    </button>{" "}
                    ارائه شده، سایز مناسب خود را انتخاب نمایید.
                  </p>
                  <div>
                    <Image
                      src={apiBaseUrl + sizeGuideImage.url}
                      alt={sizeGuideImage.alternativeText}
                      width={sizeGuideImage.width}
                      height={sizeGuideImage.height}
                    />
                  </div>
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
