"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useState } from "react";

export default function SizeSelector({
  sizes,
}: {
  sizes: Array<{ value: string; isAvailable: boolean }>;
}) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  return (
    <div className="flex flex-row flex-wrap items-center">
      <ToggleGroup.Root
        value={selectedSize}
        onValueChange={(value) => setSelectedSize(value)}
        type="single"
        aria-label="سایز محصول"
        className="flex flex-row-reverse flex-wrap"
      >
        {sizes.map((size, index) => {
          return (
            <ToggleGroup.Item
              disabled={!size.isAvailable}
              value={size.value}
              key={index}
              className={`relative flex flex-row items-center justify-center border border-x-0 border-stone-400 px-5 py-2 text-sm text-neutral-500 odd:border-x data-[state=on]:bg-stone-800 data-[state=on]:text-stone-50 ${size.isAvailable ? "hover:bg-stone-800 hover:text-stone-50" : ""} `}
            >
              {size.value}
              {!size.isAvailable && (
                <div className="absolute h-12 w-px -rotate-45 bg-neutral-400" />
              )}
            </ToggleGroup.Item>
          );
        })}
      </ToggleGroup.Root>
    </div>
  );
}
