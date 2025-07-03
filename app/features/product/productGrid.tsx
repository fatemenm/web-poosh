"use client";

import classNames from "classnames";

import ProductCard from "@/features/product/productCard";
import { ProductModel } from "@/models/product.model";

export default function ProductGrid({
  products,
  gridColumns,
  showModelImage,
}: {
  products: ProductModel[];
  gridColumns: number;
  showModelImage: boolean;
}) {
  return (
    <div
      className={classNames(
        "grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:gap-y-14",
        {
          "lg:grid-cols-5 lg:gap-x-6": gridColumns === 5,
          "lg:grid-cols-7 lg:gap-x-2": gridColumns === 7,
        }
      )}
    >
      {[...products]
        .sort((a, b) => a.data.id - b.data.id)
        .map((item, index) => (
          <div key={index}>
            <ProductCard
              product={item}
              viewOptions={{
                showModelImage: showModelImage ? true : false,
              }}
            />
          </div>
        ))}
    </div>
  );
}
