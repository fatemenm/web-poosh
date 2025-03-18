"use client";

import { apiBaseUrl, nextServerUrl } from "@config";
import {
  faBagShopping,
  faChevronLeft,
  faClose,
  faList,
  faSearch,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import PromoBanner from "@/_components/promoBanner";
import { getProducts } from "@/_lib/data";
import {
  NavbarItem,
  NavigationLink,
  PromoBanner as PromoBannerType,
} from "@/_lib/definitions";
import { ProductModel } from "@/_models/product.model";

import logo from "@public/logo.png";

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
  const searchInputRef = useRef(null);

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

  function renderSearchBar() {
    return (
      <div className="relative flex items-center justify-end pl-4">
        <button
          className={`absolute left-4 top-2 w-fit ${isSearchBarOpen ? "right-4 top-2 cursor-default text-stone-500" : "text-stone-600 hover:text-stone-800"}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={
            isSearchBarOpen
              ? undefined
              : () => {
                  setIsSearchBarOpen(true);
                  if (searchInputRef && searchInputRef.current) {
                    const element = searchInputRef.current as HTMLInputElement;
                    element.focus();
                  }
                }
          }
        >
          <FontAwesomeIcon icon={faSearch} className="text-xl" />
        </button>
        <input
          ref={searchInputRef}
          value={searchQuery}
          onFocus={() => setIsSearchBarOpen(true)}
          onBlur={() => {
            setIsSearchBarOpen(false);
            setSearchQuery("");
          }}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          placeholder="جستجو..."
          className={`rounded-sm bg-white py-2 placeholder:text-sm placeholder:text-stone-500 ${isSearchBarOpen ? "block w-full border border-stone-300 pl-9 pr-11 focus:outline-none" : "w-0 p-0"}`}
        />
        {isSearchBarOpen && (
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setSearchQuery("");
              if (searchInputRef && searchInputRef.current) {
                const element = searchInputRef.current as HTMLInputElement;
                element.focus();
              }
            }}
            className="absolute left-7 top-3 w-fit"
          >
            <FontAwesomeIcon
              icon={faClose}
              className="text-lg text-stone-500 hover:text-stone-800"
            />
          </button>
        )}
        {isSearchBarOpen && products?.length > 0 && (
          <div className="absolute left-4 top-12 z-20 flex w-[21vw] flex-col gap-5 rounded-sm border bg-white p-6">
            <p className="flex items-center gap-3 text-stone-600">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-md hover:text-stone-800"
              />
              <span className="pt-1 text-sm font-medium"> لیست محصولات</span>
            </p>
            <div className="flex flex-col gap-2">
              {products.map((p) => {
                const img = p.data.imagesByColor[0].images[0];
                return (
                  <Link
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setIsSearchBarOpen(false);
                      setSearchQuery("");
                    }}
                    href={nextServerUrl + "/products/" + p.data.documentId}
                    className="flex items-center gap-3 text-stone-600 hover:text-stone-900"
                    key={p.data.documentId}
                  >
                    <div className="w-12">
                      <Image
                        width={img.width}
                        height={img.height}
                        alt={img.alternativeText}
                        src={apiBaseUrl + img.url}
                      />
                    </div>
                    <span className="text-sm">{p.data.name}</span>
                  </Link>
                );
              })}
            </div>
            <p className="flex items-center gap-3 text-stone-600 hover:text-stone-900">
              <FontAwesomeIcon icon={faList} className="text-md" />
              <Link
                onClick={() => {
                  setIsSearchBarOpen(false);
                  setSearchQuery("");
                }}
                onMouseDown={(e) => e.preventDefault()}
                href={`${nextServerUrl}/search-result?search=${encodeURIComponent(searchQuery)}`}
                className="text-sm font-medium underline underline-offset-8"
              >
                مشاهده همه نتایج محصول
              </Link>
            </p>
          </div>
        )}
      </div>
    );
  }

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
          {renderSearchBar()}
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
