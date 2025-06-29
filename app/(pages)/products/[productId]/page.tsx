import BreadCrumb from "@/components/layout/breadcrumb";
import ProductsSlider from "@/components/slider/ProductsSlider";
import ProductView from "@/features/product/ProductView";
import { getProductById, getProducts } from "@/lib/data";

export default async function Product({
  params,
}: {
  params: { productId: string };
}) {
  // Simulate loading delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

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
