"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { ProductModel } from "@/models/product.model";

import { BasketItem, Image, Product } from "../definitions";

type basketContextType = {
  items: BasketItem[];
  addItem: (item: BasketItem) => void;
  removeItem: (item: BasketItem) => void;
  editItem: (item: BasketItem) => void;
};

type StorageBasketItems = {
  id: number;
  color: string;
  size: string;
  image: Image;
  product: Product;
};

const basketContext = createContext<basketContextType | null>(null);

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  useEffect(() => {
    setItems(mapStorageToBasketItems());
  }, []);

  const mapStorageToBasketItems = () => {
    const data = JSON.parse(localStorage.getItem("basketItems") ?? "{}");
    if (Object.keys(data).length === 0) return [];
    const storageBasketItems = Object.values(data) as StorageBasketItems[];
    const items = storageBasketItems.map((item) => {
      return {
        id: item.id,
        color: item.color,
        size: item.size,
        image: item.image,
        product: new ProductModel(item.product),
      };
    });
    return items;
  };

  const mapBasketItemToStorage = (items: BasketItem[]) => {
    const newItems = items.map((item) => {
      return {
        id: item.id,
        color: item.color,
        size: item.size,
        image: item.image,
        product: item.product.data,
      };
    });
    return newItems;
  };

  const addItem = (item: BasketItem) => {
    const items = mapStorageToBasketItems();
    setItems([...items, item]);
    const storageItems = mapBasketItemToStorage(items);
    localStorage.setItem(
      "basketItems",
      JSON.stringify([
        ...storageItems,
        {
          id: item.id,
          color: item.color,
          size: item.size,
          image: item.image,
          product: item.product.data,
        },
      ])
    );
  };

  const removeItem = (item: BasketItem) => {
    const newItems = mapStorageToBasketItems().filter((i) => i.id !== item.id);
    setItems(newItems);
    const storageNewItems = mapBasketItemToStorage(newItems);
    localStorage.setItem("basketItems", JSON.stringify(storageNewItems));
  };

  const editItem = (item: BasketItem) => {
    const basketItems = mapStorageToBasketItems();
    if (!basketItems.find((i) => i.id === item.id)) return;
    const newItems = basketItems.map((i) => (i.id === item.id ? item : i));
    setItems(newItems);
    const storageItems = mapBasketItemToStorage(newItems);
    localStorage.setItem("basketItems", JSON.stringify(storageItems));
  };

  return (
    <basketContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        editItem,
      }}
    >
      {children}
    </basketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(basketContext);
  if (!context)
    throw new Error("useBasket must be used within a BasketProvider");
  return context;
}
