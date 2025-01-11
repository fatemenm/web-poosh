"use client";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import { CustomArrowProps } from "react-slick";
import { Settings } from "react-slick";

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
        <FontAwesomeIcon icon={faChevronLeft} className="text-2xl" />
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
        <FontAwesomeIcon icon={faChevronRight} className="text-2xl" />
      </button>
    </div>
  );
}

export default function BasicSlider({
  containerClass,
  setting,
  children,
}: {
  containerClass?: string;
  setting?: Settings;
  children: ReactNode;
}) {
  return (
    <Slider
      containerClass={containerClass}
      setting={{
        infinite: true,
        nextArrow: <RightArrow />,
        prevArrow: <LeftArrow />,
        ...setting,
      }}
    >
      {children}
    </Slider>
  );
}
