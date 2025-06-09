"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import classNames from "classnames";

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
}: {
  sizes: Array<{ value: string; isAvailable: boolean }>;
  selectedSize?: string;
  onSelect: (value: string) => void;
}) {
  return (
    <ToggleGroup.Root
      dir="rtl"
      type="single"
      aria-label="سایز محصول"
      className="flex flex-row flex-wrap gap-2"
      value={selectedSize}
      onValueChange={(value) => onSelect(value)}
    >
      {sizes.map((size, index) => {
        return (
          <ToggleGroup.Item
            disabled={!size.isAvailable}
            value={size.value}
            key={index}
            className={classNames(
              "relative flex w-12 flex-wrap items-center justify-center border border-stone-400 px-4 py-2 text-sm text-neutral-500 last:border-l data-[state=on]:bg-stone-800 data-[state=on]:text-stone-50",
              {
                "hover:bg-stone-800 hover:text-stone-50": size.isAvailable,
              }
            )}
          >
            {size.value}
            {!size.isAvailable && (
              <div className="absolute h-12 w-px -rotate-45 bg-neutral-400" />
            )}
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup.Root>
  );
}
