import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import PromotionalBanner from "@/components/promotional-banner";
import { getHeaderData } from "@/lib/data";

export default async function Header() {
  const strapiData = await getHeaderData("/api/home-page");
  const { promotionalBannerData } = strapiData.data;

  return (
    <header className="flex flex-col">
      <PromotionalBanner data={promotionalBannerData} />
      <div className="flex flex-row justify-between items-center py-2 mx-48">
        <div className="flex flex-row justify-between gap-8">
          <button>
            <FontAwesomeIcon icon={faBagShopping} style={{ fontSize: 20 }} />
          </button>
          <button>
            <FontAwesomeIcon icon={faUser} style={{ fontSize: 20 }} />
          </button>
          <button>
            <FontAwesomeIcon icon={faSearch} style={{ fontSize: 20 }} />
          </button>
        </div>
        <div className="flex flex-row gap-10 items-center">
          <nav className="flex flex-row justify-between gap-8 text-sm ">
            <Link href="/">فروشگاه حضوری</Link>
            <Link href="/">تخفیف</Link>
            <Link href="/">اکسسوری</Link>
            <Link href="/">کفش</Link>
            <Link href="/">لباس</Link>
            <Link href="/">ست</Link>
            <Link href="/">جدیدترین ها</Link>
          </nav>
          <div className="h-14 w-28">
            <Link href="/">
              <Image src={logo} alt="logo" width={153} height={163} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
