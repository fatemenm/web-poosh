import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function BreadCrumb() {
  return (
    <div className="flex flex-row-reverse items-center gap-4 bg-stone-100 px-10 py-3 text-sm text-stone-700">
      <Link href="">وب پوش</Link>
      <FontAwesomeIcon
        icon={faChevronLeft}
        style={{ fontSize: 12, color: "gray" }}
      />
      <Link href="">لباس</Link>
      <FontAwesomeIcon
        icon={faChevronLeft}
        style={{ fontSize: 12, color: "gray" }}
      />
      <Link href="">شلوار جین کارگو ۱۲۸۱۶</Link>
    </div>
  );
}
