import { nextServerUrl } from "@config";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { useState } from "react";

import Accordion from "@/components/navigation/accordion";
import SearchBar from "@/components/navigation/searchBar";
import { useAuth } from "@/lib/context/authContext";
import { NavbarItem } from "@/lib/definitions";

import SiteLogo from "./SiteLogo";

export default function MobileNavigationDrawer({
  navbarItems,
}: {
  navbarItems: NavbarItem[] | undefined;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { user, openAuthModal } = useAuth();

  return (
    <div className="lg:hidden">
      <Dialog.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <Dialog.Trigger>
          <FontAwesomeIcon
            icon={faBars}
            className="text-xl text-stone-600 hover:text-stone-800"
          />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-10 bg-stone-800 bg-opacity-50 lg:hidden" />
          <Dialog.Content className="fixed top-0 z-20 h-screen w-2/3 bg-white sm:w-1/2 lg:hidden">
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
                    منوی ناوبری برای دسترسی برای ورود و ثبت نام کاربر و دسترسی
                    به صفحات سایت
                  </Dialog.Description>
                </VisuallyHidden.Root>
                <div className="flex flex-col items-center gap-4">
                  <SiteLogo onSelect={() => setIsMenuOpen(false)} />
                  <hr className="w-full border-t-stone-200" />
                  {user ? (
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      href="/profile"
                      className="flex w-full flex-row gap-3 px-4"
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-lg text-stone-600 hover:text-stone-800"
                      />
                      <span>{user.username}</span>
                    </Link>
                  ) : (
                    <button
                      className="flex w-full gap-3 px-4"
                      onClick={() => {
                        setIsMenuOpen(false);
                        openAuthModal();
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-lg text-stone-600 hover:text-stone-800"
                      />
                      <span className="text-sm"> ورود | ثبت نام </span>
                    </button>
                  )}

                  <div className="w-full px-4">
                    <SearchBar
                      OnChangeMenuOpen={(value: boolean) =>
                        setIsMenuOpen(value)
                      }
                      variant="mobile"
                    />
                  </div>
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
                                  item.subLinks?.items.map((item) => (
                                    <div
                                      key={item.url}
                                      className="py-2 pr-3 text-sm font-light text-stone-700"
                                    >
                                      <Link
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block w-full"
                                        href={nextServerUrl + item.url}
                                      >
                                        {item.name}
                                      </Link>
                                    </div>
                                  )),
                                ]}
                              />
                            </div>
                          );
                        else
                          return (
                            <Link
                              key={item.id}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center py-2 text-stone-700 hover:cursor-pointer"
                              href={item.linkUrl}
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
  );
}
