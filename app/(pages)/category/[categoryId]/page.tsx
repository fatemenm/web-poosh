import CategoryClientWrapper from "@/components/layout/category/categoryClientWrapper";
import {
  getCategoryById,
  getCategoryColors,
  getCategorySizes,
  getProducts,
} from "@/lib/data";

export default async function Page({
  params,
  searchParams,
}: {
  params: { categoryId: string };
  searchParams: { [key: string]: string | string[] };
}) {
  const filters = {
    color: Array.isArray(searchParams.color)
      ? searchParams.color
      : [searchParams.color].filter(Boolean),
    size: Array.isArray(searchParams.size)
      ? searchParams.size
      : [searchParams.size].filter(Boolean),
    onSale: searchParams["on-sale"] === "true",
    subCategory:
      (Array.isArray(searchParams.jean)
        ? searchParams.jean.shift()
        : searchParams.jean) ?? "",
  };
  const [category, colors, sizes] = await Promise.all([
    getCategoryById(params.categoryId),
    getCategoryColors(params.categoryId),
    getCategorySizes(params.categoryId),
  ]);

  const res = await getProducts({
    filters: {
      categoryId: params.categoryId,
      color: filters.color,
      size: filters.size,
      onSale: filters.onSale,
      categoryFilter: filters.subCategory,
    },
  });

  // if (!category || !products || !sizes || !colors)
  //   return <div> data is not available.</div>;
  return (
    <div className="mx-auto mb-10 flex w-full flex-col gap-8 border-t px-4 pt-4 lg:w-11/12 lg:gap-16 xl:w-10/12">
      <CategoryClientWrapper
        category={category}
        filters={filters}
        products={res.products.map((p) => p.data)}
        colors={colors}
        sizes={sizes}
      />
    </div>
  );
}
