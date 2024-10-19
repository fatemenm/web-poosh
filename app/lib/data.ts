import { Banner, NavbarItem } from "./definitions";

const baseUrl = "http://localhost:1337";

export async function getBannerData(path: string) {
  const url = new URL(path, baseUrl);
  try {
    const response = await fetch(url.href, { cache: "no-store" });
    const strapiData = await response.json();
    const data: Array<Banner> = strapiData.data;
    let now: Date = new Date();
    now = new Date(now.getFullYear(), now.getMonth(), now.getDay());
    const activeBanners: Array<Banner> = data.filter((banner: Banner) => {
      const startDate: Date = new Date(banner.startDate);
      const endDate: Date = new Date(banner.endDate);
      return startDate < now && endDate > now && banner;
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

export async function getNavarItems(path: string) {
  const url = new URL(path, baseUrl);
  try {
    const response = await fetch(url.href, { cache: "no-store" });
    const strapiData = await response.json();
    const data: Array<NavbarItem> = strapiData.data;
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
