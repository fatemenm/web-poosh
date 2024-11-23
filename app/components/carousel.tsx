"use client";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

import { Category } from "@/lib/definitions";

import CarouselItem from "./carouselItem";

export default function Carousel({ categories }: { categories: Category[] }) {
  const carouselRef = useRef(null);
  function handleClick(direction: "left" | "right") {
    const carousel = carouselRef.current as HTMLElement | null;
    if (!carousel) throw new Error("carousel not working");
    const firstChild = carousel.firstElementChild as HTMLElement;
    const childWidth = firstChild?.offsetWidth;
    const scrollAmount = childWidth + 24;
    carousel.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }
  return (
    <div className="w-full my-14 flex flex-row items-center ">
      <div className="min-w-16">
        <button className="pl-1" onClick={() => handleClick("left")}>
          <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: 24 }} />
        </button>
      </div>
      <div
        ref={carouselRef}
        className="flex overflow-x-auto items-center justify-start gap-6  "
      >
        {categories.map((item) => (
          <div key={item.id}>
            <CarouselItem item={item} />
          </div>
        ))}
      </div>
      <div className="min-w-16 text-right">
        <button className="pr-1" onClick={() => handleClick("right")}>
          <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 24 }} />
        </button>
      </div>
    </div>
  );
}
