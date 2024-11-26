import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function BreadCrumb() {
  // TODO: fix icons layout shift problem
  return (
    <div className="flex flex-row-reverse items-center gap-4 bg-stone-100 px-10 py-3 text-sm text-stone-700">
      <Link href="">وب پوش</Link>
      <span>
        <FontAwesomeIcon
          icon={faChevronLeft}
          style={{ fontSize: 12, color: "gray" }}
        />
      </span>
      <Link href="">لباس</Link>
      <span>
        <FontAwesomeIcon
          icon={faChevronLeft}
          style={{ fontSize: 12, color: "gray" }}
        />
      </span>
      <Link href="">شلوار جین کارگو ۱۲۸۱۶</Link>
    </div>
  );
}
