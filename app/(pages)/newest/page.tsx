"use client";

import { nextServerUrl } from "@config";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

import ProductCard from "@/(pages)/_components/productCard";
import ProductModal from "@/(pages)/_components/productModal";
import Accordion from "@/_components/accordion";
import BreadCrumb from "@/_components/breadcrumb";
import { useBasket } from "@/_lib/context/basketContext";
import { useBreadcrumb } from "@/_lib/context/breadcrumbContext";
import { getCategories, getProducts } from "@/_lib/data";
import { Category } from "@/_lib/definitions";
import { Pagination as PaginationType } from "@/_lib/definitions";
import { ProductModel } from "@/_models/product.model";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const breadcrumbItems = [
  {
    label: "وب پوش",
    href: "/",
  },
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
  const { addItem, openBasketPopUp, closeBasketPopUp } = useBasket();
  const { setItems } = useBreadcrumb();
  useEffect(() => {
    setItems(breadcrumbItems);
  }, [setItems]);

  useEffect(() => {
    const getData = async () => {
      const categories = await getCategories();
      setCategories(categories);
      const { products, pagination } = await getProducts({
        pagination: {
          page: pageNumber,
          pageSize: 1,
        },
      });
      setProducts(products);
      setPagination(pagination);
    };
    getData();
  }, [searchParams]);

  function updatePageNumber(pageNum: number) {
    const params = new URLSearchParams({ page: pageNum.toString() });
    return `${pathname}?${params.toString()}`;
  }

  if (!categories || !products) return <div>data is not available</div>;

  return (
    <div className="mx-auto flex w-10/12 flex-col gap-16">
      <BreadCrumb />
      <div className="flex flex-row gap-20 pb-10">
        {/* right navbar */}
        <div className="w-72">
          <Accordion
            defaultOpenItem="item-0"
            triggerButtonText={["لباس"]}
            triggerButtonClass="text-sm"
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
            <span className="text-lg text-stone-800">جدیدترین ها</span>
            <hr className="h-px w-full bg-stone-400" />
          </div>
          <div className="grid grid-cols-4 gap-x-8 gap-y-14">
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
              <PaginationContent>
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
            openBasketPopUp();
            closeBasketPopUp();
          }}
        />
      )}
    </div>
  );
}
