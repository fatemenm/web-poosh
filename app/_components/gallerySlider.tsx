"use client";

import { apiBaseUrl } from "@config";
import Image from "next/image";
import { useState } from "react";

import Slider from "@/_components/slider";
import { Image as ImageType } from "@/_lib/definitions";
import styles from "@/_styles/gallerySlider.module.css";

export default function GallerySlider({
  images,
  onSelect,
  viewMode,
}: {
  images: ImageType[];
  onSelect: (viewMode: string) => void;
  viewMode: "default" | "fullscreen";
}) {
  const [isImageZoomed, setIsImageZoomed] = useState<boolean>(false);
  const containerClass =
    viewMode === "fullscreen"
      ? "fixed w-full top-0 left-0 h-full overflow-scroll bg-gray-100"
      : "";
  const customSetting = {
    customPaging: function (i: number) {
      return (
        <a>
          <img src={apiBaseUrl + images[i].formats.thumbnail.url} />
        </a>
      );
    },
    dots: true,
    dotsClass: `${styles.slickDots} ${viewMode === "fullscreen" ? styles.slickDotsFullScreen : ""}`,
    speed: 800,
    slidesToShow: 1,
    arrows: false,
  };
  function getImageClass(viewMode: string, isImageZoomed: boolean) {
    if (viewMode === "fullscreen")
      return isImageZoomed
        ? "cursor-zoomIn w-full scale-125 object-center"
        : "cursor-zoomIn w-full";
    return "cursor-zoomIn";
  }

  return (
    <Slider {...{ containerClass, customSetting }}>
      {images.map((img) => {
        return (
          <div
            className={isImageZoomed ? "overflow-hidden" : ""}
            key={img.id}
            onClick={() => {
              if (viewMode === "default") onSelect("fullscreen");
              else if (viewMode === "fullscreen") {
                setIsImageZoomed((isImageZoomed) => !isImageZoomed);
              }
            }}
          >
            <Image
              src={apiBaseUrl + img.url}
              width={img.width}
              height={img.height}
              alt={img.alternativeText}
              quality={100}
              priority
              className={getImageClass(viewMode, isImageZoomed)}
            />
          </div>
        );
      })}
    </Slider>
  );
}
