import Image from "next/image";
import Link from "next/link";

import logo from "@public/logo.png";

export default function SiteLogo({ onSelect }: { onSelect?: () => void }) {
  return (
    <Link href="/" onClick={onSelect}>
      <Image src={logo} alt="logo" />
    </Link>
  );
}
