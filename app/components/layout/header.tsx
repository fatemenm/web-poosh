"use client";

import MobileNavigationDrawer from "@/components/layout/header/MobileNavigationDrawer";
import AuthModal from "@/features/auth/authModal";
import { NavbarItem } from "@/lib/definitions";

import DesktopMainNav from "./header/DesktopMainNav";
import DesktopUserActions from "./header/DesktopUserActions";
import MobileBasket from "./header/MobileBasket";

export default function Header({ navbarItems }: { navbarItems: NavbarItem[] }) {
  return (
    <header className="sticky top-0 z-10 flex w-full flex-row items-center justify-center bg-white px-4 lg:mb-4 lg:px-0">
      <div className="flex w-full items-center justify-between bg-white lg:w-11/12 xl:w-10/12">
        <MobileNavigationDrawer navbarItems={navbarItems} />
        <DesktopMainNav navbarItems={navbarItems} />
        <DesktopUserActions />
        <MobileBasket />
      </div>
      <AuthModal />
    </header>
  );
}
