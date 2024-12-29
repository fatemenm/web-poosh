"use client";

import { useState } from "react";

export default function SizeSelector({
  sizes,
}: {
  sizes: Array<{ value: string; isAvailable: boolean }>;
}) {
  const [selectedSize, setSelectedSize] = useState("");
  const baseLabelStyle =
    "relative flex h-9 w-14 cursor-pointer flex-row items-center justify-center border border-x-0 border-stone-500 pt-0.5 text-sm text-stone-500 odd:border-x";
  return (
    <div
      className="flex flex-row flex-wrap items-center"
      onChange={(e) => setSelectedSize((e.target as HTMLInputElement).value)}
    >
      {sizes.map((size, index) => {
        return (
          <label
            key={index}
            htmlFor={size.value}
            className={`${baseLabelStyle} ${size.isAvailable ? "hover:bg-stone-800 hover:text-stone-50 has-[:checked]:bg-stone-800 has-[:checked]:text-stone-50" : "text-neutral-400"}`}
          >
            <input
              disabled={!size.isAvailable}
              readOnly
              type="radio"
              id={size.value}
              value={size.value}
              name="size"
              className="appearance-none"
              checked={selectedSize === size.value}
            />
            <span>{size.value}</span>
            {!size.isAvailable && (
              <div className="absolute h-12 w-px -rotate-45 bg-neutral-400">
                {" "}
              </div>
            )}
          </label>
        );
      })}
    </div>
  );
}
