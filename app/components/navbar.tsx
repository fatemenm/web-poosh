"use client";
import { MouseEvent, useState } from "react";
import { NavbarItem } from "@/lib/definitions";
import Link from "next/link";

export default function Navbar({
  items,
  onLinkHover,
}: {
  items: Array<NavbarItem>;
  onLinkHover: Function;
}) {
  const [hoveredLinkId, setHoveredLinkId] = useState<number | null>(null);
  const initialLinkClass = "flex items-center border-b-2 border-b-transparent";
  function handleMouseOver(
    event: MouseEvent<HTMLAnchorElement>,
    item: NavbarItem
  ) {
    setHoveredLinkId((hoveredLinkId) => (hoveredLinkId = item.id));
    if (item.isExpandable) {
      onLinkHover(item);
    }
  }
  function handleMouseOut(
    event: MouseEvent<HTMLAnchorElement>,
    item: NavbarItem
  ) {
    setHoveredLinkId((hoveredLinkId) => (hoveredLinkId = null));
    if (item.isExpandable) {
      onLinkHover(null);
    }
  }
  function setHoveredClass(item: NavbarItem) {
    let hoveredClass = "flex items-center cursor-pointer border-b-2";
    if (item.isExpandable) {
      return (hoveredClass += " " + "border-b-transparent");
    } else {
      return (hoveredClass += " " + "border-gray-900");
    }
  }
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
    </>
  );
}

// hoverStyle += " " + "cursor-pointer";
//   event.currentTarget.classList.add("border-b-2 border-gray-600");
