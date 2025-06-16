"use client";

import { usePathname } from "next/navigation";

import BreadCrumb from "./breadcrumb";

const BREADCRUMB_FRIENDLY_NAMES: { [key: string]: string } = {
  profile: "پروفایل",
  "change-password": "تغییر رمز عبور",
  sizes: "سایزهای من",
};

export default function BreadcrumbWrapper() {
  const pathname = usePathname();
  const breadcrumbItems = pathname
    .split("/")
    .filter(Boolean)
    .map((item) => {
      const label = BREADCRUMB_FRIENDLY_NAMES[item] || item;
      return {
        label: label,
        href: `/${item}`,
      };
    });
  return <BreadCrumb items={breadcrumbItems} />;
}
