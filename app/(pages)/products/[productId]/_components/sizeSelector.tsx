"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import classNames from "classnames";

export default function SizeSelector({
  sizes,
  onSelect,
}: {
  sizes: Array<{ value: string; isAvailable: boolean }>;
  onSelect: (value: string) => void;
}) {
  return (
    <ToggleGroup.Root
      type="single"
      aria-label="سایز محصول"
      className="flex flex-row flex-wrap justify-end"
      onValueChange={(value) => onSelect(value)}
    >
      {sizes.map((size, index) => {
        return (
          <ToggleGroup.Item
            disabled={!size.isAvailable}
            value={size.value}
            key={index}
            className={classNames(
              "relative flex flex-row items-center justify-center border-y border-r border-stone-400 px-5 py-2 text-sm text-neutral-500 first:border-l data-[state=on]:bg-stone-800 data-[state=on]:text-stone-50",
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
