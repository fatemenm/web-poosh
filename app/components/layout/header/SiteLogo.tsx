import Image from "next/image";
import Link from "next/link";

import logo from "@public/logo.png";

export default function SiteLogo({ onSelect }: { onSelect?: () => void }) {
  return (
    <div className="w-24 pt-1 sm:h-auto sm:w-24 lg:w-28 xl:w-32">
      <Link href="/" onClick={onSelect}>
        <Image src={logo} alt="logo" />
      </Link>
    </div>
  );
}
