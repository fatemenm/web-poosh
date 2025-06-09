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
import { useRef } from "react";

import { ProductModel } from "@/models/product.model";

export default function SearchBar({
  isOpen,
  searchQuery,
  onChangeOpen,
  onChangeSearchQuery,
  items,
  variant = "header",
  OnChangeMenuOpen,
}: {
  isOpen: boolean;
  searchQuery: string;
  onChangeOpen: (isOpen: boolean) => void;
  onChangeSearchQuery: (value: string) => void;
  items: ProductModel[];
  variant: "header" | "menu";
  OnChangeMenuOpen?: (value: boolean) => void;
}) {
  const inputRef = useRef(null);
  const router = useRouter();
  return (
    <div className="relative flex items-center justify-end">
      {/* search button */}
      <button
        className={classNames(
          "absolute top-2 w-fit text-stone-600 hover:text-stone-800",
          {
            "right-4 top-2 cursor-default text-stone-500":
              isOpen && variant === "header",
            "bottom-1 left-1 right-1 top-1 rounded-br-sm rounded-tr-sm border-l bg-stone-100 px-2 pt-1 text-stone-400 hover:bg-stone-200 hover:text-stone-800":
              variant === "menu",
          }
        )}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          if (variant === "menu") {
            router.push(nextServerUrl + "/search-result?search=" + searchQuery);
            onChangeSearchQuery("");
            onChangeOpen(false);
            if (OnChangeMenuOpen) OnChangeMenuOpen(false);
          } else if (variant === "header") {
            if (!isOpen) {
              onChangeOpen(true);
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
        value={searchQuery}
        onFocus={() => onChangeOpen(true)}
        onBlur={() => {
          onChangeOpen(false);
          onChangeSearchQuery("");
        }}
        onChange={(e) => onChangeSearchQuery(e.target.value)}
        type="search"
        placeholder="جستجو..."
        className={`rounded-sm bg-white py-2 placeholder:text-sm placeholder:text-stone-500 ${isOpen || variant === "menu" ? "block w-full border border-stone-300 pl-9 pr-11 focus:outline-none" : "w-0 p-0"}`}
      />
      {/* close button */}
      {isOpen && (
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            onChangeSearchQuery("");
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
      {isOpen && items?.length > 0 && (
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
            {items.map((p) => {
              const img = p.data.imagesByColor[0].images[0];
              return (
                <Link
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChangeOpen(false);
                    onChangeSearchQuery("");
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
                onChangeOpen(false);
                onChangeSearchQuery("");
              }}
              onMouseDown={(e) => e.preventDefault()}
              href={nextServerUrl + "/search-result?search=" + searchQuery}
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
