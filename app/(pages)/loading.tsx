"use client";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-300 border-t-stone-700" />
        <span className="text-sm text-stone-600">در حال بارگذاری...</span>
      </div>
    </div>
  );
}
