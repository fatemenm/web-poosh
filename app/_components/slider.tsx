"use client";

import { ReactNode } from "react";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function Slider({
  containerClass = "",
  customSetting,
  children,
}: {
  containerClass: string;
  customSetting: Record<string, unknown>;
  children: ReactNode;
}) {
  const baseSetting = {
    infinite: true,
    slidesToScroll: 1,
  };
  const finalSetting = { ...baseSetting, ...customSetting };
  return (
    <div className={`w-full ${containerClass}`}>
      <SlickSlider {...finalSetting}>{children}</SlickSlider>
    </div>
  );
}
