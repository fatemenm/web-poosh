import ProductCard from "@/components/productCard";
import { getClotheProductById, getClotheProducts } from "@/lib/data";

export async function generateStaticParams() {
  const clotheProducts = await getClotheProducts();
  return clotheProducts?.map((product) => ({
    productId: product.documentId,
  }));
}
export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const product = await getClotheProductById((await params).productId);
  if (product)
    return (
      <div className="flex w-10/12 flex-col items-center gap-8">
        {/* product card */}
        {product && <ProductCard product={product} />}
        <div className="w-full bg-orange-50">
          here is gonna be product explanation
        </div>
      </div>
    );
}
