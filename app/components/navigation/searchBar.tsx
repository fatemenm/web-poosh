"use client";

import { apiBaseUrl, nextServerUrl } from "@config";
import {
  faChevronLeft,
  faClose,
  faList,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getProducts } from "@/lib/data";
import { ProductModel } from "@/models/product.model";

export default function SearchBar({
  variant = "desktop",
  OnChangeMenuOpen,
}: {
  variant: "desktop" | "mobile";
  OnChangeMenuOpen?: (isOpen: boolean) => void;
}) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<ProductModel[]>([]);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const res = await getProducts({
        search: { name: query },
        pagination: {
          page: 1,
          pageSize: 3,
        },
      });
      setResults(res.products);
    };
    if (query && isExpanded) getData();
    return () => setResults([]);
  }, [query, isExpanded]);
  return (
    <div className="relative flex items-center justify-end">
      {/* search button */}
      <button
        className={classNames(
          "absolute top-2 w-fit text-stone-600 hover:text-stone-800",
          {
            "right-4 top-2 cursor-default text-stone-500":
              isExpanded && variant === "desktop",
            "bottom-1 left-1 right-1 top-1 rounded-br-sm rounded-tr-sm border-l bg-stone-100 px-2 pt-1 text-stone-400 hover:bg-stone-200 hover:text-stone-800":
              variant === "mobile",
          }
        )}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          if (variant === "mobile") {
            router.push(nextServerUrl + "/search-result?search=" + query);
            setQuery("");
            setIsExpanded(false);
            if (OnChangeMenuOpen) OnChangeMenuOpen(false);
          } else if (variant === "desktop") {
            if (!isExpanded) {
              setIsExpanded(true);
              if (inputRef && inputRef.current) {
                const element = inputRef.current as HTMLInputElement;
                element.focus();
              }
            }
          }
        }}
      >
        <FontAwesomeIcon icon={faSearch} className="text-lg xl:text-xl" />
      </button>
      {/* input */}
      <input
        ref={inputRef}
        value={query}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => {
          setIsExpanded(false);
          setQuery("");
        }}
        onChange={(e) => setQuery(e.target.value)}
        type="search"
        placeholder="جستجو..."
        className={`rounded-sm bg-white py-2 placeholder:text-sm placeholder:text-stone-500 ${isExpanded || variant === "mobile" ? "block w-full border border-stone-300 pl-9 pr-11 focus:outline-none" : "w-0 p-0"}`}
      />
      {/* close button */}
      {isExpanded && (
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setQuery("");
            if (inputRef && inputRef.current) {
              const element = inputRef.current as HTMLInputElement;
              element.focus();
            }
          }}
          className="absolute left-3 top-3 w-fit"
        >
          <FontAwesomeIcon
            icon={faClose}
            className="text-lg text-stone-500 hover:text-stone-800 xl:text-xl"
          />
        </button>
      )}
      {/* drop down menu */}
      {variant === "desktop" && results?.length > 0 && (
        <div className="absolute left-0 top-12 z-20 hidden w-full flex-col gap-5 rounded-sm border bg-white px-3 py-4 lg:flex xl:p-6">
          <p className="flex items-center gap-3 text-stone-600">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-sm hover:text-stone-800 lg:text-lg xl:text-xl"
            />
            <span className="pt-1 text-xs font-medium xl:text-sm">
              {" "}
              لیست محصولات
            </span>
          </p>
          <div className="flex flex-col gap-2">
            {results.map((p) => {
              const img = p.data.imagesByColor[0].images[0];
              return (
                <Link
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setIsExpanded(false);
                    setQuery("");
                  }}
                  href={nextServerUrl + "/products/" + p.data.documentId}
                  className="flex items-center gap-3 text-xs text-stone-600 hover:text-stone-900 xl:text-sm"
                  key={p.data.documentId}
                >
                  <div className="w-12">
                    <Image
                      width={img.width}
                      height={img.height}
                      alt={img.alternativeText}
                      src={apiBaseUrl + img.url}
                    />
                  </div>
                  <span className="">{p.data.name}</span>
                </Link>
              );
            })}
          </div>
          <p className="flex items-center gap-3 text-stone-600 hover:text-stone-900">
            <FontAwesomeIcon
              icon={faList}
              className="text-sm lg:text-lg xl:text-xl"
            />
            <Link
              onClick={() => {
                setIsExpanded(false);
                setQuery("");
              }}
              onMouseDown={(e) => e.preventDefault()}
              href={nextServerUrl + "/search-result?search=" + query}
              className="w-full text-xs font-medium underline underline-offset-8 xl:text-sm"
            >
              مشاهده همه نتایج محصول
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
