"use client";

import { apiBaseUrl } from "@config";
import Image from "next/image";

import Slider from "@/_components/slider";
import { Image as ImageType } from "@/_lib/definitions";
import styles from "@/_styles/gallerySlider.module.css";

type styleType = {
  containerClass: string;
  itemClass: string;
  imgClass: string;
};

export default function GallerySlider({
  images,
  style,
}: {
  images: ImageType[];
  style: styleType;
}) {
  const customSetting = {
    customPaging: function (i: number) {
      return (
        <a>
          <img src={apiBaseUrl + images[i].formats.thumbnail.url} />
        </a>
      );
    },
    dots: true,
    dotsClass: styles.slickDots,
    speed: 800,
    slidesToShow: 1,
    arrows: false,
    className: styles.slickSlider,
  };
  const containerClass = style.containerClass;
  const data = { containerClass, customSetting };

  return (
    <Slider {...data}>
      {images.map((img) => {
        return (
          <div className={style.itemClass} key={img.id}>
            <Image
              src={apiBaseUrl + img.url}
              width={img.width}
              height={img.height}
              alt={img.alternativeText}
              quality={100}
              priority
              className={style.imgClass}
            />
          </div>
        );
      })}
    </Slider>
  );
}
