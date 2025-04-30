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
    <div className="grow bg-rose-50 px-20">
      <h2>Profile details</h2>
      <p>{user?.username}</p>
    </div>
  );
}
