import BreadCrumb from "@/components/general/breadcrumb";
import ProductDetails from "@/components/product/productDetails";
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
  const targetId = "commentForm";
  if (product)
    return (
      <div className="flex flex-col items-center gap-16">
        <BreadCrumb items={links} />
        {product && <ProductDetails product={product} targetId={targetId} />}
        <div className="h-96 w-2/3 bg-pink-50" id={targetId}>
          this is gonna be comment form
        </div>
      </div>
    );
}
