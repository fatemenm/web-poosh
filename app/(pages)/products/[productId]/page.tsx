import BreadCrumb from "@/components/layout/breadcrumb";
import ProductsSlider from "@/components/slider/ProductsSlider";
import ProductView from "@/features/product/ProductView";
import { getProductById, getProducts } from "@/lib/data";

export async function generateStaticParams() {
  const products = (await getProducts()).products;
  return products.map((product) => ({
    productId: product.data.documentId,
  }));
}

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  console.log(params.productId);
  const product = await getProductById(params.productId);
  const products = (await getProducts()).products;

  const breadcrumbItems = [
    {
      label: product.data.category.name,
      href: "/category/" + product?.data.category.documentId,
    },
    {
      label: product?.data.name,
      href: ".",
    },
  ];

  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4 sm:gap-8 lg:w-11/12 lg:gap-16 xl:w-10/12">
      <BreadCrumb items={breadcrumbItems} />
      <ProductView data={product.data} />
      <ProductsSlider
        sliderTitle="سایر محصولات"
        products={products.map((p) => p.data)}
      />
    </div>
  );
}
