"use client";

import { useEffect } from "react";

import { useAuth } from "@/lib/context/authContext";
import { useBreadcrumb } from "@/lib/context/breadcrumbContext";

export default function Page() {
  const { user } = useAuth();
  const { setItems } = useBreadcrumb();
  useEffect(() => {
    const breadCrumbItems = [
      {
        label: "وب پوش",
        href: "/",
      },
      { label: "پروفایل", href: "/profile" },
    ];
    setItems(breadCrumbItems);
  }, [setItems]);
  return (
    <div className="flex flex-col gap-10 md:gap-10">
      <p className="border-b-2 border-b-stone-700 text-lg md:max-w-60 md:text-2xl">
        پروفایل
      </p>
      <div className="flex flex-col gap-10 md:flex-row md:gap-20 lg:gap-64">
        <p className="flex flex-col gap-3">
          <span className="w-full text-base text-stone-700 md:text-lg">
            نام کاربری
          </span>
          <span className="text-stone-600">{user?.username}</span>
        </p>
        <p className="flex flex-col gap-3">
          <span className="text-base text-stone-700 md:text-lg">ایمیل</span>
          <span className="text-stone-600">{user?.email}</span>
        </p>
      </div>
    </div>
  );
}
