"use client";

import { apiBaseUrl } from "@config";
import {
  faBagShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import PromoBanner from "@/_components/promoBanner";
import {
  NavbarItem,
  NavigationLink,
  PromoBanner as PromoBannerType,
} from "@/_lib/definitions";

import logo from "@public/logo.png";

function getClassNames(item: NavbarItem, isHovered: boolean) {
  const baseClasses =
    "flex items-center text-stone-700 font-medium border-b-2 ";
  let situationalClasses = "";
  if (isHovered && item.isExpandable)
    situationalClasses = "cursor-pointer border-b-transparent";
  else if (isHovered && !item.isExpandable)
    situationalClasses = "cursor-pointer border-gray-900";
  else situationalClasses = "border-b-transparent";
  return baseClasses + situationalClasses;
}

function createSublinkGrid(items: NavigationLink[] | undefined) {
  if (!items) return null;
  const grid: Array<NavigationLink[]> = [];
  items.forEach((item) => {
    grid[item.col] ??= [];
    grid[item.col][item.row] = item;
  });
  return grid;
}

export default function Header({
  promoBanner,
  navbarItems,
}: {
  promoBanner: PromoBannerType | undefined;
  navbarItems: NavbarItem[] | undefined;
}) {
  const [hoveredNavbarItem, setHoveredNavbarItem] =
    useState<NavbarItem | null>();

  return (
    <header className="flex shrink-0 flex-col items-center">
      {promoBanner ? (
        <PromoBanner data={promoBanner} />
      ) : (
        <div className="box-border flex min-h-10 w-full flex-row justify-start bg-stone-800 p-2 text-sm font-light text-white"></div>
      )}
      <div className="flex w-10/12 flex-row items-center justify-between py-2">
        <div className="flex flex-row gap-10">
          <div className="h-14 w-28 pt-1">
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>
          {navbarItems && (
            <nav className="flex flex-row justify-between gap-8 text-sm">
              {navbarItems.map((item) => {
                return (
                  <Link
                    className={getClassNames(
                      item,
                      hoveredNavbarItem?.id === item.id
                    )}
                    key={item.id}
                    href={item.linkUrl}
                    onMouseEnter={() => setHoveredNavbarItem(item)}
                    onMouseLeave={() => setHoveredNavbarItem(null)}
                  >
                    {item.linkText}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
        <div className="flex flex-row justify-between gap-8">
          <button>
            <FontAwesomeIcon icon={faSearch} className="text-xl" />
          </button>

          <button>
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </button>
          <button>
            <FontAwesomeIcon icon={faBagShopping} className="text-xl" />
          </button>
        </div>
      </div>
      {hoveredNavbarItem?.isExpandable && (
        <div className="absolute top-24 z-10 w-screen">
          <div
            className="flex flex-row justify-center bg-stone-100 py-5"
            onMouseEnter={() => setHoveredNavbarItem(hoveredNavbarItem)}
            onMouseLeave={() => setHoveredNavbarItem(null)}
          >
            <div className="flex w-2/3 flex-row justify-between px-6">
              <div className="flex flex-row gap-20">
                {createSublinkGrid(hoveredNavbarItem?.subLinks?.items)?.map(
                  (col, colNumber) => {
                    return (
                      <ul
                        key={colNumber}
                        className="flex flex-col gap-5 text-right text-sm font-normal text-stone-600"
                      >
                        {col.map((item, rowNumber) => {
                          return (
                            <li key={rowNumber}>
                              <a href={item.linkUrl}>{item.linkText}</a>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }
                )}
              </div>
              {hoveredNavbarItem.image ? (
                <Image
                  src={apiBaseUrl + hoveredNavbarItem.image.url}
                  alt={hoveredNavbarItem.image?.alternativeText}
                  width={hoveredNavbarItem.image.width}
                  height={hoveredNavbarItem.image.height}
                  unoptimized
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="h-screen bg-stone-800 bg-opacity-50"></div>
        </div>
      )}
    </header>
  );
}
