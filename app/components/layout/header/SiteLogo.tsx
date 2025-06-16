import Image from "next/image";
import Link from "next/link";

import logo from "@public/kaizen.svg";

export default function SiteLogo({ onSelect }: { onSelect?: () => void }) {
  return (
    <div className="w-24 pt-1 sm:h-auto sm:w-24 lg:w-28 xl:w-32">
      <Link href="/" onClick={onSelect}>
        <Image
          src={logo}
          alt="logo"
          className="aspect-[2/1] w-full object-cover"
        />
      </Link>
    </div>
  );
}
