import qs from "qs";

export async function getHeaderData(path: string) {
  const query = qs.stringify(
    {
      populate: ["promotionalBanner", "promotionalBanner.promotionalLink"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const baseUrl = "http://localhost:1337";
  const url = new URL(path, baseUrl);
  url.search = query;
  try {
    const response = await fetch(url.href, { cache: "no-store" });
    const data = await response.json();
    // console.log(data.flatten(data));
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
