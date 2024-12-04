"use client";

import { apiBaseUrl } from "@config";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { Category } from "@/lib/definitions";
import styles from "@/styles/homeSlider.module.css";

interface CustomArrowProps {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  onClick?: React.MouseEventHandler<any> | undefined;
  currentSlide?: number | undefined;
  slideCount?: number | undefined;
}

function LeftArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.customArrow} ${styles.customLeftArrow}`}
      onClick={onClick}
      style={style}
    >
      <button className="text-stone-800">
        <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: 24 }} />
      </button>
    </div>
  );
}

function RightArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.customArrow} ${styles.customRightArrow}`}
      onClick={onClick}
      style={style}
    >
      <button className="text-stone-800">
        <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 24 }} />
      </button>
    </div>
  );
}

const sliderSettings = {
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <RightArrow />,
  prevArrow: <LeftArrow />,
};

export default function CategorySlider({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="my-16 w-full px-20">
      <Slider {...sliderSettings}>
        {categories.map((item) => (
          <div
            key={item.id}
            className="flex cursor-pointer flex-col items-center outline-none"
          >
            <Image
              src={apiBaseUrl + item.image.url}
              alt={item.image.alternativeText}
              width={item.image.width}
              height={item.image.height}
              quality={100}
            />
            <div className="text-center text-stone-600 underline underline-offset-8">
              {item.name}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
