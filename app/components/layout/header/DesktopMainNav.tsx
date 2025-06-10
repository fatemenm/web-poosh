import Link from "next/link";
import { useState } from "react";

import DesktopNavDropDown from "@/components/layout/header/DesktopNavDropDown";
import Overlay from "@/components/layout/header/Overlay";
import SiteLogo from "@/components/layout/header/SiteLogo";
import { NavbarItem, NavigationLink } from "@/lib/definitions";

export default function DesktopMainNav({
  navbarItems,
}: {
  navbarItems: NavbarItem[];
}) {
  const [activeNavItem, setActiveNavItem] = useState<NavbarItem | null>();
  function createSublinkGrid(items: NavigationLink[]) {
    if (!items) return null;
    const grid: Array<NavigationLink[]> = [];
    items.forEach((item) => {
      grid[item.col] ??= [];
      grid[item.col][item.row] = item;
    });
    return grid;
  }

  return (
    <>
      <div onMouseLeave={() => setActiveNavItem(null)}>
        <div className="lg:flex lg:gap-6">
          <SiteLogo />
          <nav className="hidden sm:text-xs lg:flex lg:flex-row lg:justify-between lg:text-sm">
            {navbarItems.map((item) => {
              if (item.isExpandable) {
                return (
                  <button
                    className="flex items-center border-b-2 border-b-transparent px-5 font-medium text-stone-700 hover:cursor-pointer sm:px-4 lg:px-6"
                    key={item.id}
                    onMouseEnter={() => {
                      setActiveNavItem(item);
                    }}
                  >
                    {item.linkText}
                  </button>
                );
              } else {
                return (
                  <Link
                    className="flex items-center border-b-2 border-b-transparent px-5 font-medium text-stone-700 hover:cursor-pointer hover:border-gray-900 sm:px-4"
                    key={item.id}
                    href={item.linkUrl}
                    onMouseEnter={() => {
                      setActiveNavItem(item);
                    }}
                  >
                    {item.linkText}
                  </Link>
                );
              }
            })}
          </nav>
        </div>
        {activeNavItem?.isExpandable && (
          <DesktopNavDropDown
            onClose={() => setActiveNavItem(null)}
            image={activeNavItem.image ?? null}
            content={
              createSublinkGrid(activeNavItem.subLinks?.items ?? []) ?? []
            }
          />
        )}
      </div>
      {activeNavItem?.isExpandable && <Overlay />}
    </>
  );
}
