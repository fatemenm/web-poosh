"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";

import ProductCard from "@/(pages)/_components/productCard";
import Accordion from "@/_components/accordion";
import BreadCrumb from "@/_components/breadcrumb";
import { getCategories, getProducts } from "@/_lib/data";
import { Category, Product } from "@/_lib/definitions";

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
  useEffect(() => {
    const getData = async () => {
      const categories = await getCategories();
      const products = await getProducts();
      setCategories(categories);
      setProducts(products);
    };
    getData();
  }, []);
  if (!categories || !products) return <div>data is not available</div>;
  return (
    <div className="mx-auto flex w-10/12 flex-col gap-16">
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex flex-row gap-20">
        {/* right navbar */}
        <div className="w-72">
          <Accordion buttonText="لباس">
            <ul className="flex flex-col space-y-3 pr-3">
              {categories.map((item, index) => (
                <li className="text-sm font-light text-stone-700" key={index}>
                  <Link href="/">{item.name}</Link>
                </li>
              ))}
            </ul>
          </Accordion>
        </div>
        <div className="flex w-full flex-col gap-8">
          {/* products grid */}
          <div className="flex w-full flex-col gap-3">
            <span className="text-lg text-stone-800">جدیدترین ها</span>
            <hr className="h-px w-full bg-stone-400" />
          </div>
          <div className="grid grid-cols-4 gap-x-8 gap-y-14">
            {products.map((item, index) => (
              <div key={index}>
                <ProductCard data={item} />
              </div>
            ))}
          </div>
          {/* pagination */}
          {/* <div className="bg-slate-50 py-4">
            <hr />
            here we have pagination
          </div> */}
        </div>
      </div>
    </div>
  );
}
