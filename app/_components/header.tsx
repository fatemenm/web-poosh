"use client";

import { apiBaseUrl, nextServerUrl } from "@config";
import {
  faArrowRightFromBracket,
  faBagShopping,
  faBars,
  faRuler,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
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

import Accordion from "./accordion";
import SearchBar from "./searchBar";

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

  let closeTimeOut: ReturnType<typeof setTimeout>;
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

  function createSublinkGrid(items: NavigationLink[] | undefined) {
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
      {promoBanner && <PromoBanner data={promoBanner} />}
      <header className="sticky top-0 z-10 flex w-full flex-row items-center justify-center bg-white px-4 py-2 lg:px-0">
        <div className="flex w-full items-center justify-between bg-white lg:w-11/12 xl:w-10/12">
          {/* Mobile - hamburger menu */}
          <div className="md:hidden">
            <Dialog.Root>
              <Dialog.Trigger>
                <FontAwesomeIcon
                  icon={faBars}
                  className="text-xl text-stone-600 hover:text-stone-800"
                />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-10 bg-stone-800 bg-opacity-50 md:hidden" />
                <Dialog.Content className="fixed top-0 z-20 h-screen w-2/3 bg-white sm:w-1/2 md:hidden">
                  <ScrollArea.Root
                    className="h-screen w-full overflow-hidden"
                    dir="rtl"
                  >
                    <ScrollArea.Viewport className="size-full rounded py-4">
                      <VisuallyHidden.Root asChild>
                        <Dialog.Title>منوی ناوبری</Dialog.Title>
                      </VisuallyHidden.Root>
                      <VisuallyHidden.Root asChild>
                        <Dialog.Description>
                          منوی ناوبری برای دسترسی برای ورود و ثبت نام کاربر و
                          دسترسی به صفحات سایت
                        </Dialog.Description>
                      </VisuallyHidden.Root>
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-32">
                          <Link href="/">
                            <Image src={logo} alt="logo" />
                          </Link>
                        </div>
                        <hr className="w-full border-t-stone-200" />

                        <button
                          className="flex w-full gap-3 px-4"
                          onClick={() => {
                            setHoveredLeftNavbarItem("");
                            setIsAuthDialogOpen(true);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faUser}
                            className="text-l text-stone-600 hover:text-stone-800"
                          />
                          <span className="text-sm">
                            {user ? user.username : "ورود | ثبت نام"}
                          </span>
                        </button>

                        <hr className="w-full border-t-stone-200" />

                        {navbarItems && (
                          <nav className="flex w-full flex-col gap-2 px-4 text-sm">
                            {navbarItems.map((item) => {
                              if (item.isExpandable)
                                return (
                                  <div key={item.id}>
                                    <Accordion
                                      triggerButtonText={[item.linkText]}
                                      triggerButtonClass="text-stone-700 hover:bg-transparent font-normal px-0 "
                                      items={[
                                        item.subLinks?.items.map(
                                          (item, index) => (
                                            <div
                                              key={index}
                                              className="py-2 pr-3 text-sm font-light text-stone-700"
                                            >
                                              <Link
                                                href={nextServerUrl + item.url}
                                              >
                                                {item.name}
                                              </Link>
                                            </div>
                                          )
                                        ),
                                      ]}
                                    />
                                  </div>
                                );
                              else
                                return (
                                  <Link
                                    className="flex items-center py-2 text-stone-700 hover:cursor-pointer"
                                    key={item.id}
                                    href={item.linkUrl}
                                    onMouseEnter={() => {
                                      clearTimeout(closeTimeOut);
                                      setHoveredRightNavbarItem(item);
                                    }}
                                    onMouseLeave={() =>
                                      setHoveredRightNavbarItem(null)
                                    }
                                  >
                                    {item.linkText}
                                  </Link>
                                );
                            })}
                          </nav>
                        )}
                      </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar
                      className="flex touch-none select-none rounded-[10px] p-0.5 transition-colors duration-150 ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                      orientation="vertical"
                    >
                      <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-400 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
                    </ScrollArea.Scrollbar>
                  </ScrollArea.Root>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
          {/* Common - Logo && Desktop - right navbar */}
          <div className="md:flex md:gap-4 lg:gap-6">
            {/* Logo */}
            <div className="w-24 pt-1 sm:h-auto sm:w-24 lg:w-28 xl:w-32">
              <Link href="/">
                <Image src={logo} alt="logo" />
              </Link>
            </div>
            {/* Desktop - right navbar */}
            {navbarItems && (
              <nav className="hidden sm:text-xs md:flex md:flex-row md:justify-between lg:text-sm">
                {navbarItems.map((item) => {
                  if (item.isExpandable) {
                    return (
                      <button
                        className="flex items-center border-b-2 border-b-transparent px-5 font-medium text-stone-700 hover:cursor-pointer sm:px-4 lg:px-6"
                        key={item.id}
                        onMouseEnter={() => {
                          clearTimeout(closeTimeOut);
                          setHoveredRightNavbarItem(item);
                        }}
                        onMouseLeave={() => {
                          closeTimeOut = setTimeout(() => {
                            setHoveredRightNavbarItem(null);
                          }, 100);
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
                          clearTimeout(closeTimeOut);
                          setHoveredRightNavbarItem(item);
                        }}
                        onMouseLeave={() => setHoveredRightNavbarItem(null)}
                      >
                        {item.linkText}
                      </Link>
                    );
                  }
                })}
              </nav>
            )}
          </div>
          {/* Desktop - overlay */}
          {(hoveredLeftNavbarItem === "user" ||
            hoveredLeftNavbarItem === "basket" ||
            hoveredRightNavbarItem?.isExpandable) && (
            <div className="absolute left-0 top-[71px] h-screen w-screen bg-stone-800 bg-opacity-50" />
          )}
          {/* Desktop - right navbarItem menu */}
          {hoveredRightNavbarItem?.isExpandable && (
            <div className="absolute left-0 top-[71px] z-10 w-screen">
              <div
                className="flex flex-row justify-center bg-stone-100 py-5"
                onMouseEnter={() => {
                  clearTimeout(closeTimeOut);
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
            </div>
          )}
          {/* Desktop - left navbar */}
          <div className="hidden w-1/4 grow items-center justify-end md:flex">
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
                            <FontAwesomeIcon
                              icon={faUser}
                              className="text-xl"
                            />
                            پروفایل
                          </Link>
                          <Link
                            href="/profile/sizes"
                            className="flex gap-2 py-3 text-stone-600 hover:text-stone-800"
                          >
                            <FontAwesomeIcon
                              icon={faRuler}
                              className="text-xl"
                            />
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
                <NavigationMenu.Item value="basket" className="pt-1">
                  {items.length > 0 && (
                    <div className="absolute -top-4 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 p-1 text-sm text-white">
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
          {/* Mobile - Basket Link */}
          <Link className="md:hidden" href={nextServerUrl + "/basket"}>
            <FontAwesomeIcon
              icon={faBagShopping}
              className="text-xl text-stone-600 hover:text-stone-800"
            />
          </Link>
        </div>
        {/* login modal */}
        <AuthModal
          isOpen={isAuthDialogOpen}
          onOpenChange={(isOpen: boolean) => setIsAuthDialogOpen(isOpen)}
        />
      </header>
    </>
  );
}
