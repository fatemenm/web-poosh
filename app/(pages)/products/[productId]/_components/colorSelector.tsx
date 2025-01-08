"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useState } from "react";
import React from "react";

const defaultColor = "آبی روشن";
export default function ColorSelector({
  colors,
}: {
  colors: Array<{ name: string; colorCode: string; isAvailable: boolean }>;
}) {
  const [selectedColor, setSelectedColor] = useState<string>(defaultColor);

  return (
    <div className="flex flex-col gap-6 text-stone-800">
      <div className="text-sm font-light">
        رنگ انتخابی شما:
        <span className="pr-1 font-normal">{selectedColor}</span>
      </div>
      <ToggleGroup.Root
        className="flex flex-row-reverse flex-wrap gap-3"
        onValueChange={(value) => setSelectedColor(value)}
        type="single"
        defaultValue={defaultColor}
        aria-label="رنگ محصول"
      >
        {colors.map((color, index) => {
          return (
            <ToggleGroup.Item
              value={color.name}
              key={index}
              className="relative rounded-full border-[2px] bg-white p-[3px] hover:border-black data-[state=on]:border-black"
            >
              <div
                style={{ backgroundColor: color.colorCode }}
                className="h-8 w-8 rounded-full"
              />
              {!color.isAvailable && (
                <div className="absolute left-[18px] top-0 h-10 w-0.5 -rotate-45 bg-stone-400" />
              )}
            </ToggleGroup.Item>
          );
        })}
      </ToggleGroup.Root>
    </div>
  );
}
