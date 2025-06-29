"use client";

import { nextServerUrl } from "@config";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

import BreadCrumb from "@/components/layout/breadcrumb";
import Accordion from "@/components/navigation/accordion";
import ProductCard from "@/features/product/productCard";
import ProductModal from "@/features/product/productModal";
import { useBasket } from "@/lib/context/basketContext";
import { getCategories, getProducts } from "@/lib/data";
import { Category } from "@/lib/definitions";
import { Pagination as PaginationType } from "@/lib/definitions";
import { ProductModel } from "@/models/product.model";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";

const breadcrumbItems = [
  {
    label: "جدیدترین ها",
    href: "",
  },
];

export default function Page() {
  const [categories, setCategories] = useState<Category[] | null>();
  const [products, setProducts] = useState<ProductModel[] | null>();
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(
    null
  );
  const [pagination, setPagination] = useState<PaginationType | undefined>();
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pageNumber = Number(searchParams.get("page") ?? 1);
  const { addItem } = useBasket();

  useEffect(() => {
    const getData = async () => {
      const categories = await getCategories();
      setCategories(categories);
      const { products, pagination } = await getProducts({
        pagination: {
          page: pageNumber,
          pageSize: 3,
        },
      });
      setProducts(products);
      setPagination(pagination);
    };
    getData();
  }, [searchParams, pageNumber]);

  function updatePageNumber(pageNum: number) {
    const params = new URLSearchParams({ page: pageNum.toString() });
    return `${pathname}?${params.toString()}`;
  }

  if (!categories || !products) return <div>data is not available</div>;

  return (
    <div className="mx-auto flex w-full flex-col gap-8 px-4 lg:w-11/12 lg:gap-16 lg:px-0 xl:w-10/12">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex flex-row gap-20 pb-10">
        {/* right navbar */}
        <div className="hidden lg:block lg:w-72">
          <Accordion
            defaultOpenItem="item-0"
            triggerButtonText={["لباس"]}
            triggerButtonClass="text-sm px-3"
            items={[
              categories.map((item) => (
                <div
                  key={item.documentId}
                  className="py-2 pr-3 text-sm font-light text-stone-700"
                >
                  <Link href={nextServerUrl + "/category/" + item.documentId}>
                    {item.name}
                  </Link>
                </div>
              )),
            ]}
          />
        </div>
        <div className="mb-16 flex w-full flex-col gap-8">
          {/* products grid */}
          <div className="flex w-full flex-col gap-3">
            <span className="text-sm text-stone-800 sm:text-base lg:text-lg">
              جدیدترین ها
            </span>
            <hr className="h-px w-full bg-stone-400" />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-3 lg:gap-x-8 lg:gap-y-14 xl:grid-cols-4">
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
          {pagination?.pageCount && (
            <Pagination className="mr-0 w-fit">
              <PaginationContent className="flex-wrap">
                <PaginationItem>
                  <PaginationPrevious
                    className={classNames("rounded-none", {
                      "pointer-events-none text-gray-400": pageNumber < 2,
                    })}
                    href={updatePageNumber(pageNumber - 1)}
                  />
                </PaginationItem>
                {Array(pagination?.pageCount)
                  .fill(0)
                  .map((item, index) => (
                    <div key={index}>
                      <PaginationItem>
                        <PaginationLink
                          className={classNames(
                            "rounded-none font-medium text-stone-700",
                            {
                              "pointer-events-none bg-stone-800 text-white":
                                pageNumber === index + 1,
                            }
                          )}
                          href={updatePageNumber(index + 1)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    </div>
                  ))}
                <PaginationItem>
                  <PaginationNext
                    className={classNames("rounded-none", {
                      "pointer-events-none text-gray-400":
                        pageNumber + 1 > pagination?.pageCount,
                    })}
                    href={updatePageNumber(pageNumber + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
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
          }}
        />
      )}
    </div>
  );
}
