"use client";

import { apiBaseUrl } from "@config";
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
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import ProductCard from "@/(pages)/_components/productCard";
import BasicSlider from "@/_components/basicSlider";
import {
  getCategoryById,
  getCategoryColors,
  getCategorySizes,
  getProducts,
} from "@/_lib/data";
import { Category, Color } from "@/_lib/definitions";
import { ProductModel } from "@/_models/product.model";

const sliderSetting = {
  infinite: true,
  slidesToScroll: 1,
  slidesToShow: 7,
  centerMode: true,
  centerPadding: "0px",
};

export default function Page({ params }: { params: { categoryId: string } }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<ProductModel[] | undefined>(
    undefined
  );
  const [colors, setColors] = useState<Color[] | null>(null);
  const [sizes, setSizes] = useState<string[] | null>(null);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedColors = searchParams.getAll("color");
  const selectedSizes = searchParams.getAll("size");
  const onSale = Boolean(searchParams.get("on-sale"));
  const subCategoryType = searchParams.get("jean") ?? "";
  const [showModelImage, setShowImageModel] = useState<boolean>(false);
  const [gridColumns, setGridColumns] = useState<5 | 7>(5);

  useEffect(() => {
    const getData = async () => {
      const category = await getCategoryById(params.categoryId);
      const colors = await getCategoryColors(category);
      const sizes = await getCategorySizes(category);

      setCategory(category);
      setColors(colors);
      setSizes(sizes);

      const products = await getProducts(category.name, {
        color: selectedColors,
        size: selectedSizes,
        onSale: onSale,
        categoryFilter: subCategoryType,
      });

      setProducts(products);
    };
    getData();
  }, [params.categoryId, searchParams]);

  function updateFiltersInURL({
    colors = selectedColors,
    sizes = selectedSizes,
    isOnSale = onSale,
    subCategoryFilter = subCategoryType,
  }: {
    colors?: string[];
    sizes?: string[];
    isOnSale?: boolean;
    subCategoryFilter?: string;
  }) {
    const params = new URLSearchParams();
    colors.forEach((c) => params.append(`color`, c));
    sizes.forEach((s) => params.append(`size`, s));
    if (isOnSale) params.append("on-sale", String(isOnSale));
    if (subCategoryFilter?.length) params.append("jean", subCategoryFilter);
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  if (!category || !products || !sizes || !colors)
    return <div> data is not available.</div>;

  return (
    <div className="mx-auto mb-10 flex w-10/12 flex-col gap-8">
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-lg font-normal">{category.name}</h4>
        {category.preSetFilters.length ? (
          <div className="flex w-full flex-col">
            <BasicSlider
              containerClass="px-6"
              setting={sliderSetting}
              items={category.preSetFilters.map((item) => item.image)}
              renderItem={(img, isSwiping) => (
                <Image
                  data-active={subCategoryType === img.alternativeText}
                  key={img.id}
                  className="cursor-pointer border-b-2 border-b-transparent px-2 pb-2 hover:border-b-2 hover:border-stone-700 data-[active=true]:border-b-2 data-[active=true]:border-stone-700"
                  onClick={(e) => {
                    if (isSwiping) e.preventDefault();
                    else {
                      updateFiltersInURL({
                        subCategoryFilter: img.alternativeText,
                      });
                    }
                  }}
                  alt={img.alternativeText}
                  width={img.width}
                  height={img.height}
                  src={apiBaseUrl + img.url}
                />
              )}
            />
            <hr className="mt-0 h-1 w-full" />
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <div className="flex flex-row items-center justify-between px-2">
            <div className="flex flex-row gap-6">
              <button
                className="flex flex-row items-center gap-1 text-stone-600 hover:text-stone-800"
                onClick={() => setFilterOpen((prev) => !prev)}
              >
                <FontAwesomeIcon icon={faFilter} className="text-lg" />
                فیلتر
              </button>
              {searchParams.size ? (
                <button
                  className="flex flex-row items-center gap-1 text-stone-600 hover:text-stone-800"
                  onClick={() => {
                    router.push(pathname, { scroll: false });
                  }}
                >
                  <FontAwesomeIcon
                    icon={faClose}
                    className="text-lg font-medium"
                  />
                  حذف فیلتر
                </button>
              ) : null}
            </div>
            <div className="flex flex-row items-center gap-2">
              {/* change grid columns */}
              <button
                className="text-stone-600 hover:text-stone-800"
                onClick={() => setGridColumns((prev) => (prev === 5 ? 7 : 5))}
              >
                <FontAwesomeIcon icon={faBorderAll} className="text-lg" />
              </button>
              {/* change product cart images */}
              <button
                className="text-stone-600 hover:text-stone-800"
                onClick={() => setShowImageModel((prev) => !prev)}
              >
                <FontAwesomeIcon icon={faTShirt} className="text-md" />
              </button>
            </div>
          </div>
          {/* filter section */}
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
                  value={selectedSizes}
                  onValueChange={(sizes: string[]) =>
                    updateFiltersInURL({ sizes })
                  }
                  type="multiple"
                  defaultValue={selectedSizes}
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
                  value={selectedColors}
                  onValueChange={(colors: string[]) =>
                    updateFiltersInURL({ colors })
                  }
                  type="multiple"
                  defaultValue={selectedColors}
                  aria-label="رنگ محصول"
                >
                  {colors.map((color, index) => {
                    return (
                      <ToggleGroup.Item
                        value={color.hexCode}
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
                pressed={onSale}
                onPressedChange={(isOnSale: boolean) =>
                  updateFiltersInURL({ isOnSale })
                }
                aria-label="Toggle italic"
                className="flex size-[35px] w-fit items-center justify-center rounded bg-white text-start font-normal leading-4 text-stone-500 underline decoration-stone-300 underline-offset-8 hover:text-stone-900 hover:decoration-stone-600 hover:decoration-1 data-[state=on]:text-stone-900 data-[state=on]:decoration-stone-600 data-[state=on]:decoration-1"
              >
                فقط تخفیف دار ها
              </Toggle.Root>
            </div>
          </div>
        </div>
        <div
          className={classNames("grid gap-y-14", {
            "grid-cols-5 gap-x-8": gridColumns === 5,
            "grid-cols-7 gap-x-2": gridColumns === 7,
          })}
        >
          {[...products]
            .sort((a, b) => a.data.id - b.data.id)
            .map((item, index) => (
              <div key={index}>
                <ProductCard
                  product={item}
                  hoverMode="image-hover"
                  isModelViewActive={showModelImage}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
