"use client";

import { useState } from "react";

export default function SizeSelector({ sizes }: { sizes: string[] }) {
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div
      className="flex flex-row flex-wrap items-center"
      onChange={(e) => setSelectedSize((e.target as HTMLInputElement).value)}
    >
      {sizes.map((item, index) => {
        return (
          <label
            key={index}
            htmlFor={index.toString()}
            className="flex h-9 w-14 flex-row items-center justify-center border border-x-0 border-stone-500 pt-0.5 text-sm text-stone-500 odd:border-x hover:bg-stone-800 hover:text-stone-50 has-[:checked]:bg-stone-800 has-[:checked]:text-stone-50"
          >
            <input
              readOnly
              type="radio"
              id={index.toString()}
              value={item}
              name="size"
              className="appearance-none"
              checked={selectedSize === item}
            />
            <span>{item}</span>
          </label>
        );
      })}
    </div>
  );
}
