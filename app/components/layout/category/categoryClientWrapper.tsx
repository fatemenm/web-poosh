"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import SubCategorySlider from "@/components/slider/subCategorySlider";
import { ProductFilterBar } from "@/features/product/productFilterBar";
import ProductGrid from "@/features/product/productGrid";
import { Category, Color, Product } from "@/lib/definitions";
import { ProductModel } from "@/models/product.model";

export type FilterType = {
  color?: string[];
  size?: string[];
  onSale?: boolean;
  subCategory?: string;
};

export default function CategoryClientWrapper({
  category,
  filters,
  colors,
  sizes,
  products,
}: {
  category: Category;
  filters: FilterType;
  colors: Color[];
  sizes: string[];
  products: Product[];
}) {
  const [gridColumns, setGridColumns] = useState<number>(5);
  const [showModelImage, setShowImageModel] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  function updateFiltersInURL(nextFilters: {
    color?: string[];
    size?: string[];
    OnSale?: boolean;
    subCategoryFilter?: string;
  }) {
    const params = new URLSearchParams();
    if (filters.color) {
      (nextFilters.color ?? filters.color).forEach((c) =>
        params.append(`color`, c)
      );
    }
    if (filters.size) {
      (nextFilters.size ?? filters.size).forEach((s) =>
        params.append(`size`, s)
      );
    }
    if (nextFilters.OnSale ?? filters.onSale) params.append("on-sale", "true");
    if (nextFilters.subCategoryFilter)
      params.append("jean", nextFilters.subCategoryFilter);
    else if (filters.subCategory) params.append("jean", filters.subCategory);
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }
  function resetFilters() {
    router.push(pathname, { scroll: false });
  }
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-lg font-normal">{category.name}</h4>
        {/* subCategory slider */}
        {category.preSetFilters.length > 0 && (
          <SubCategorySlider
            items={category.preSetFilters.map((item) => item.image)}
            onUpdateFilters={(value) =>
              updateFiltersInURL({ subCategoryFilter: value })
            }
            selectedSubCategory={filters.subCategory}
          />
        )}
      </div>
      <div className="flex flex-col gap-3">
        {/* filter section */}
        <ProductFilterBar
          filters={filters}
          sizes={sizes}
          colors={colors}
          onResetFilters={() => resetFilters()}
          onUpdateFilters={(filters: FilterType) => updateFiltersInURL(filters)}
          onChangeGridColumns={() =>
            setGridColumns((prev: number) => (prev === 5 ? 7 : 5))
          }
          onChangeProductCardImage={() =>
            setShowImageModel((prev: boolean) => !prev)
          }
        />
        {/* product grid */}
        <ProductGrid
          products={products.map((p) => new ProductModel(p))}
          showModelImage={showModelImage}
          gridColumns={gridColumns}
        />
      </div>
    </>
  );
}
