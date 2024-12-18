"use client";

import { ReactNode } from "react";

import Slider from "@/_components/slider";

export default function BasicSlider({
  containerClass,
  sliderSetting,
  children,
}: {
  containerClass: string;
  sliderSetting: Record<string, unknown>;
  children: ReactNode;
}) {
  return (
    <Slider containerClass={containerClass} customSetting={sliderSetting}>
      {children}
    </Slider>
  );
}
