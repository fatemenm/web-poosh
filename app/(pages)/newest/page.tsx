"use client";

import classNames from "classnames";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";

import ProductCard from "@/(pages)/_components/productCard";
import Accordion from "@/_components/accordion";
import BreadCrumb from "@/_components/breadcrumb";
import { getCategories, getProducts } from "@/_lib/data";
import { Category, Product } from "@/_lib/definitions";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
  const [products, setProducts] = useState<Product[] | null>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 12;
  const currentPageProducts = products?.slice(
    productsPerPage * (currentPage - 1),
    productsPerPage * (currentPage - 1) + productsPerPage
  );
  useEffect(() => {
    const getData = async () => {
      const categories = await getCategories();
      const products = await getProducts();
      setCategories(categories);
      setProducts(products);
    };
    getData();
  }, []);
  if (!categories || !products || !currentPageProducts)
    return <div>data is not available</div>;
  const totalPages = products?.length / productsPerPage;
  return (
    <div className="mx-auto flex w-10/12 flex-col gap-16">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex flex-row gap-20">
        {/* right navbar */}
        <div className="w-72">
          <Accordion
            defaultOpenItem="item-0"
            triggerButtonText={["لباس"]}
            triggerButtonClass="text-sm"
            items={[
              <ul className="flex flex-col space-y-3 pr-3">
                {categories.map((item, index) => (
                  <li className="text-sm font-light text-stone-700" key={index}>
                    <Link href="/">{item.name}</Link>
                  </li>
                ))}
              </ul>,
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
            {currentPageProducts.map((item, index) => (
              <div key={index}>
                <ProductCard data={item} />
              </div>
            ))}
          </div>
          {/* pagination */}
          <Pagination className="mr-0 w-fit">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    if (currentPage < 2) e.preventDefault();
                    else setCurrentPage((prev) => prev - 1);
                  }}
                  className={classNames("rounded-none", {
                    "pointer-events-none text-gray-400": currentPage < 2,
                  })}
                  href="#"
                />
              </PaginationItem>
              {Array(Math.ceil(totalPages))
                .fill(0)
                .map((item, index) => (
                  <div key={index}>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setCurrentPage(index + 1)}
                        className={classNames(
                          "rounded-none font-medium text-stone-700",
                          {
                            "pointer-events-none bg-stone-800 text-white":
                              currentPage === index + 1,
                          }
                        )}
                        href="#"
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  </div>
                ))}
              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    if (currentPage > totalPages) e.preventDefault();
                    else setCurrentPage((prev) => prev + 1);
                  }}
                  className={classNames("rounded-none", {
                    "pointer-events-none text-gray-400":
                      currentPage > totalPages,
                  })}
                  href="#"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
