"use client";

import { apiBaseUrl } from "@config";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { ClotheProduct } from "@/lib/definitions";
import styles from "@/styles/productGallerySlider.module.css";

export default function ClotheProductGallerySlider({
  product,
}: {
  product: ClotheProduct;
}) {
  const sliderSettings = {
    customPaging: function (i: number) {
      return (
        <a>
          <img src={apiBaseUrl + product.images[i].formats.thumbnail.url} />
        </a>
      );
    },
    dots: true,
    dotsClass: styles.slickDots,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    className: styles.slickSlider,
  };
  return (
    <div className="block w-full bg-gray-100">
      <Slider {...sliderSettings}>
        {product.images.map((img) => {
          return (
            <button className="h-full w-20 focus:outline-none" key={img.id}>
              <Image
                src={apiBaseUrl + img.url}
                width={img.width}
                height={img.height}
                alt={img.alternativeText}
                quality={100}
              />
            </button>
          );
        })}
      </Slider>
    </div>
  );
}
