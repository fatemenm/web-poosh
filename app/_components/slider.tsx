"use client";

import { ReactNode, useRef } from "react";
import SlickSlider from "react-slick";
import { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function Slider({
  containerClass,
  setting,
  children,
  onSwipeChange,
}: {
  containerClass?: string;
  setting?: Settings;
  children: ReactNode;
  onSwipeChange: (value: boolean) => void;
}) {
  const sliderRef = useRef(null);
  const finalSetting = {
    ...setting,
    swipeToSlide: true,
    beforeChange: () => {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
      onSwipeChange(true);
    },
    afterChange: () => {
      onSwipeChange(false);
    },
  };
  return (
    <div className={`w-full ${containerClass}`}>
      <SlickSlider ref={sliderRef} {...finalSetting}>
        {children}
      </SlickSlider>
    </div>
  );
}
