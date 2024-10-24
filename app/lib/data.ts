import Navbar from "@/components/navbar";
import { Banner, NavbarItem } from "./definitions";
import config from "@/lib/config";

const baseUrl = config.apiUrl;
export async function getBannerData() {
  const path: string = "/api/banners";
  const url = new URL(path, baseUrl);
  try {
    const response = await fetch(url.href, { cache: "no-store" });
    const strapiData = await response.json();
    const data: Array<Banner> = strapiData.data;
    let nowDate: Date = new Date();
    nowDate = new Date(
      nowDate.getFullYear(),
      nowDate.getMonth(),
      nowDate.getDay()
    );
    const activeBanners: Array<Banner> = data.filter((banner: Banner) => {
      const startDate: Date = new Date(banner.startDate);
      const endDate: Date = new Date(banner.endDate);
      return startDate < nowDate && endDate > nowDate && banner;
    });
    const selectedBanner: Banner = activeBanners.reduce(
      (formerBanner: Banner, currentBanner: Banner) => {
        return currentBanner.endDate > formerBanner.endDate
          ? currentBanner
          : formerBanner;
      }
    );
    return selectedBanner;
    // TODO: handle errors
  } catch (error) {
    console.log(error);
  }
}
// Q:should I use type definition to create objects from DB?
export async function getNavbarItems() {
  const path = "/api/navbar-items?sort=order:desc&populate=image";
  const url = new URL(path, baseUrl);
  try {
    const response = await fetch(url.href, { cache: "no-store" });
    const strapiData = await response.json();
    let navbarItems: NavbarItem[] = strapiData.data;
    return navbarItems;
  } catch (error) {
    console.log(error);
  }
}

// interface Object {
//   flatten(data: any): FlattenedObject;
// }

// interface FlattenedObject {
//   [key: string]: any;
// }

// Object.defineProperty(Object.prototype, "flatten", {
//   value: function (data: any): FlattenedObject {
//     const result: FlattenedObject = {};

//     function recurse(cur: any, prop: string) {
//       if (Object(cur) !== cur) {
//         result[prop] = cur;
//       } else if (Array.isArray(cur)) {
//         for (let i = 0, l = cur.length; i < l; i++) {
//           recurse(cur[i], `${prop}[${i}]`);
//         }
//         if (cur.length === 0) {
//           result[prop] = [];
//         }
//       } else {
//         let isEmpty = true;
//         for (const p in cur) {
//           if (cur.hasOwnProperty(p)) {
//             isEmpty = false;
//             recurse(cur[p], prop ? `${prop}.${p}` : p);
//           }
//         }
//         if (isEmpty && prop) {
//           result[prop] = {};
//         }
//       }
//     }

//     recurse(data, "");
//     return result;
//   },
//   writable: true,
//   configurable: true,
// });
