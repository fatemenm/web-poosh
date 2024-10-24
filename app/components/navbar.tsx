"use client";

import Link from "next/link";
import { useState } from "react";

interface NavbarItem {
  id: number;
  isExpandable: boolean;
  linkUrl: string;
  linkText: string;
}
interface NavbarParams<T extends NavbarItem> {
  items: Array<T>;
  onLinkHover: (item: T | null) => void;
}

function getLinkClasses(item: NavbarItem, isHovered: boolean) {
  if (!isHovered) return "flex items-center border-b-2 border-b-transparent";
  if (item.isExpandable) {
    return "flex items-center border-b-2  cursor-pointer border-b-transparent";
  } else {
    return "flex items-center border-b-2  cursor-pointer border-gray-900";
  }
}

export default function Navbar<T extends NavbarItem>({
  items,
  onLinkHover,
}: NavbarParams<T>) {
  const [hoveredLinkId, setHoveredLinkId] = useState<number | null>(null);
  function handleMouseEnter(item: T) {
    setHoveredLinkId(item.id);
    onLinkHover(item);
  }
  function handleMouseLeave() {
    setHoveredLinkId(null);
    onLinkHover(null);
  }

  return (
    <>
      <nav className="flex flex-row justify-between gap-8 text-sm ">
        {items
          ? items.map((item: T) => {
              return (
                <Link
                  className={getLinkClasses(item, hoveredLinkId === item.id)}
                  key={item.id}
                  href={item.linkUrl}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={() => handleMouseLeave()}
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
