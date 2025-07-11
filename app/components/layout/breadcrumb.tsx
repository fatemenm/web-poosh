import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export type BreadCrumbItem = {
  label: string;
  href: string;
};

export default function BreadCrumb({ items }: { items: BreadCrumbItem[] }) {
  const trailItems = [
    {
      label: "کایزن",
      href: "/",
    },
    ...items,
  ];
  const lastItem = trailItems.pop();
  return (
    <div className="flex flex-row items-center gap-4 bg-stone-100 px-2 py-3 text-xs text-stone-700 xs:text-sm sm:px-4 lg:px-10">
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
