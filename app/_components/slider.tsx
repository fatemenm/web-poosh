"use client";

import { ReactNode } from "react";
import SlickSlider from "react-slick";
import { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function Slider({
  containerClass,
  setting,
  children,
}: {
  containerClass?: string;
  setting?: Settings;
  children: ReactNode;
}) {
  return (
    <div className={`w-full ${containerClass}`}>
      <SlickSlider {...setting}>{children}</SlickSlider>
    </div>
  );
}
