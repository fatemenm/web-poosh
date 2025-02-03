"use client";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode, useState } from "react";
import { CustomArrowProps } from "react-slick";
import { Settings } from "react-slick";

import Slider from "@/_components/slider";
import { Category, Product } from "@/_lib/definitions";
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

export default function BasicSlider<T extends Product | Category>({
  containerClass,
  setting,
  items,
  renderItem,
}: {
  containerClass?: string;
  setting?: Settings;
  items: T[];
  renderItem: (item: T, isSwiping: boolean) => ReactNode;
}) {
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  return (
    <Slider
      onSwipeChange={(value) => setIsSwiping(value)}
      containerClass={containerClass}
      setting={{
        nextArrow: <RightArrow />,
        prevArrow: <LeftArrow />,
        ...setting,
      }}
    >
      {items.map((item) => {
        return renderItem(item, isSwiping);
      })}
    </Slider>
  );
}
