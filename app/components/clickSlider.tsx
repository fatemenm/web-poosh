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
import styles from "@/styles/slider.module.css";

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
      <button className=" text-stone-800 ">
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
      <button className=" text-stone-800 ">
        <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 24 }} />
      </button>
    </div>
  );
}

const settings = {
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <RightArrow />,
  prevArrow: <LeftArrow />,
};

export default function ClickSlider({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="w-full px-20 mx-auto my-16 ">
      <Slider {...settings}>
        {categories.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center mx-4 cursor-pointer outline-none "
          >
            <Image
              src={apiBaseUrl + item.image.url}
              alt={item.image.alternativeText}
              width={item.image.width}
              height={item.image.height}
              quality={100}
            />
            <div className="underline underline-offset-8 text-center text-stone-600">
              {item.name}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
