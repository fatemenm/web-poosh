"use client";

import { ReactNode, useState } from "react";
import SlickSlider from "react-slick";
import { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

type ctxType = {
  isSwiping: boolean;
};

export default function Slider<T>({
  containerClass,
  setting,
  items,
  renderItem,
}: {
  containerClass?: string;
  setting?: Record<string, unknown>;
  items: T[];
  renderItem: (item: T, ctx: ctxType) => ReactNode;
}) {
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const slickSliderSetting: Settings = {
    ...setting,
    swipeToSlide: true,
    beforeChange: () => {
      setIsSwiping(true);
    },
    afterChange: () => {
      setIsSwiping(false);
    },
  };

  return (
    <div className={`w-full ${containerClass}`}>
      <SlickSlider {...slickSliderSetting}>
        {items.map((item) => {
          return renderItem(item, { isSwiping });
        })}
      </SlickSlider>
    </div>
  );
}
