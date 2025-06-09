"use client";

import {
  faArrowRightFromBracket,
  faCircleUser,
  faLock,
  faRuler,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import BreadCrumb from "@/components/layout/breadcrumb";
import { useAuth } from "@/lib/context/authContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading, handleSignOut } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) router.replace("/login");
  }, [user, loading, router]);
  if (loading) return <div>در حال بارگذاری...</div>;
  if (!loading && !user) return;
  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4 sm:gap-10 lg:w-11/12 xl:w-10/12">
      <BreadCrumb />
      <div className="mb-10 flex flex-col gap-10 sm:flex-row sm:items-stretch sm:gap-0">
        {/* profile navbar */}
        <div className="flex w-full flex-col gap-8 bg-stone-100 px-8 py-10 sm:w-auto md:h-[540px]">
          <div className="flex flex-col items-center gap-2">
            <FontAwesomeIcon
              className="text-8xl text-stone-400"
              icon={faCircleUser}
            />
            <span>{user?.username}</span>
          </div>
          <div className="flex flex-col">
            <Link
              href="/profile"
              className="flex w-full gap-2 whitespace-nowrap py-3 text-stone-600 hover:bg-stone-200 hover:text-stone-700"
            >
              <FontAwesomeIcon icon={faUser} className="text-xl" />
              پروفایل
            </Link>
            <Link
              href="/profile/sizes"
              className="flex w-full gap-2 whitespace-nowrap py-3 text-stone-600 hover:bg-stone-200 hover:text-stone-700"
            >
              <FontAwesomeIcon icon={faRuler} className="text-xl" />
              سایز‌های من
            </Link>
            <Link
              href="/profile/change-password"
              className="flex w-full gap-2 whitespace-nowrap py-3 text-stone-600 hover:bg-stone-200 hover:text-stone-700"
            >
              <FontAwesomeIcon icon={faLock} className="text-xl" />
              تغییر رمز عبور
            </Link>
            <button
              onClick={() => {
                router.push("/", {
                  scroll: false,
                });
                handleSignOut();
              }}
              className="flex w-full gap-2 whitespace-nowrap py-3 text-stone-600 hover:bg-stone-200 hover:text-stone-700"
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="text-xl"
              />
              خروج از حساب کاربری
            </button>
          </div>
        </div>
        {/* profile content */}
        <div className="w-full grow sm:w-auto sm:px-20">{children}</div>
      </div>
    </div>
  );
}
