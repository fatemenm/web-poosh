import config from "@/lib/config";

import { Banner, NavbarItem, ResponseBody } from "./definitions";

const baseUrl = config.apiUrl;
const urls = {
  getBanner: new URL("/api/banners", baseUrl),
};

export async function getBanner() {
  try {
    const response = await fetch(urls.getBanner.href, { cache: "no-store" });
    const body: ResponseBody = await response.json();
    const data = body.data.map((item) => ({
      ...item,
      startDate: new Date(item.startDate as string),
      endDate: new Date(item.endDate as string),
    })) as Banner[];
    const now = new Date();
    const earliestActiveBanner = data
      .filter(({ startDate, endDate }) => startDate < now && endDate > now)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      .pop();
    return earliestActiveBanner;
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
    const navbarItems: NavbarItem[] = strapiData.data;
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
