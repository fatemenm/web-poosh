"use client";

import { apiBaseUrl, nextServerUrl } from "@config";
import {
  faChevronLeft,
  faClose,
  faList,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { ProductModel } from "@/_models/product.model";

export default function SearchBar({
  isOpen,
  searchQuery,
  onChangeOpen,
  onChangeSearchQuery,
  items,
}: {
  isOpen: boolean;
  searchQuery: string;
  onChangeOpen: (isOpen: boolean) => void;
  onChangeSearchQuery: (value: string) => void;
  items: ProductModel[];
}) {
  const inputRef = useRef(null);
  return (
    <div className="relative flex items-center justify-end pl-4">
      {/* search button */}
      <button
        className={`absolute left-4 top-2 w-fit ${isOpen ? "right-4 top-2 cursor-default text-stone-500" : "text-stone-600 hover:text-stone-800"}`}
        onMouseDown={(e) => e.preventDefault()}
        onClick={
          isOpen
            ? undefined
            : () => {
                onChangeOpen(true);
                if (inputRef && inputRef.current) {
                  const element = inputRef.current as HTMLInputElement;
                  element.focus();
                }
              }
        }
      >
        <FontAwesomeIcon icon={faSearch} className="text-xl" />
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
        className={`rounded-sm bg-white py-2 placeholder:text-sm placeholder:text-stone-500 ${isOpen ? "block w-full border border-stone-300 pl-9 pr-11 focus:outline-none" : "w-0 p-0"}`}
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
          className="absolute left-7 top-3 w-fit"
        >
          <FontAwesomeIcon
            icon={faClose}
            className="text-lg text-stone-500 hover:text-stone-800"
          />
        </button>
      )}
      {/* drop down menu */}
      {isOpen && items?.length > 0 && (
        <div className="absolute left-4 top-12 z-20 flex w-[21vw] flex-col gap-5 rounded-sm border bg-white p-6">
          <p className="flex items-center gap-3 text-stone-600">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-md hover:text-stone-800"
            />
            <span className="pt-1 text-sm font-medium"> لیست محصولات</span>
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
                  className="flex items-center gap-3 text-stone-600 hover:text-stone-900"
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
                  <span className="text-sm">{p.data.name}</span>
                </Link>
              );
            })}
          </div>
          <p className="flex items-center gap-3 text-stone-600 hover:text-stone-900">
            <FontAwesomeIcon icon={faList} className="text-md" />
            <Link
              onClick={() => {
                onChangeOpen(false);
                onChangeSearchQuery("");
              }}
              onMouseDown={(e) => e.preventDefault()}
              href={nextServerUrl + "/search-result"}
              className="text-sm font-medium underline underline-offset-8"
            >
              مشاهده همه نتایج محصول
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
