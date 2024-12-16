"use client";

import { useState } from "react";
import React from "react";

export default function ColorSelector({
  colors,
}: {
  colors: Array<{ name: string; colorCode: string; isAvailable: boolean }>;
}) {
  const [selectedNameColor, setSelectedNameColor] = useState("آبی روشن");

  return (
    <div className="flex flex-col gap-6 text-stone-800">
      <div className="text-sm font-light">
        رنگ انتخابی شما:
        <span className="pr-1 font-normal">{selectedNameColor}</span>
      </div>
      <div
        className="flex flex-row flex-wrap gap-3"
        onChange={(e) => {
          setSelectedNameColor((e.target as HTMLInputElement).value);
        }}
      >
        {colors.map((color, index) => {
          return color.isAvailable === true ? (
            <label
              key={index}
              htmlFor={color.colorCode}
              className="relative flex h-10 w-10 flex-row items-center justify-center rounded-full outline outline-1 outline-gray-300 hover:outline-[2px] hover:outline-stone-800 has-[:checked]:outline-[2px] has-[:checked]:outline-stone-800"
            >
              <input
                readOnly
                type="radio"
                id={color.colorCode}
                name="color"
                checked={selectedNameColor === color.name}
                value={color.name}
                style={
                  {
                    "--color-selector-bg-color": color.colorCode,
                  } as React.CSSProperties
                }
                className="flex h-9 w-9 cursor-pointer appearance-none flex-row items-center justify-center rounded-full bg-[var(--color-selector-bg-color)] before:h-full"
              />
            </label>
          ) : (
            <label
              key={index}
              htmlFor={color.colorCode}
              className="relative flex h-10 w-10 flex-row items-center justify-center rounded-full outline outline-1 outline-gray-300 hover:outline-[2px] hover:outline-stone-800 has-[:checked]:outline-[2px] has-[:checked]:outline-stone-800"
            >
              <input
                readOnly
                type="radio"
                id={color.colorCode}
                name="color"
                checked={selectedNameColor === color.name}
                value={color.name}
                style={
                  {
                    "--color-selector-bg-color": color.colorCode,
                  } as React.CSSProperties
                }
                className="flex h-9 w-9 cursor-pointer appearance-none flex-row items-center justify-center rounded-full bg-[var(--color-selector-bg-color)] before:h-full"
              />
              <div className="absolute h-full w-0.5 -rotate-45 bg-gray-400">
                {" "}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
