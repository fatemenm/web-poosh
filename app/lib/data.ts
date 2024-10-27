import { Banner, NavbarItem, responseBody } from "./definitions";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const urls = {
  getBanners: new URL("/api/banners", apiUrl),
  getNavbarItems: new URL(
    "/api/navbar-items?sort=order:desc&populate=image",
    apiUrl
  ),
};
export async function getBannerData() {
  try {
    const response = await fetch(urls.getBanners.href, { cache: "no-store" });
    const body: responseBody = await response.json();
    const data = body.data.map((item) => ({
      ...item,
      startDate: new Date(item.startDate as string),
      endDate: new Date(item.endDate as string),
    })) as Banner[];
    const now: Date = new Date();
    const earliestActiveBanner = data
      .filter((banner) => {
        return banner.startDate < now && banner.endDate > now && banner;
      })
      .sort((a, b) => b.endDate.getTime() - a.endDate.getTime())
      .pop();
    return earliestActiveBanner;
  } catch (error) {
    console.log(error);
  }
}
export async function getNavbarItems() {
  try {
    const response = await fetch(urls.getNavbarItems.href, {
      cache: "no-store",
    });
    const body: responseBody = await response.json();
    const data = body.data as NavbarItem[];
    return data;
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
