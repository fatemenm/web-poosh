export default function ProductPageSkeleton() {
  return (
    <div className="mx-auto mb-10 flex w-full animate-pulse flex-col gap-6 px-4 lg:w-11/12 lg:gap-10 xl:w-10/12">
      {/* Breadcrumb */}
      <div className="h-12 w-full rounded bg-stone-200" />
      {/* Product Details */}
      <div className="flex w-full flex-col gap-8 sm:flex-row lg:w-auto lg:gap-16 xl:justify-center">
        {/* Gallery Slider */}
        <div className="flex flex-col gap-6 lg:w-1/2 lg:flex-row-reverse lg:gap-10">
          <div className="h-[480px] w-full rounded-lg bg-stone-200" />
          <div className="flex flex-row gap-2 lg:flex-col">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 w-20 rounded-lg bg-stone-200" />
            ))}
          </div>
        </div>
        {/* Product Info */}
        <div className="flex flex-col gap-6 sm:w-1/2 sm:gap-6 sm:text-right md:w-1/3 xl:w-3/12">
          <div className="h-8 w-3/4 rounded bg-stone-200" />
          <div className="h-4 w-1/2 rounded bg-stone-200" />
          <div className="h-10 w-full rounded bg-stone-200" />
          <div className="h-4 w-1/2 rounded bg-stone-200" />
          <div className="h-6 w-3/4 rounded bg-stone-200" />
          <div className="h-12 w-full rounded bg-stone-200" />
        </div>
      </div>
      {/* Product Description */}
      <div className="my-4 flex h-80 flex-col rounded bg-stone-200 p-4 xs:p-6 md:flex-row md:items-stretch md:justify-center md:gap-8 lg:my-0 lg:p-10 xl:gap-16"></div>
      {/* Product Slider */}
      <div className="my-4 flex flex-col gap-4 px-4 lg:my-0 lg:px-0">
        <div className="flex flex-row items-center justify-between text-stone-800">
          <span className="text-sm lg:text-lg">سایر محصولات</span>
          <span className="text-xs">مشاهده همه</span>
        </div>
        <hr className="w-full bg-stone-400 lg:mb-4" />
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-64 min-w-[150px] rounded bg-stone-200 sm:w-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
