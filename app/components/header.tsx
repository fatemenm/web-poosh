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
import { getBannerData, getNavbarItems } from "@/lib/data";
import Navbar from "./navbar";

export default async function Header() {
  const bannerData = await getBannerData("/api/banners");
  const navbarItems = await getNavbarItems("/api/navbar-items?sort=order:desc");

  return (
    <header className="flex flex-col">
      {bannerData ? (
        <PromotionalBanner data={bannerData} />
      ) : (
        "No Banner Available"
      )}
      <div className="flex flex-row justify-between items-center mx-48">
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
        <div className="flex flex-row gap-10 ">
          {navbarItems ? <Navbar items={navbarItems} /> : "No Navbar Available"}
          <div className="h-14 w-28 pt-1">
            <Link href="/">
              <Image src={logo} alt="logo" width={153} height={163} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
