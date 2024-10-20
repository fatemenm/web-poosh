"use client";
import { MouseEvent, useState } from "react";
import { NavbarItem } from "@/lib/definitions";
import Link from "next/link";
import { render } from "react-dom";

export default function Navbar({ items }: { items: Array<NavbarItem> }) {
  const [hoveredLinkId, setHoveredLinkId] = useState<number | null>(null);
  const [isSubMenuVisible, setIsSubMenuVisible] = useState<boolean>(false);
  const initialLinkClass = "flex items-center border-b-2 border-b-transparent";
  function handleMouseOver(
    event: MouseEvent<HTMLAnchorElement>,
    item: NavbarItem
  ) {
    setHoveredLinkId((hoveredLinkId) => (hoveredLinkId = item.id));
    if (item.isExpandable)
      setIsSubMenuVisible((isSubMenuVisible) => (isSubMenuVisible = true));
  }
  function handleMouseOut(
    event: MouseEvent<HTMLAnchorElement>,
    item: NavbarItem
  ) {
    setHoveredLinkId((hoveredLinkId) => (hoveredLinkId = null));
    if (item.isExpandable)
      setIsSubMenuVisible((isSubMenuVisible) => (isSubMenuVisible = false));
  }
  function setHoveredClass(item: NavbarItem) {
    let hoveredClass = "flex items-center cursor-pointer border-b-2";
    if (item.isExpandable) {
      return (hoveredClass += " " + "border-b-transparent");
    } else {
      return (hoveredClass += " " + "border-gray-900");
    }
  }
  //   function renderSubMenu() {
  //     return (
  //       <div className="absolute bg-slate-200 w-screen">
  //         <span>this is gonna be tough!</span>
  //       </div>
  //     );
  //   }

  return (
    <>
      <nav className="flex flex-row justify-between gap-8 text-sm ">
        {items
          ? items.map((item: NavbarItem) => {
              return (
                <Link
                  className={
                    hoveredLinkId === item.id
                      ? setHoveredClass(item)
                      : initialLinkClass
                  }
                  key={item.id}
                  href={item.linkUrl}
                  onMouseOver={(event) => handleMouseOver(event, item)}
                  onMouseOut={(event) => handleMouseOut(event, item)}
                >
                  {item.linkText}
                </Link>
              );
            })
          : "No Navbar Available"}
      </nav>
      {/* {isSubMenuVisible ? subMenu : null} */}
    </>
  );
}

// hoverStyle += " " + "cursor-pointer";
//   event.currentTarget.classList.add("border-b-2 border-gray-600");
