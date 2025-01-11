"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import React from "react";

export default function ColorSelector({
  colors,
  onSelect,
  defaultColor,
}: {
  colors: Array<{
    name: string;
    colorCode: string;
    isAvailable: boolean;
  }>;
  onSelect: (value: string) => void;
  defaultColor: string;
}) {
  return (
    <ToggleGroup.Root
      className="flex flex-row-reverse flex-wrap gap-3"
      onValueChange={(value) => onSelect(value)}
      type="single"
      defaultValue={defaultColor}
      aria-label="رنگ محصول"
    >
      {colors.map((color, index) => {
        return (
          <ToggleGroup.Item
            value={color.name}
            key={index}
            style={{
              color: color.colorCode,
            }}
            className="relative h-10 w-10 rounded-full border-2 bg-white p-2 before:absolute before:inset-0 before:top-0 before:rounded-full before:border-2 before:border-white before:bg-current hover:border-2 hover:border-black data-[state=on]:border-2 data-[state=on]:border-black"
          >
            {!color.isAvailable && (
              <div className="absolute left-[16px] top-0 h-[38px] w-0.5 -rotate-45 bg-stone-400" />
            )}
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup.Root>
  );
}
