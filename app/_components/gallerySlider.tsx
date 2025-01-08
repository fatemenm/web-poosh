"use client";

import { apiBaseUrl } from "@config";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { useState } from "react";

import Slider from "@/_components/slider";
import { Image as ImageType } from "@/_lib/definitions";
import styles from "@/_styles/gallerySlider.module.css";

export default function GallerySlider({
  images,
  isExpandable = false,
}: {
  images: ImageType[];
  isExpandable: boolean;
}) {
  const [isDialogActive, setIsDialogActive] = useState<boolean>(false);
  const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);
  const containerClass = "";
  const customSetting = {
    customPaging: function (i: number) {
      return (
        <a>
          <img src={apiBaseUrl + images[i].formats.thumbnail.url} />
        </a>
      );
    },
    dots: true,
    dotsClass: `${styles.slickDots} ${isDialogActive ? styles.slickDotsFullScreen : ""}`,
    speed: 800,
    slidesToShow: 1,
    arrows: false,
  };

  const dialog = (
    <Dialog.Root open={isDialogActive} onOpenChange={setIsDialogActive}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 flex justify-center overflow-y-auto bg-black/50">
          <Dialog.Content className="absolute flex w-full min-w-[300px] flex-col border border-stone-500 bg-white p-0">
            <VisuallyHidden.Root asChild>
              <Dialog.Title> نمایش گالری به صورت تمام صفحه</Dialog.Title>
            </VisuallyHidden.Root>
            <VisuallyHidden.Root asChild>
              <Dialog.Description>
                نمایش گالری به صورت تمام صفحه
              </Dialog.Description>
            </VisuallyHidden.Root>
            <Dialog.Close className="fixed right-2 top-3 z-10 px-2 text-slate-600 hover:text-slate-800">
              <FontAwesomeIcon icon={faClose} style={{ fontSize: 24 }} />
            </Dialog.Close>
            <div className="">
              <Slider {...{ containerClass, customSetting }}>
                {images.map((img) => {
                  return (
                    <div
                      key={img.id}
                      className={`relative w-full ${
                        isImageZoomed ? "overflow-hidden" : ""
                      } flex items-center justify-center`}
                    >
                      <Image
                        onClick={() =>
                          setIsImageZoomed((isImageZoomed) => !isImageZoomed)
                        }
                        src={apiBaseUrl + img.url}
                        width={img.width}
                        height={img.height}
                        alt={img.alternativeText}
                        quality={100}
                        priority
                        className={
                          isImageZoomed
                            ? "w-full scale-125 cursor-zoomIn"
                            : "w-full scale-100 cursor-zoomIn"
                        }
                      />
                    </div>
                  );
                })}
              </Slider>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );

  return (
    <div>
      <Slider {...{ containerClass, customSetting }}>
        {images.map((img) => {
          return (
            <div key={img.id}>
              <Image
                onClick={
                  isExpandable ? () => setIsDialogActive(true) : undefined
                }
                src={apiBaseUrl + img.url}
                width={img.width}
                height={img.height}
                alt={img.alternativeText}
                quality={100}
                priority
                className="cursor-zoomIn"
              />
            </div>
          );
        })}
      </Slider>
      {dialog}
    </div>
  );
}

// <div
//   className={isImageZoomed ? "overflow-hidden" : ""}
//   key={img.id}
// >
// </div>

// const [viewMode, setViewMode] = useState<"default" | "fullscreen">("default");
// const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);
// const containerClass =
//   viewMode === "fullscreen"
//     ? "fixed w-full top-0 left-0 h-full overflow-scroll bg-gray-100"
//     : "";

// function getImageClass(viewMode: string, isImageZoomed: boolean) {
//   if (viewMode === "fullscreen")
//     return isImageZoomed
//       ? "cursor-zoomIn w-full scale-125 object-center"
//       : "cursor-zoomIn w-full";
//   return "cursor-zoomIn";
// }
