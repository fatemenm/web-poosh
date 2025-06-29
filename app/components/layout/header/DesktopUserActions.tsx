import { apiBaseUrl, nextServerUrl } from "@config";
import {
  faArrowRightFromBracket,
  faBagShopping,
  faRuler,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import Overlay from "@/components/layout/header/Overlay";
import SearchBar from "@/components/navigation/searchBar";
import { useAuth } from "@/lib/context/authContext";
import { useBasket } from "@/lib/context/basketContext";

export default function DesktopUserActions() {
  const [hoveredLeftNavbarItem, setHoveredLeftNavbarItem] =
    useState<string>("");
  const [hoveredBasketItemId, setHoveredBasketItemId] = useState<number | null>(
    null
  );
  const { items, removeItem } = useBasket();
  const { user, handleSignOut, openAuthModal } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const handleSelect = () => setHoveredLeftNavbarItem("");
  return (
    <>
      <div className="hidden w-1/4 grow items-center justify-end lg:flex lg:gap-4">
        <SearchBar variant="desktop" />
        <NavigationMenu.Root
          dir="rtl"
          className="flex items-stretch justify-end [&>div]:w-full"
          value={hoveredLeftNavbarItem}
          onValueChange={setHoveredLeftNavbarItem}
        >
          <NavigationMenu.List className="flex h-full w-full flex-row items-stretch justify-end text-sm 2xl:text-base">
            <NavigationMenu.Item value="user">
              <NavigationMenu.Trigger className="h-full">
                <div className="flex gap-2">
                  {user && <span>{user.username}</span>}
                  <FontAwesomeIcon
                    icon={faUser}
                    className={classNames(
                      "text-lg text-stone-600 hover:text-stone-800 xl:text-xl",
                      {
                        "px-0 pl-2": user,
                        "px-4": !user,
                      }
                    )}
                  />
                </div>
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute left-0 top-12 z-20 w-[18vw] bg-white p-4 xl:top-14">
                <div>
                  {user ? (
                    <div className="flex flex-col">
                      <Link
                        onClick={handleSelect}
                        href="/profile"
                        className="flex gap-2 py-3 text-stone-600 hover:text-stone-800"
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-lg xl:text-xl"
                        />
                        پروفایل
                      </Link>
                      <Link
                        onClick={handleSelect}
                        href="/profile/sizes"
                        className="flex gap-2 py-3 text-stone-600 hover:text-stone-800"
                      >
                        <FontAwesomeIcon
                          icon={faRuler}
                          className="text-lg xl:text-xl"
                        />
                        سایز‌های من
                      </Link>
                      <button
                        onClick={() => {
                          if (pathname.includes("profile"))
                            router.push("/", {
                              scroll: false,
                            });
                          handleSelect();
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
                        handleSelect();
                        openAuthModal();
                      }}
                    >
                      <FontAwesomeIcon icon={faUserPlus} className="text-xl" />
                      ثبت نام / ورود
                    </button>
                  )}
                </div>
                <NavigationMenu.Link />
              </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="basket" className="pt-1">
              {items.length > 0 && (
                <div className="absolute -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 p-1 text-sm text-white">
                  {items.length.toLocaleString("fa-ir")}
                </div>
              )}
              <NavigationMenu.Trigger className="h-full px-4">
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="text-lg text-stone-600 hover:text-stone-800 xl:text-xl"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute left-0 top-12 z-20 w-[21vw] bg-white xl:top-14">
                <div>
                  {items?.length ? (
                    <ScrollArea.Root
                      dir="rtl"
                      className="h-[380px] max-h-[600px] w-full overflow-hidden"
                    >
                      <ScrollArea.Viewport className="size-full px-3 py-4">
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
                            onClick={handleSelect}
                            href={nextServerUrl + "/basket"}
                            className={
                              "w-full bg-green-700 py-2 text-center text-sm text-white hover:bg-green-800"
                            }
                          >
                            مشاهده سبد خرید
                          </Link>
                          <div className="grid grid-cols-2 justify-center gap-x-3 gap-y-3 2xl:grid-cols-3 2xl:gap-x-6 2xl:gap-y-6">
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
      {hoveredLeftNavbarItem && <Overlay />}
    </>
  );
}
