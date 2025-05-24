"use client";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import { CustomArrowProps } from "react-slick";

import Slider from "@/_components/slider";
import styles from "@/_styles/basicSlider.module.css";

function LeftArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.slickPrev}`}
      style={style}
      onClick={onClick}
    >
      <button
        className={
          className?.includes("slick-disabled")
            ? "text-stone-400"
            : "text-stone-800"
        }
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-base sm:text-lg lg:text-xl"
        />
      </button>
    </div>
  );
}
function RightArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.slickNext}`}
      style={style}
      onClick={onClick}
    >
      <button
        className={
          className?.includes("slick-disabled")
            ? "text-stone-400"
            : "text-stone-800"
        }
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className="text-base sm:text-lg lg:text-xl"
        />
      </button>
    </div>
  );
}

export default function BasicSlider<T>({
  containerClass,
  setting,
  items,
  renderItem,
}: {
  containerClass?: string;
  setting?: Record<string, unknown>;
  items: T[];
  renderItem: (item: T, ctx: { isSwiping: boolean }) => ReactNode;
}) {
  return (
    <Slider
      renderItem={renderItem}
      items={items}
      containerClass={containerClass}
      setting={{
        nextArrow: <RightArrow />,
        prevArrow: <LeftArrow />,
        initialSlide: Math.floor(items.length / 2),
        responsive: [
          {
            breakpoint: 2560,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
              infinite: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
        ...setting,
      }}
    />
  );
}
