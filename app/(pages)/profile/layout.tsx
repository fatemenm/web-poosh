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

import BreadCrumb from "@/_components/breadcrumb";
import { useAuth } from "@/_lib/context/authContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading, handleSignOut } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) router.replace("/");
  }, [user, loading]);
  if (loading || !user) return <div>در حال بارگذاری...</div>;

  return (
    <div className="mx-auto flex h-screen w-10/12 flex-col gap-10">
      <BreadCrumb />
      <div className="mb-10 flex items-start">
        {/* profile navbar */}
        <div className="flex w-1/6 flex-col gap-8 bg-stone-100 py-10">
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
              className="flex gap-2 py-3 pr-6 text-stone-600 hover:bg-stone-200 hover:text-stone-700"
            >
              <FontAwesomeIcon icon={faUser} className="text-xl" />
              پروفایل
            </Link>
            <Link
              href="/profile/sizes"
              className="flex gap-2 py-3 pr-6 text-stone-600 hover:bg-stone-200 hover:text-stone-700"
            >
              <FontAwesomeIcon icon={faRuler} className="text-xl" />
              سایز‌های من
            </Link>
            <Link
              href="/profile/change-password"
              className="flex gap-2 py-3 pr-6 text-stone-600 hover:bg-stone-200 hover:text-stone-700"
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
              className="flex gap-2 py-3 pr-6 text-stone-600 hover:bg-stone-200 hover:text-stone-700"
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
        <div className="mb-10 grow px-20">{children}</div>
      </div>
    </div>
  );
}
