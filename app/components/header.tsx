"use client";

import {
  faBagShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import PromotionalBanner from "@/components/promotionalBanner";
import { Banner, NavbarItem, NavigationLink } from "@/lib/definitions";

import { apiBaseUrl } from "../../config";
import logo from "../../public/logo.png";

function getClassNames(item: NavbarItem, isHovered: boolean) {
  if (!isHovered)
    return "flex items-center text-stone-700 font-medium  border-b-2 border-b-transparent";
  if (item.isExpandable) {
    return "flex items-center cursor-pointer text-stone-700 font-medium border-b-2 border-b-transparent";
  } else {
    return "flex items-center cursor-pointer text-stone-700 font-medium border-b-2 border-gray-900";
  }
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
  bannerData,
  navbarItemsData,
}: {
  bannerData: Banner | undefined;
  navbarItemsData: NavbarItem[] | undefined;
}) {
  const [banner, setBanner] = useState<Banner>();
  const [navbarItems, setNavbarItems] = useState<Array<NavbarItem>>();
  const [hoveredLinkData, setHoveredLinkData] = useState<NavbarItem | null>();

  useEffect(() => {
    setNavbarItems(navbarItemsData);
    setBanner(bannerData);
  }, []);

  return (
    <header className="flex flex-col">
      {banner ? (
        <PromotionalBanner data={banner} />
      ) : (
        <div className="bg-stone-800 w-full p-2 flex flex-row justify-start text-white text-sm font-light min-h-10 box-border"></div>
      )}
      <div className="flex flex-row justify-between items-center mx-48 py-2">
        <div className="flex flex-row justify-between gap-8">
          <button>
            <FontAwesomeIcon icon={faBagShopping} style={{ fontSize: 20 }} />
          </button>
          <button>
            <FontAwesomeIcon icon={faUser} style={{ fontSize: 20 }} />
          </button>
          <button>
            <FontAwesomeIcon icon={faSearch} style={{ fontSize: 20 }} />
          </button>
        </div>
        <div className="flex flex-row gap-10 ">
          {navbarItems && (
            <nav className="flex flex-row justify-between gap-8 text-sm ">
              {navbarItems.map((item) => {
                return (
                  <Link
                    className={getClassNames(
                      item,
                      hoveredLinkData?.id === item.id
                    )}
                    key={item.id}
                    href={item.linkUrl}
                    onMouseEnter={() => setHoveredLinkData(item)}
                    onMouseLeave={() => setHoveredLinkData(null)}
                  >
                    {item.linkText}
                  </Link>
                );
              })}
            </nav>
          )}
          <div className="h-14 w-28 pt-1">
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>
        </div>
      </div>
      {hoveredLinkData?.isExpandable && (
        <div className="absolute top-24 w-screen ">
          <div
            className="bg-stone-100 flex flex-row justify-center py-5"
            onMouseEnter={() => setHoveredLinkData(hoveredLinkData)}
            onMouseLeave={() => setHoveredLinkData(null)}
          >
            <div className="flex flex-row justify-between w-2/3 px-6">
              {hoveredLinkData.image ? (
                <Image
                  src={apiBaseUrl + hoveredLinkData.image.url}
                  alt={hoveredLinkData.image?.alternativeText}
                  width={hoveredLinkData.image.width}
                  height={hoveredLinkData.image.height}
                  unoptimized
                />
              ) : (
                <div></div>
              )}
              <div className="flex flex-row-reverse gap-20">
                {createSublinkGrid(hoveredLinkData?.subLinks?.items)?.map(
                  (col, colNumber) => {
                    return (
                      <ul
                        key={colNumber}
                        className="text-right text-stone-600 font-normal text-sm flex flex-col gap-5"
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
            </div>
          </div>
          <div className="bg-stone-800 bg-opacity-50 h-screen"></div>
        </div>
      )}
    </header>
  );
}
