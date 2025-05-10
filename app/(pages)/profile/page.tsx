"use client";

import { useEffect } from "react";

import { useAuth } from "@/_lib/context/authContext";
import { useBreadcrumb } from "@/_lib/context/breadcrumbContext";

export default function Page() {
  const breadCrumbItems = [
    {
      label: "وب پوش",
      href: "/",
    },
    { label: "پروفایل", href: "/profile" },
  ];
  const { user } = useAuth();
  const { setItems } = useBreadcrumb();
  useEffect(() => {
    setItems(breadCrumbItems);
  }, [setItems]);
  return (
    <div className="flex flex-col gap-10">
      <p className="w-60 border-b-2 border-b-stone-700 pb-4 text-2xl">
        پروفایل
      </p>
      <div className="flex gap-64">
        <p className="flex flex-col gap-3">
          <span className="text-lg text-stone-700">نام کاربری</span>
          <span className="text-stone-600">{user?.username}</span>
        </p>
        <p className="flex flex-col gap-3">
          <span className="text-lg text-stone-700">ایمیل</span>
          <span className="text-stone-600">{user?.email}</span>
        </p>
      </div>
    </div>
  );
}
