"use client";

import { apiBaseUrl, nextServerUrl } from "@config";
import {
  faBagShopping,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import PromoBanner from "@/_components/promoBanner";
import { getProducts } from "@/_lib/data";
import {
  NavbarItem,
  NavigationLink,
  PromoBanner as PromoBannerType,
} from "@/_lib/definitions";
import { ProductModel } from "@/_models/product.model";

import logo from "@public/logo.png";

import SearchBar from "./searchBar";

function getClassNames(item: NavbarItem, isHovered: boolean) {
  const baseClasses =
    "flex items-center text-stone-700 font-medium border-b-2 px-5";
  let situationalClasses = "";
  if (isHovered && item.isExpandable)
    situationalClasses = "cursor-pointer border-b-transparent";
  else if (isHovered && !item.isExpandable)
    situationalClasses = "cursor-pointer border-gray-900";
  else situationalClasses = "border-b-transparent";
  return baseClasses + " " + situationalClasses;
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
  const [isRightNavExpanded, setIsRightNavExpanded] = useState<boolean>(false);
  const [navbarItem, setNavbarItem] = useState<string>();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await getProducts({
        search: { name: searchQuery },
        pagination: {
          page: 1,
          pageSize: 5,
        },
      });
      setProducts(res.products);
    };
    if (searchQuery && isSearchBarOpen) getData();
    return () => setProducts([]);
  }, [searchQuery, isSearchBarOpen]);

  return (
    <header className="flex shrink-0 flex-col items-center">
      {promoBanner ? (
        <PromoBanner data={promoBanner} />
      ) : (
        <div className="box-border flex min-h-10 w-full flex-row justify-start bg-stone-800 p-2 text-sm font-light text-white"></div>
      )}
      <div className="flex w-10/12 flex-row justify-between py-2">
        {/* right navbar */}
        <div className="flex flex-row gap-10">
          <div className="h-14 w-28 pt-1">
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>
          {navbarItems && (
            <nav className="flex flex-row justify-between text-sm">
              {navbarItems.map((item) => {
                return (
                  <Link
                    className={getClassNames(
                      item,
                      hoveredNavbarItem?.id === item.id
                    )}
                    key={item.id}
                    href={item.linkUrl}
                    onMouseEnter={() => {
                      setHoveredNavbarItem(item);
                      setIsRightNavExpanded(true);
                    }}
                    onMouseLeave={() => {
                      setHoveredNavbarItem(null);
                      setIsRightNavExpanded(false);
                    }}
                  >
                    {item.linkText}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
        {/* left navbar */}
        <div className="flex w-1/4 items-center justify-end">
          <SearchBar
            isOpen={isSearchBarOpen}
            searchQuery={searchQuery}
            onChangeOpen={setIsSearchBarOpen}
            onChangeSearchQuery={setSearchQuery}
            items={products}
          />
          <NavigationMenu.Root
            dir="rtl"
            className="relative flex items-stretch justify-end [&>div]:w-full"
            value={navbarItem}
            onValueChange={(value) => setNavbarItem(value)}
          >
            <NavigationMenu.List className="flex h-full w-full flex-row items-stretch justify-end">
              <NavigationMenu.Item value="user">
                <NavigationMenu.Trigger className="h-full px-4">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-xl text-stone-600 hover:text-stone-800"
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute left-0 top-12 z-10 w-[21vw] bg-white p-4">
                  <div className="flex flex-col gap-6">
                    <button className="flex gap-6">
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        className="text-xl text-stone-600 hover:text-stone-800"
                      />
                      ثبت نام / ورود
                    </button>
                  </div>
                  <NavigationMenu.Link />
                </NavigationMenu.Content>
              </NavigationMenu.Item>
              <NavigationMenu.Item value="basket">
                <NavigationMenu.Trigger className="h-full px-4">
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="text-xl text-stone-600 hover:text-stone-800"
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute left-0 top-12 z-10 w-[21vw] bg-white p-4">
                  <div className="flex flex-col gap-10">
                    <span className="text-lg">سبد خرید</span>
                    <Link
                      href={nextServerUrl + "/basket"}
                      className={
                        "w-full bg-green-700 py-2 text-center text-sm text-white hover:bg-green-800"
                      }
                    >
                      جزییات سبد خرید
                    </Link>
                    <div className="flex flex-col gap-6 text-center font-extralight">
                      <hr />
                      <p>سبد خرید شما خالیست</p>
                      <hr />
                    </div>
                  </div>
                  <NavigationMenu.Link />
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>
      </div>
      {hoveredNavbarItem?.isExpandable && isRightNavExpanded && (
        <div className="absolute top-24 z-10 w-screen">
          <div
            className="flex flex-row justify-center bg-stone-100 py-5"
            onMouseEnter={() => {
              setHoveredNavbarItem(hoveredNavbarItem);
              setIsRightNavExpanded(true);
            }}
            onMouseLeave={() => {
              setHoveredNavbarItem(null);
              setIsRightNavExpanded(false);
            }}
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
                              <Link href={nextServerUrl + item.url}>
                                {item.name}
                              </Link>
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
          <div className="h-screen bg-stone-800 bg-opacity-50" />
        </div>
      )}
      {(navbarItem === "user" || navbarItem === "basket") && (
        <div className="absolute left-0 top-28 h-full w-screen bg-stone-800 bg-opacity-50" />
      )}
    </header>
  );
}
