import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { useBreadcrumb } from "@/_lib/context/breadcrumbContext";

export type BreadCrumbItem = {
  label: string;
  href: string;
};

export default function BreadCrumb() {
  const { items } = useBreadcrumb();
  const trailItems = [...items];
  const lastItem = trailItems.pop();
  return (
    <div className="flex flex-row items-center gap-4 bg-stone-100 px-10 py-3 text-sm text-stone-700">
      {trailItems.map((item, index) => (
        <Link href={item.href} key={index} className="flex flex-row gap-4">
          {item.label}
          <span>
            <FontAwesomeIcon
              className="text-[12px] text-stone-500"
              icon={faChevronLeft}
            />
          </span>
        </Link>
      ))}
      {lastItem && <span>{lastItem.label}</span>}
    </div>
  );
}
