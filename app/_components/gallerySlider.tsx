"use client";

import { apiBaseUrl } from "@config";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import { Settings } from "react-slick";

import Slider from "@/_components/slider";
import { Image as ImageType } from "@/_lib/definitions";
import styles from "@/_styles/gallerySlider.module.css";

export default function GallerySlider({
  images,
  containerClass,
  setting = {},
  isExpandable = false,
}: {
  images: ImageType[];
  containerClass?: string;
  setting?: Settings;
  isExpandable: boolean;
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
    customPaging: function (i: number) {
      return (
        <a>
          <Image
            src={apiBaseUrl + images[i].formats.thumbnail.url}
            alt="thumbnail image"
            width={imgThumbnailWidth}
            height={imgThumbnailHeight}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: classNames(styles.slickDots, {
      [styles.slickDotsFullScreen]: viewMode !== "default",
    }),
    speed: 800,
    slidesToShow: 1,
    arrows: false,
    infinite: true,
    slidesToScroll: 1,
  };

  const modal = (
    <Dialog.Root
      modal={true}
      open={viewMode !== "default"}
      onOpenChange={(open) => setViewMode(open ? "expanded" : "default")}
    >
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
        key={images.map((img) => img.id).join(",")}
        containerClass={containerClass}
        setting={{ ...baseSetting, ...setting }}
        items={images}
        renderItem={(img, ctx: { isSwiping: boolean }) => {
          return (
            <Image
              key={img.id}
              onClick={(e) => {
                if (ctx.isSwiping) e.preventDefault();
                else if (isExpandable) setViewMode("expanded");
              }}
              src={apiBaseUrl + img.url}
              width={img.width}
              height={img.height}
              alt={img.alternativeText}
              quality={100}
              priority
              className="cursor-zoomIn"
            />
          );
        }}
      />
      {modal}
    </div>
  );
}
