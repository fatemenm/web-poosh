import { apiBaseUrl } from "@config";

import BreadCrumb from "@/components/breadcrumb";
import ProductDetails from "@/components/productDetails";
import { getClotheProductById, getClotheProducts } from "@/lib/data";

export async function generateStaticParams() {
  const clotheProducts = await getClotheProducts();
  return clotheProducts?.map((product) => ({
    productId: product.documentId,
  }));
}

export default async function Product({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const product = await getClotheProductById((await params).productId);
  const links = [
    {
      label: "وب پوش",
      href: "/",
    },
    {
      label: "لباس",
      href: "/products",
    },
    {
      label: "شلوار جین کارگو ۴۵",
      href: ".",
    },
  ];
  if (product)
    return (
      <div className="flex flex-col items-center gap-16">
        <BreadCrumb items={links} />
        {product && <ProductDetails product={product} />}
        <div className="w-full bg-orange-50">
          here is gonna be product explanation
        </div>
      </div>
    );
}
