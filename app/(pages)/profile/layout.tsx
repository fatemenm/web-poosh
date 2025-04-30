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

import BreadCrumb from "@/_components/breadcrumb";
import { useAuth } from "@/_lib/context/authContext";

const breadCrumbItems = [
  {
    label: "وب پوش",
    href: "/",
  },
  { label: "پروفایل", href: "/profile" },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading, handleSignOut } = useAuth();
  const router = useRouter();
  if (loading) return <div>در حال بارگذاری...</div>;

  return (
    <div className="mx-auto mb-10 flex w-10/12 flex-col gap-10">
      <BreadCrumb items={breadCrumbItems} />
      <div className="flex">
        {/* profile navbar */}
        <div className="flex w-1/6 flex-col gap-8 bg-stone-50 py-10">
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
        {/* profile details */}
        <div className="grow bg-rose-50 px-20">{children}</div>
      </div>
    </div>
  );
}
