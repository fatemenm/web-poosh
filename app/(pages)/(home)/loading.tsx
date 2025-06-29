export default function HomePageSkeleton() {
  return (
    <div className="mb-16 flex w-full animate-pulse flex-col gap-8 px-4 lg:w-11/12 lg:px-0 xl:w-10/12">
      {/* Hero Banner Skeleton */}
      <div className="mb-8 flex flex-col gap-10 lg:flex-row lg:gap-[2vw]">
        <div className="flex flex-col items-center gap-6 lg:w-1/2">
          <div className="h-80 w-full rounded-lg bg-stone-200 lg:h-[500px]" />
          <div className="h-4 w-2/3 rounded bg-stone-200" />
          <div className="h-4 w-1/3 rounded bg-stone-200" />
        </div>
        <div className="flex flex-col items-center gap-6 lg:w-1/2">
          <div className="h-80 w-full rounded-lg bg-stone-200 lg:h-[500px]" />
          <div className="h-4 w-2/3 rounded bg-stone-200" />
          <div className="h-4 w-1/3 rounded bg-stone-200" />
        </div>
      </div>
      {/* Category Slider Skeleton */}
      <div className="mb-8 flex w-full flex-row gap-4 overflow-x-auto">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-48 w-1/2 min-w-[150px] rounded bg-stone-200 sm:w-full"
          />
        ))}
      </div>
      {/* Banner Grid Skeleton */}
      <div className="my-4 flex flex-col gap-4 px-4 md:my-0 md:px-0">
        <div className="flex flex-col items-center justify-between text-stone-800 md:flex-row">
          <span className="md:text-md text-sm">محصولات محبوب</span>
        </div>
        <hr className="w-full bg-stone-400 md:mb-4" />
        <div className="flex flex-col gap-10 md:flex-row md:gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex w-full flex-col items-center gap-4 md:w-1/3"
            >
              <div className="h-64 w-2/3 rounded bg-stone-200 sm:w-full md:h-96" />
              <div className="h-4 w-2/3 rounded bg-stone-200" />
              <div className="h-4 w-1/2 rounded bg-stone-200" />
            </div>
          ))}
        </div>
      </div>

      {/* Products Slider Skeleton */}
      <div className="my-4 flex flex-col gap-4 px-4 lg:my-0 lg:px-0">
        <div className="flex flex-row items-center justify-between text-stone-800">
          <span className="text-sm lg:text-lg">محصولات جدید</span>
          <span className="text-xs">مشاهده همه</span>
        </div>
        <hr className="w-full bg-stone-400 lg:mb-4" />
        <div className="flex gap-4 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-4 lg:w-1/5">
              <div className="h-64 w-1/2 min-w-[150px] rounded bg-stone-200" />
              <div className="h-4 w-2/3 rounded bg-stone-200" />
              <div className="h-4 w-2/3 rounded bg-stone-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
