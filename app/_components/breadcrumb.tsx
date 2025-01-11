import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type BreadCrumbItem = {
  label: string;
  href: string;
};

export default function BreadCrumb({ items }: { items: BreadCrumbItem[] }) {
  return (
    <div className="flex flex-row items-center gap-4 bg-stone-100 px-10 py-3 text-sm text-stone-700">
      {items.map((item, index) => {
        return (
          <Link href={item.href} key={index} className="flex flex-row gap-4">
            {item.label}
            {items.length - 1 !== index && (
              <span>
                <FontAwesomeIcon
                  className="text-[12px] text-stone-500"
                  icon={faChevronLeft}
                />
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
