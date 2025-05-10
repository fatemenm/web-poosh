"use client";

import { apiBaseUrl, nextServerUrl } from "@config";
import {
  faArrowRightFromBracket,
  faBagShopping,
  faClose,
  faDoorClosed,
  faRuler,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AuthModal from "@/(pages)/_components/authModal";
import PromoBanner from "@/_components/promoBanner";
import { useAuth } from "@/_lib/context/authContext";
import { useBasket } from "@/_lib/context/basketContext";
import { getProducts } from "@/_lib/data";
import {
  NavbarItem,
  NavigationLink,
  PromoBanner as PromoBannerType,
} from "@/_lib/definitions";
import { ProductModel } from "@/_models/product.model";

import logo from "@public/logo.png";

import SearchBar from "./searchBar";

// TODO: should these functions be here? outside of the component.
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
  const [hoveredRightNavbarItem, setHoveredRightNavbarItem] =
    useState<NavbarItem | null>();
  const [hoveredLeftNavbarItem, setHoveredLeftNavbarItem] = useState<string>();
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false);
  const [hoveredBasketItemId, setHoveredBasketItemId] = useState<number | null>(
    null
  );
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<ProductModel[]>([]);
  const { items, removeItem, isBasketPopUpOpen } = useBasket();
  const { user, handleSignOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isBasketPopUpOpen) setHoveredLeftNavbarItem("basket");
    else setHoveredLeftNavbarItem("");
  }, [isBasketPopUpOpen]);

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
                      hoveredRightNavbarItem?.id === item.id
                    )}
                    key={item.id}
                    href={item.linkUrl}
                    onMouseEnter={() => {
                      setHoveredRightNavbarItem(item);
                    }}
                    onMouseLeave={() => {
                      if (!item?.isExpandable) setHoveredRightNavbarItem(null);
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
            value={hoveredLeftNavbarItem}
            onValueChange={(value) => setHoveredLeftNavbarItem(value)}
          >
            <NavigationMenu.List className="flex h-full w-full flex-row items-stretch justify-end">
              <NavigationMenu.Item value="user">
                <NavigationMenu.Trigger className="h-full px-4">
                  <div className="flex gap-3">
                    {user && <span>{user.username}</span>}
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-xl text-stone-600 hover:text-stone-800"
                    />
                  </div>
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute left-0 top-12 z-20 w-[18vw] bg-white p-4">
                  <div>
                    {user ? (
                      <div className="flex flex-col">
                        <Link
                          href="/profile"
                          className="flex gap-2 py-3 text-stone-600 hover:text-stone-800"
                        >
                          <FontAwesomeIcon icon={faUser} className="text-xl" />
                          پروفایل
                        </Link>
                        <Link
                          href="/profile/sizes"
                          className="flex gap-2 py-3 text-stone-600 hover:text-stone-800"
                        >
                          <FontAwesomeIcon icon={faRuler} className="text-xl" />
                          سایز‌های من
                        </Link>
                        <button
                          onClick={() => {
                            router.push("/", {
                              scroll: false,
                            });
                            handleSignOut();
                          }}
                          className="flex gap-2 py-3 text-stone-600 hover:text-stone-800"
                        >
                          <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            className="text-xl"
                          />
                          خروج از حساب کاربری
                        </button>
                      </div>
                    ) : (
                      <button
                        className="flex gap-2 text-stone-600 hover:text-stone-700"
                        onClick={() => {
                          setHoveredLeftNavbarItem("");
                          setIsAuthDialogOpen(true);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faUserPlus}
                          className="text-xl"
                        />
                        ثبت نام / ورود
                      </button>
                    )}
                  </div>
                  <NavigationMenu.Link />
                </NavigationMenu.Content>
              </NavigationMenu.Item>
              <NavigationMenu.Item value="basket">
                {items.length > 0 && (
                  <div className="absolute -top-5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 p-1 text-sm text-white">
                    {items.length.toLocaleString("fa-ir")}
                  </div>
                )}
                <NavigationMenu.Trigger className="h-full px-4">
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    className="text-xl text-stone-600 hover:text-stone-800"
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="absolute left-0 top-12 z-20 w-[21vw] bg-white">
                  <div>
                    {items?.length ? (
                      <ScrollArea.Root
                        dir="rtl"
                        className="h-[600px] w-full overflow-hidden"
                      >
                        <ScrollArea.Viewport className="size-full px-6 py-4">
                          <div className="flex flex-col gap-10">
                            <div className="flex justify-between text-sm">
                              <span className=" ">سبد خرید</span>
                              <span className="flex gap-1">
                                {(() => {
                                  let totalPrice = 0;
                                  items.forEach((item) => {
                                    totalPrice += item.product.data.salePrice
                                      ? item.product.data.salePrice
                                      : item.product.data.originalPrice;
                                  });
                                  return totalPrice.toLocaleString("fa-ir");
                                })()}
                                <span>تومان</span>
                              </span>
                            </div>
                            <Link
                              href={nextServerUrl + "/basket"}
                              className={
                                "w-full bg-green-700 py-2 text-center text-sm text-white hover:bg-green-800"
                              }
                            >
                              مشاهده سبد خرید
                            </Link>
                            <div className="grid grid-cols-3 justify-center gap-x-6 gap-y-6">
                              {items.map((item) => {
                                return (
                                  <div
                                    onMouseEnter={() =>
                                      setHoveredBasketItemId(item.id)
                                    }
                                    onMouseLeave={() =>
                                      setHoveredBasketItemId(null)
                                    }
                                    key={item.id}
                                    className="flex flex-col gap-2 text-xs"
                                  >
                                    <div className="w-full">
                                      <Image
                                        src={apiBaseUrl + item.image.url}
                                        width={item.image.width}
                                        height={item.image.height}
                                        alt={item.image.alternativeText}
                                      />
                                    </div>
                                    {item.id === hoveredBasketItemId ? (
                                      <button
                                        onClick={() => removeItem(item)}
                                        className="w-full border border-stone-700 bg-white py-1 text-center text-stone-800 hover:bg-stone-700 hover:text-white"
                                      >
                                        حذف
                                      </button>
                                    ) : (
                                      <div className="flex flex-col gap-1">
                                        <span>{item.product.data.name}</span>
                                        <span>
                                          {item.color}, {item.size}
                                        </span>
                                        <span>
                                          {(item.product.data.salePrice
                                            ? item.product.data.salePrice
                                            : item.product.data.originalPrice
                                          ).toLocaleString("fa-ir")}{" "}
                                          تومان
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </ScrollArea.Viewport>
                        <ScrollArea.Scrollbar
                          className="flex touch-none select-none rounded-[10px] p-0.5 transition-colors duration-150 ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                          orientation="vertical"
                        >
                          <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-400 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
                        </ScrollArea.Scrollbar>
                      </ScrollArea.Root>
                    ) : (
                      <div className="flex flex-col gap-5 px-6 py-4">
                        <span className="text-lg">سبد خرید</span>
                        <div className="flex flex-col gap-6 text-center font-extralight">
                          <hr />
                          <p>سبد خرید شما خالیست</p>
                          <hr />
                          <Link
                            href={nextServerUrl + "/basket"}
                            className={
                              "w-full bg-green-700 py-2 text-center text-sm font-normal text-white hover:bg-green-800"
                            }
                          >
                            مشاهده سبد خرید
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                  <NavigationMenu.Link />
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>
      </div>
      {hoveredRightNavbarItem?.isExpandable && (
        <div className="absolute top-28 z-20 w-screen">
          <div
            className="flex flex-row justify-center bg-stone-100 py-5"
            onMouseEnter={() => {
              setHoveredRightNavbarItem(hoveredRightNavbarItem);
            }}
            onMouseLeave={() => {
              setHoveredRightNavbarItem(null);
            }}
          >
            <div className="flex w-2/3 flex-row justify-between px-6">
              <div className="flex flex-row gap-20">
                {createSublinkGrid(
                  hoveredRightNavbarItem?.subLinks?.items
                )?.map((col, colNumber) => {
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
                })}
              </div>
              {hoveredRightNavbarItem.image ? (
                <Image
                  src={apiBaseUrl + hoveredRightNavbarItem.image.url}
                  alt={hoveredRightNavbarItem.image?.alternativeText}
                  width={hoveredRightNavbarItem.image.width}
                  height={hoveredRightNavbarItem.image.height}
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
      {(hoveredLeftNavbarItem === "user" ||
        hoveredLeftNavbarItem === "basket") && (
        <div className="absolute left-0 top-28 z-10 h-full w-screen bg-stone-800 bg-opacity-50" />
      )}
      <AuthModal
        isOpen={isAuthDialogOpen}
        onOpenChange={(isOpen: boolean) => setIsAuthDialogOpen(isOpen)}
      />
    </header>
  );
}
