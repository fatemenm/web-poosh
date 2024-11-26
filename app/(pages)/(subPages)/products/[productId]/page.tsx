import ProductCard from "@/components/productCard";
import { getClotheProducts } from "@/lib/data";

const clotheProducts = await getClotheProducts();
export async function generateStaticParams() {
  return clotheProducts?.map((product) => ({
    productId: product.id.toString(),
  }));
}
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId;
  const product = clotheProducts?.find(
    (product) => product.id === Number(productId)
  );

  return (
    <div className="flex flex-col items-center gap-8">
      {/* product card */}
      {product && <ProductCard product={product} />}
      <div className="w-full bg-orange-50">
        here is gonna be product explanation
      </div>
    </div>
  );
}
