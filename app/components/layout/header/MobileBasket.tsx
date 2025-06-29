import { nextServerUrl } from "@config";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { useBasket } from "@/lib/context/basketContext";

export default function MobileBasket() {
  const { items } = useBasket();
  return (
    <div className="lg:hidden">
      <Link className="lg:hidden" href={nextServerUrl + "/basket"}>
        <FontAwesomeIcon
          icon={faBagShopping}
          className="text-xl text-stone-600 hover:text-stone-800"
        />
      </Link>
      {items.length > 0 && (
        <div className="absolute left-7 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 p-1 text-xs text-white">
          {items.length.toLocaleString("fa-ir")}
        </div>
      )}
    </div>
  );
}
