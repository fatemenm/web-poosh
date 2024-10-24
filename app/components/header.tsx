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

import PromotionalBanner from "@/components/promotional-banner";
import config from "@/lib/config";
import { getBanner, getNavbarItems } from "@/lib/data";
import { Banner, NavbarItem, NavigationLink } from "@/lib/definitions";

import logo from "@public/logo.png";

import Navbar from "./navbar";

export default function Header() {
  const [bannerData, setBannerData] = useState<Banner>();
  const [navbarItems, setNavbarItems] = useState<Array<NavbarItem>>();
  const [hoveredLinkData, setHoveredLinkData] = useState<NavbarItem | null>();

  function handleLinkHover(item: NavbarItem | null) {
    setHoveredLinkData(item);
  }

  useEffect(() => {
    async function getData() {
      const [banner, navbarItems] = await Promise.all([
        getBanner(),
        getNavbarItems(),
      ]);
      setBannerData(banner);
      setNavbarItems(navbarItems);
    }
    getData();
  }, []);

  return (
    <header className="flex flex-col">
      {bannerData ? (
        <PromotionalBanner data={bannerData} />
      ) : (
        "No Banner Available"
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
          {navbarItems ? (
            <Navbar items={navbarItems} onLinkHover={handleLinkHover} />
          ) : (
            "No Navbar Available"
          )}
          <div className="h-14 w-28 pt-1">
            <Link href="/">
              <Image src={logo} alt="logo" width={153} height={163} />
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
                  src={`${config.apiUrl}${hoveredLinkData.image?.url}`}
                  alt={hoveredLinkData.image?.alternativeText}
                  width={hoveredLinkData.image.width}
                  height={hoveredLinkData.image.height}
                />
              )}
              <div className="flex flex-row">
                {/* {
                  hoveredLinkData.subLinks && 
                  createLinksGrid(hoveredLinkData.subLinks.items)
                } */}
                <ul>
                  {hoveredLinkData.subLinks &&
                    hoveredLinkData.subLinks.items.map(
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
