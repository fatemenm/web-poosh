"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import BreadCrumb from "@/components/layout/breadcrumb";
import ProductCard from "@/features/product/productCard";
import ProductModal from "@/features/product/productModal";
import { useBasket } from "@/lib/context/basketContext";
import { getProducts } from "@/lib/data";
import { ProductModel } from "@/models/product.model";

export default function Page() {
  const [products, setProducts] = useState<ProductModel[] | null>();
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(
    null
  );
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { addItem, openBasketPopUp, closeBasketPopUp } = useBasket();
  useEffect(() => {
    const getData = async () => {
      const { products } = await getProducts({ filters: { onSale: true } });
      setProducts(products);
    };
    getData();
  }, [searchParams]);

  const breadcrumbItems = [
    {
      label: "تخفیف ها",
      href: "",
    },
  ];
  if (!products) return <div>data is not available</div>;
  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4 lg:w-11/12 lg:gap-16 lg:px-0 xl:w-10/12">
      <BreadCrumb items={breadcrumbItems} />
      <div className="mb-16 flex w-full flex-col gap-8">
        <div className="flex w-full flex-col gap-3">
          <span className="text-center text-sm text-stone-800 sm:text-base lg:text-lg">
            تخفیف ها
          </span>
          <hr className="h-px w-full bg-stone-400" />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-3 lg:gap-x-8 lg:gap-y-14 xl:grid-cols-4 2xl:grid-cols-5">
          {products.map((item, index) => (
            <div key={index}>
              <ProductCard
                product={item}
                buttonOptions={{
                  text: "مشاهده سریع",
                  iconName: "faSearch",
                  onClick: (
                    product: ProductModel,
                    isProductModalOpen: boolean
                  ) => {
                    setSelectedProduct(product);
                    setIsProductModalOpen(isProductModalOpen);
                  },
                }}
                viewOptions={{
                  colorVisibility: "onHover",
                  sizeVisibility: "onHover",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <ProductModal
          onRequestClose={() => {
            setIsProductModalOpen(false);
            setSelectedProduct(null);
          }}
          primaryButtonLabel="اضافه به سبد خرید"
          isOpen={isProductModalOpen}
          product={selectedProduct}
          onOpenChange={(value) => setIsProductModalOpen(value)}
          onPrimaryAction={({ selectedColor, selectedSize }) => {
            addItem({
              id: Math.ceil(Math.random() * 1000) + Date.now(),
              product: selectedProduct,
              color: selectedColor,
              size: selectedSize,
              image: selectedProduct.getImagesByColor(selectedColor)?.[0],
            });
            openBasketPopUp();
            closeBasketPopUp();
          }}
        />
      )}
    </div>
  );
}
