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

import logo from "../../public/logo.png";
import Navbar from "./navbar";

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
  function handleLinkHover(item: NavbarItem | null) {
    setHoveredLinkData(item);
  }

  useEffect(() => {
    setNavbarItems(navbarItemsData);
    setBanner(bannerData);
  }, []);

  return (
    <header className="flex flex-col">
      {banner ? (
        <PromotionalBanner data={banner} />
      ) : (
        <div className="bg-stone-800 w-full p-2 flex flex-row justify-start text-white text-sm font-light min-h-11 box-border"></div>
      )}
      <div className="flex flex-row justify-between items-center mx-48 ">
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
            <Navbar items={navbarItems} onLinkHover={handleLinkHover} />
          )}
          <div className="h-14 w-28 pt-1">
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>
        </div>
      </div>
      {hoveredLinkData?.isExpandable && (
        <div className="absolute top-24 w-screen">
          <div className="bg-stone-100 flex flex-row justify-center py-8">
            <div className="flex flex-row justify-between w-2/3 px-6">
              {hoveredLinkData.image && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${hoveredLinkData.image?.url}`}
                  alt={hoveredLinkData.image?.alternativeText}
                  width={hoveredLinkData.image.width}
                  height={hoveredLinkData.image.height}
                />
              )}
              <div className="flex flex-row">
                <ul>
                  {hoveredLinkData.subLinks?.items.map(
                    (subLink: NavigationLink, index: number) => {
                      return (
                        <li key={index}>
                          <a href={subLink.linkUrl}>{subLink.linkText}</a>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-stone-800 bg-opacity-50 h-screen"></div>
        </div>
      )}
    </header>
  );
}
