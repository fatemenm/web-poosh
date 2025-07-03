"use client";

import {
  faBorderAll,
  faClose,
  faFilter,
  faTShirt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Toggle from "@radix-ui/react-toggle";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import classNames from "classnames";
import { useState } from "react";

import { FilterType } from "@/components/layout/category/categoryClientWrapper";
import { Color } from "@/lib/definitions";

export function ProductFilterBar({
  filters,
  colors,
  sizes,
  onUpdateFilters,
  onResetFilters,
  onChangeGridColumns,
  onChangeProductCardImage,
}: {
  filters: FilterType;
  colors: Color[];
  sizes: string[];
  onUpdateFilters: (value: FilterType) => void;
  onResetFilters: () => void;
  onChangeGridColumns: () => void;
  onChangeProductCardImage: () => void;
}) {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  console.log(filters);

  const hasActiveFilters = Object.keys(filters).some((key) => {
    const value = filters[key];
    if (Array.isArray(value)) return value.length > 0;
    return value && value !== "";
  });
  return (
    <div>
      {/* collapsed filter */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-6">
          <button
            className="flex flex-row items-center gap-1 text-stone-600 hover:text-stone-800"
            onClick={() => setFilterOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faFilter} className="text-lg" />
            فیلتر
          </button>
          {/* TODO: check it */}
          {hasActiveFilters ? (
            <button
              className="flex flex-row items-center gap-1 text-stone-600 hover:text-stone-800"
              onClick={onResetFilters}
            >
              <FontAwesomeIcon icon={faClose} className="text-lg font-medium" />
              حذف فیلتر
            </button>
          ) : null}
        </div>
        <div className="flex flex-row items-center gap-2">
          {/* change grid columns */}
          <button
            className="hidden text-stone-600 hover:text-stone-800 lg:inline"
            onClick={onChangeGridColumns}
          >
            <FontAwesomeIcon icon={faBorderAll} className="text-lg" />
          </button>
          {/* change product cart images */}
          <button
            className="text-stone-600 hover:text-stone-800"
            onClick={onChangeProductCardImage}
          >
            <FontAwesomeIcon icon={faTShirt} className="text-md" />
          </button>
        </div>
      </div>
      {/* expanded filter */}
      <div
        className={classNames(
          "flex flex-col gap-8 overflow-hidden pr-9 text-xs font-medium text-stone-800 transition-[max-height] duration-500",
          {
            "max-h-0": !filterOpen,
            "max-h-[500px]": filterOpen,
          }
        )}
      >
        <div className="flex flex-col gap-4 pt-6">
          سایز
          <div className="flex flex-row items-center gap-2">
            <ToggleGroup.Root
              className="flex flex-row-reverse flex-wrap gap-2"
              value={filters.size}
              onValueChange={(sizes: string[]) =>
                onUpdateFilters({ size: sizes })
              }
              type="multiple"
              defaultValue={filters.size}
              aria-label="سایز محصول"
            >
              {sizes.map((size, index) => {
                return (
                  <ToggleGroup.Item
                    value={size}
                    key={index}
                    className="px-1 text-sm font-normal text-stone-500 underline decoration-stone-400 underline-offset-8 hover:text-stone-800 hover:decoration-stone-600 hover:decoration-2 data-[state=on]:text-stone-800 data-[state=on]:decoration-stone-600 data-[state=on]:decoration-2"
                  >
                    {size}
                  </ToggleGroup.Item>
                );
              })}
            </ToggleGroup.Root>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          رنگ
          <div className="flex flex-row items-center gap-4">
            <ToggleGroup.Root
              className="flex flex-row-reverse flex-wrap gap-2"
              value={filters.color}
              onValueChange={(colors: string[]) =>
                onUpdateFilters({ color: colors })
              }
              type="multiple"
              defaultValue={filters.color}
              aria-label="رنگ محصول"
            >
              {colors.map((color, index) => {
                return (
                  <ToggleGroup.Item
                    value={color.name}
                    key={index}
                    style={{
                      color: color.hexCode,
                    }}
                    className="relative h-6 w-6 rounded-full border bg-white p-2 before:absolute before:inset-0 before:top-0 before:rounded-full before:border before:border-white before:bg-current hover:border hover:border-black data-[state=on]:border data-[state=on]:border-black"
                  />
                );
              })}
            </ToggleGroup.Root>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-4 pb-6">
          نمایش
          <Toggle.Root
            pressed={filters.onSale}
            onPressedChange={(onSale: boolean) => {
              //   console.log("click");
              //   TODO: how are you handling this component? controlled, uncontrolled, where should be the state?
              console.log(onSale);
              onUpdateFilters({ onSale: !onSale });
            }}
            aria-label="Toggle italic"
            className="flex size-[35px] w-fit items-center justify-center rounded bg-white text-start font-normal leading-4 text-stone-500 underline decoration-stone-300 underline-offset-8 hover:text-stone-900 hover:decoration-stone-600 hover:decoration-1 data-[state=on]:text-stone-900 data-[state=on]:decoration-stone-600 data-[state=on]:decoration-1"
          >
            فقط تخفیف دار ها
          </Toggle.Root>
        </div>
      </div>
    </div>
  );
}
