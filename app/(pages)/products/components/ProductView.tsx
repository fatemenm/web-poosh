"use client";

import { useState } from "react";

import ProductDescription from "@/features/product/productDescription";
import ProductDetails from "@/features/product/productDetails";
import SizeGuideModal from "@/features/product/sizeGuideModal";
import { Product } from "@/lib/definitions";
import { ProductModel } from "@/models/product.model";

export default function ProductView({ data }: { data: Product }) {
  const product = new ProductModel(data);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const defaultColor = product?.getAvailableColors()[0].name;
  const [isSizeGuideModalOpen, setIsSizeGuideModalOpen] =
    useState<boolean>(false);
  return (
    <>
      <ProductDetails
        onClickSizeGuideLink={() => setIsSizeGuideModalOpen(true)}
        product={product}
        selectedColor={selectedColor ?? defaultColor}
        onSelectColor={(value: string) => setSelectedColor(value)}
      />
      <ProductDescription
        onClickSizeGuideLink={() => setIsSizeGuideModalOpen(true)}
        product={product}
        images={product.getImagesByColor(selectedColor ?? defaultColor)}
      />
      <SizeGuideModal
        isOpen={isSizeGuideModalOpen}
        onChangeOpen={(value: boolean) => setIsSizeGuideModalOpen(value)}
        data={{
          sizeTableInfo: product.data.category.sizeTable,
          information: product.data.information,
          sizeGuideImage: product.data.category.sizeGuideImage,
          productName: product.data.name,
          productImages: product.getImagesByColor(
            selectedColor ?? defaultColor
          ),
        }}
      />
    </>
  );
}
