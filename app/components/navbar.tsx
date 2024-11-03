"use client";

import Link from "next/link";
import { useState } from "react";

interface NavbarItem {
  id: number;
  linkUrl: string;
  linkText: string;
  isExpandable: boolean;
}

interface NavbarParams<Type extends NavbarItem> {
  items: Type[];
  onLinkHover: (item: Type | null) => void;
}

function getClassNames(item: NavbarItem, isHovered: boolean) {
  if (!isHovered) return "flex items-center border-b-2 border-b-transparent";
  if (item.isExpandable) {
    return "flex items-center cursor-pointer border-b-2 border-b-transparent";
  } else {
    return "flex items-center cursor-pointer border-b-2 border-gray-900";
  }
}

export default function Navbar<T extends NavbarItem>({
  items,
  onLinkHover,
}: NavbarParams<T>) {
  const [hoveredLinkId, setHoveredLinkId] = useState<number | null>(null);
  function handleMouseLeave(item: T) {
    setHoveredLinkId(item.id);
    onLinkHover(item);
  }
  function handleMouseEnter() {
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
                  className={getClassNames(item, hoveredLinkId === item.id)}
                  key={item.id}
                  href={item.linkUrl}
                  onMouseEnter={() => handleMouseLeave(item)}
                  onMouseLeave={() => handleMouseEnter()}
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
