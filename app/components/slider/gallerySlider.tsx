"use client";

import { apiBaseUrl } from "@config";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";

import Slider from "@/components/slider/slider";
import { Image as ImageType } from "@/lib/definitions";
import styles from "@/styles/gallerySlider.module.css";

export default function GallerySlider({
  images,
  containerClass,
  setting = {},
  isExpandable = false,
  dotsClassName = styles.slickDots,
}: {
  images: ImageType[];
  containerClass?: string;
  setting?: Record<string, unknown>;
  isExpandable: boolean;
  dotsClassName?: string;
}) {
  const [viewMode, setViewMode] = useState<"default" | "expanded" | "zoomed">(
    "default"
  );

  if (!images || images.length === 0) {
    console.error("GallerySlider requires a non-empty images array.");
    return null;
  }
  const { width: imgThumbnailWidth, height: imgThumbnailHeight } =
    images[0].formats.thumbnail;
  const baseSetting = {
    customPaging: (i: number) => {
      return images[i] ? (
        <a>
          <Image
            src={apiBaseUrl + images[i]?.formats.thumbnail.url}
            alt="thumbnail image"
            width={imgThumbnailWidth}
            height={imgThumbnailHeight}
          />
        </a>
      ) : (
        <></>
      );
    },
    dots: true,
    dotsClass: classNames(dotsClassName, {
      [styles.slickDotsFullScreen]: viewMode !== "default",
    }),
    speed: 800,
    slidesToShow: 1,
    arrows: false,
    infinite: true,
    adaptiveHeight: true,
    slidesToScroll: 1,
  };

  const modal = (
    <Dialog.Root
      modal={true}
      open={viewMode !== "default"}
      onOpenChange={(open) => setViewMode(open ? "expanded" : "default")}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 flex justify-center overflow-y-auto bg-black/50">
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
              <FontAwesomeIcon icon={faClose} className="text-2xl" />
            </Dialog.Close>
            <div className="">
              <Slider
                containerClass={containerClass}
                setting={{ ...baseSetting, ...setting }}
                items={images}
                renderItem={(img, ctx: { isSwiping: boolean }) => {
                  return (
                    <div
                      key={img.id}
                      className={classNames(
                        "relative flex w-full items-center justify-center",
                        {
                          "overflow-hidden": viewMode === "zoomed",
                        }
                      )}
                    >
                      <Image
                        onClick={(e) => {
                          if (ctx.isSwiping) e.preventDefault();
                          else if (viewMode === "expanded")
                            setViewMode("zoomed");
                          else setViewMode("expanded");
                        }}
                        src={apiBaseUrl + img.url}
                        width={img.width}
                        height={img.height}
                        alt={img.alternativeText}
                        quality={100}
                        priority
                        className={classNames("w-full cursor-zoomIn", {
                          "scale-125": viewMode === "zoomed",
                          "scale-100": viewMode !== "zoomed",
                        })}
                      />
                    </div>
                  );
                }}
              />
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );

  return (
    <div>
      <Slider
        containerClass={containerClass}
        setting={{
          ...baseSetting,
          ...setting,
        }}
        items={images}
        renderItem={(img, ctx: { isSwiping: boolean }) => {
          return (
            <Image
              key={img.id}
              onClick={(e) => {
                if (!isExpandable || ctx.isSwiping) e.preventDefault();
                else setViewMode("expanded");
              }}
              src={apiBaseUrl + img.url}
              width={img.width}
              height={img.height}
              alt={img.alternativeText}
              quality={100}
              priority
              className={classNames("h-auto w-full object-cover", {
                "cursor-zoomIn": isExpandable,
              })}
            />
          );
        }}
      />
      {modal}
    </div>
  );
}
