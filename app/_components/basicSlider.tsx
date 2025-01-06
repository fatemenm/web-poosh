"use client";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

import Slider from "@/_components/slider";
import styles from "@/_styles/basicSlider.module.css";

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
        <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: 24 }} />
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
        <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 24 }} />
      </button>
    </div>
  );
}

export default function BasicSlider({
  containerClass = "",
  sliderSetting = {},
  children,
}: {
  containerClass?: string;
  sliderSetting?: Record<string, unknown>;
  children: ReactNode;
}) {
  return (
    <Slider
      containerClass={containerClass}
      customSetting={{
        ...sliderSetting,
        slidesToShow: 5,
        nextArrow: <RightArrow />,
        prevArrow: <LeftArrow />,
      }}
    >
      {children}
    </Slider>
  );
}
