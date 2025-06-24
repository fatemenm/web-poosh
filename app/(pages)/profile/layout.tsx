"use client";

import { redirect, usePathname } from "next/navigation";

import BreadCrumb from "@/components/layout/breadcrumb";
import ProfileNavbar from "@/components/navigation/ProfileNavbar";
import { useAuth } from "@/lib/context/authContext";

const BREADCRUMB_FRIENDLY_NAMES: { [key: string]: string } = {
  profile: "پروفایل",
  "change-password": "تغییر رمز عبور",
  sizes: "سایزهای من",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useAuth();
  if (!user) {
    redirect("/login");
  }
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
  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4 sm:gap-10 lg:w-11/12 xl:w-10/12">
      <BreadCrumb items={breadcrumbItems} />
      <div className="mb-10 flex flex-col gap-10 sm:flex-row sm:items-stretch sm:gap-0">
        <ProfileNavbar />
        <div className="w-full grow sm:w-auto sm:px-20">{children}</div>
      </div>
    </div>
  );
}
