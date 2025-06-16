"use client";

import { nextServerUrl } from "@config";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import MobileNavigationDrawer from "@/components/layout/header/MobileNavigationDrawer";
import AuthModal from "@/features/auth/authModal";
import { NavbarItem } from "@/lib/definitions";

import DesktopMainNav from "./header/DesktopMainNav";
import DesktopUserActions from "./header/DesktopUserActions";

export default function Header({ navbarItems }: { navbarItems: NavbarItem[] }) {
  return (
    <header className="sticky top-0 z-10 flex w-full flex-row items-center justify-center bg-white px-4 lg:mb-4 lg:px-0">
      <div className="flex w-full items-center justify-between bg-white lg:w-11/12 xl:w-10/12">
        <MobileNavigationDrawer navbarItems={navbarItems} />
        <DesktopMainNav navbarItems={navbarItems} />
        <DesktopUserActions />
        {/* Mobile - Basket Link */}
        <Link className="lg:hidden" href={nextServerUrl + "/basket"}>
          <FontAwesomeIcon
            icon={faBagShopping}
            className="text-xl text-stone-600 hover:text-stone-800"
          />
        </Link>
      </div>
      <AuthModal />
    </header>
  );
}
