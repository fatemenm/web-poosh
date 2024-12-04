"use client";

import { useState } from "react";
import React from "react";

export default function ColorPicker({
  colors,
}: {
  colors: Array<{ name: string; colorCode: string }>;
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
          return (
            <input
              readOnly
              type="radio"
              key={index}
              id={color.name}
              name="color"
              checked={selectedNameColor === color.name}
              value={color.name}
              style={
                {
                  "--radio-button-before-bg-color": color.colorCode,
                } as React.CSSProperties
              }
              className="flex h-9 w-9 appearance-none flex-row items-center justify-center rounded-full bg-white p-[3px] outline outline-1 outline-gray-300 before:block before:h-full before:w-full before:rounded-full before:bg-[var(--radio-button-before-bg-color)] before:content-[''] checked:outline-2 checked:outline-stone-800 hover:outline-2 hover:outline-stone-800"
            />
          );
        })}
      </div>
    </div>
  );
}
