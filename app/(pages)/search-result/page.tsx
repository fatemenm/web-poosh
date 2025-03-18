"use client";

import classNames from "classnames";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import BreadCrumb from "@/_components/breadcrumb";
import { getProducts } from "@/_lib/data";
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

import ProductCard from "../_components/productCard";

export default function Page() {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [pagination, setPagination] = useState<PaginationType>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pageNumber = Number(searchParams.get("page") ?? 1);
  // FIXME: handle type search query
  const searchQuery = searchParams.get("search") ?? "";

  useEffect(() => {
    const getData = async () => {
      const res = await getProducts({
        search: { name: searchQuery },
        pagination: {
          page: pageNumber,
          pageSize: 1,
        },
      });
      setProducts(res.products);
      setPagination(res.pagination);
    };
    getData();
  }, [searchParams]);

  const breadcrumbItems = [
    {
      label: "وب پوش",
      href: "/",
    },
    {
      label: "نتایج جستجو",
      href: ".",
    },
  ];
  function updatePageNumber(pageNum: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNum.toString());
    return `${pathname}?${params.toString()}`;
  }
  return (
    <div className="mx-auto flex w-10/12 flex-col gap-16">
      <BreadCrumb items={breadcrumbItems} />
      <div className="mb-16 flex w-full flex-col gap-8">
        {/* products grid */}
        <div className="flex w-full flex-col gap-3">
          <span className="text-lg text-stone-800"> لیست محصولات </span>
          <hr className="h-px w-full bg-stone-400" />
        </div>
        <div className="grid grid-cols-5 gap-x-8 gap-y-14">
          {products.map((item) => (
            <div key={item.data.id}>
              <ProductCard product={item} />
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
  );
}
