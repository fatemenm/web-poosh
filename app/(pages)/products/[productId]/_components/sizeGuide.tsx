"use client";

import { apiBaseUrl } from "@config";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { RefObject, useEffect, useRef, useState } from "react";

import { Image as ProductImage } from "@/_lib/definitions";

export default function SizeGuide({ images }: { images: ProductImage[] }) {
  const guideRef = useRef(null) as RefObject<HTMLDivElement>;
  const backDropRef = useRef(null) as RefObject<HTMLDivElement>;
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"sizeTable" | "measurementMethod">(
    "sizeTable"
  );
  useEffect(() => {
    if (isGuideOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isGuideOpen]);
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (isGuideOpen && !guideRef.current?.contains(event.target as Node)) {
        setIsGuideOpen((isGuideOpen) => !isGuideOpen);
      }
    }
    backDropRef.current?.addEventListener("mousedown", handleOutsideClick);
    return () =>
      backDropRef.current?.removeEventListener("mousedown", handleOutsideClick);
  }, [guideRef, isGuideOpen, backDropRef]);
  return (
    <div>
      <button
        className="mt-2 flex flex-row gap-3 pr-1"
        onClick={() => setIsGuideOpen((isGuideOpen) => !isGuideOpen)}
      >
        <Image
          className="rotate-45"
          src="/ruler.png"
          width="24"
          height="24"
          alt="راهنمای سایز"
          quality={100}
        />
        <span className="text-sm text-blue-500 underline underline-offset-8">
          راهنمای سایز
        </span>
      </button>
      {isGuideOpen && (
        <div
          ref={backDropRef}
          className="fixed left-0 top-0 h-screen w-screen overflow-scroll bg-stone-800 bg-opacity-50"
        >
          <div
            ref={guideRef}
            className="m-auto my-6 flex w-1/2 flex-col rounded-md border border-stone-500 bg-white"
          >
            <div className="flex flex-row border-b-[1px]">
              <div className="flex w-1/2 flex-col justify-start gap-12 rounded-tr-md bg-stone-100 px-3 pt-3">
                <span className="">
                  <button
                    className="text-stone-500 hover:text-stone-700"
                    onClick={() =>
                      setIsGuideOpen((isGuideOpen) => !isGuideOpen)
                    }
                  >
                    <FontAwesomeIcon icon={faClose} style={{ fontSize: 16 }} />
                  </button>
                </span>
                <div className="flex h-fit flex-row items-center justify-center px-10">
                  <div className="flex w-full flex-col gap-2 rounded-md bg-white px-4 py-5 shadow-sm">
                    <span className="text-xl font-normal text-stone-800">
                      شلوار اسلش ۲۱۱۵۸
                    </span>
                    <hr />
                    <span className="text-sm text-stone-600">
                      مدل با قد 183 سانتی‌متر و وزن 73 کیلوگرم سایز L را پوشیده
                      است
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-1/4">
                <Image
                  src={apiBaseUrl + images[1].url}
                  height={images[1].height}
                  width={images[1].width}
                  alt={images[1].alternativeText}
                />
              </div>
              <div className="w-1/4">
                <Image
                  className="rounded-tl-md"
                  src={apiBaseUrl + images[0].url}
                  height={images[0].height}
                  width={images[0].width}
                  alt={images[0].alternativeText}
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 rounded-b-md px-4 py-8">
              <div className="flex flex-row justify-between border-b-[1px] hover:border-b-stone-500">
                <button
                  className={`w-full px-8 py-5 ${activeTab === "sizeTable" ? "border-b-[2px] border-b-stone-600" : "border-b-[2px] border-b-transparent"}`}
                  onClick={() => setActiveTab("sizeTable")}
                >
                  جدول سایز
                </button>
                <button
                  className={`w-full px-8 py-5 ${activeTab === "measurementMethod" ? "border-b-[2px] border-b-stone-600" : "border-b-[2px] border-b-transparent"}`}
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
                      <Link
                        href="#"
                        onClick={() => setActiveTab("measurementMethod")}
                        className="text-blue-600"
                      >
                        روش اندازه گیری
                      </Link>{" "}
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
                  <table className="border-collapse border text-center">
                    <thead>
                      <tr>
                        {[
                          "سایز",
                          "عرض کمر",
                          "عرض ران",
                          "طول فاق",
                          "طول شلوار",
                          " عرض دمپا",
                        ].map((item, index) => (
                          <th
                            key={index}
                            className="border bg-stone-100 px-4 py-3 text-sm font-medium"
                            scope="col"
                          >
                            {item}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {["L", "XL", "XXL", "XXXL"].map((item, index) => (
                        <tr key={index}>
                          <th className="border bg-stone-50 px-4 py-3 text-sm font-medium">
                            {item}
                          </th>
                          {["۳۷", "۳۰", "۱۰۲", "۱۴", "۳۰"].map(
                            (item, index) => (
                              <td
                                key={index}
                                className="border px-4 py-2 text-sm"
                              >
                                {item}
                              </td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === "measurementMethod" && (
                <div className="flex flex-col gap-6">
                  <p className="text-sm font-light text-stone-800">
                    لطفا طبق تصویر زیر اندازه ها را به دست آورید . سپس با مقایسه
                    اندازه های خود با{" "}
                    <Link
                      href="#"
                      onClick={() => setActiveTab("sizeTable")}
                      className="text-blue-600"
                    >
                      جدول سایز
                    </Link>{" "}
                    ارائه شده، سایز مناسب خود را انتخاب نمایید.
                  </p>
                  <div>
                    {" "}
                    <Image
                      src="/sizingGuide.jpg"
                      alt="sizing guide"
                      width={1600}
                      height={2000}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
