"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import React from "react";

export default function ColorSelector({
  colors,
  onSelect,
  selectedColor,
}: {
  colors: {
    name: string;
    colorHex: string;
    isAvailable: boolean;
  }[];
  selectedColor: string;
  onSelect: (value: string) => void;
}) {
  return (
    <ToggleGroup.Root
      className="flex flex-row-reverse flex-wrap gap-2"
      value={selectedColor}
      onValueChange={(value: string) => value && onSelect(value)}
      type="single"
      defaultValue={selectedColor}
      aria-label="رنگ محصول"
    >
      {colors.map((color, index) => {
        return (
          <ToggleGroup.Item
            value={color.name}
            key={index}
            style={{
              color: color.colorHex,
            }}
            className="relative h-10 w-10 rounded-full border-2 bg-white p-2 before:absolute before:inset-0 before:top-0 before:rounded-full before:border-2 before:border-white before:bg-current hover:border-2 hover:border-black data-[state=on]:border-2 data-[state=on]:border-black"
          />
        );
      })}
    </ToggleGroup.Root>
  );
}
