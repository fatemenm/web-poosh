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
    {
      label: "تغییر رمز عبور",
      href: "/change-password",
    },
  ];
  const { user } = useAuth();
  const { setItems } = useBreadcrumb();
  useEffect(() => {
    setItems(breadCrumbItems);
  }, [setItems]);
  return <div>change password</div>;
}
