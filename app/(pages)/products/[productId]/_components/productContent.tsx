// "use client";

// import { useMemo, useState } from "react";

// import BreadCrumb from "@/_components/breadcrumb";
// import { Product } from "@/_lib/definitions";

// import ProductDescription from "./productDescription";
// import ProductDetails from "./productDetails";

// export default function ProductContent({ product }: { product: Product }) {
//   const colorToSizes = useMemo(() => hasStockBy("color"), []);
//   const sizeToColors = useMemo(() => hasStockBy("size"), []);
//   const colors = useMemo(getColors, []);
//   const [selectedColor, setSelectedColor] = useState<string>(colors[0].name);
//   const selectedProductByColorImages =
//     product.imagesByColor.find((item) => item.color === selectedColor)
//       ?.images || [];
//   function hasStockBy(type: "color" | "size") {
//     const filter = type === "color" ? "size" : "color";
//     return product.stocks.reduce(
//       (acc, currStock) => {
//         if (currStock.quantity) {
//           if (!Array.isArray(acc[currStock[type]])) {
//             acc[currStock[type]] = new Array();
//           }
//           acc[currStock[type]].push(currStock[filter]);
//         }
//         return acc;
//       },
//       {} as Record<string, string[]>
//     );
//   }
//   function getColors() {
//     return product.colors
//       .filter((color) => colorToSizes[color.name])
//       .map((color) => {
//         return { ...color, isAvailable: true };
//       });
//   }
//   const breadcrumbItems = [
//     {
//       label: "وب پوش",
//       href: "/",
//     },
//     {
//       label: product.category.name,
//       href: "/products",
//     },
//     {
//       label: product.name + " " + product.id,
//       href: ".",
//     },
//   ];
//   return (
//     <>
//       <BreadCrumb items={breadcrumbItems} />
//       <ProductDetails
//         product={product}
//         selectedColor={selectedColor}
//         onSelectColor={(value: string) => setSelectedColor(value)}
//         colors={colors}
//         colorToSizes={colorToSizes}
//         sizeToColors={sizeToColors}
//         selectedProductByColorImages={selectedProductByColorImages}
//       />
//       <ProductDescription
//         product={product}
//         selectedProductByColorImages={selectedProductByColorImages}
//       />
//     </>
//   );
// }
