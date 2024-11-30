import { apiBaseUrl } from "@config";

import {
  Banner,
  Category,
  ClotheProduct,
  ClotheSetBanner,
  HeroBanner,
  NavbarItem,
  responseBody,
} from "./definitions";

const urls = {
  getBanners: new URL("/api/banners", apiBaseUrl),
  getNavbarItems: new URL("/api/navbar-items", apiBaseUrl),
  getHeroBanners: new URL("/api/hero-banners", apiBaseUrl),
  getCategories: new URL("/api/categories", apiBaseUrl),
  getClotheSetBanners: new URL("/api/clothe-set-banners", apiBaseUrl),
  getClotheProducts: new URL("/api/clothe-products", apiBaseUrl),
  getClotheProductById: new URL("/api/clothe-products/:id", apiBaseUrl),
};

export async function getBannerData() {
  try {
    const url = new URL(urls.getBanners);
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const body: responseBody = await response.json();
    if (!Array.isArray(body.data)) {
      throw new Error("invalid data");
    }
    const data = body?.data?.map((item) => ({
      ...item,
      startDate: new Date(item.startDate as string),
      endDate: new Date(item.endDate as string),
    })) as Banner[];
    const now: Date = new Date();
    const earliestActiveBanner = data
      .filter((banner) => {
        return banner.startDate < now && banner.endDate > now && banner;
      })
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      .pop();
    return earliestActiveBanner;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function getNavbarItems() {
  try {
    const url = new URL(urls.getNavbarItems);
    url.search = new URLSearchParams({
      sort: "index:desc",
      populate: "image",
    }).toString();
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const body: responseBody = await response.json();
    const data = body.data as NavbarItem[];
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getHeroBanners() {
  try {
    const url = new URL(urls.getHeroBanners);
    url.search = new URLSearchParams({
      populate: "image",
    }).toString();
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const body: responseBody = await response.json();
    const data = body.data as HeroBanner[];
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getCategories() {
  try {
    const url = new URL(urls.getCategories);
    url.search = new URLSearchParams({
      sort: "index",
      populate: "image",
    }).toString();
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const body: responseBody = await response.json();
    const data = body.data as Category[];
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getClotheSetBanners() {
  try {
    const url = new URL(urls.getClotheSetBanners);
    url.search = new URLSearchParams({
      populate: "image",
    }).toString();
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const body: responseBody = await response.json();
    const data = body.data as ClotheSetBanner[];
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getClotheProducts() {
  try {
    const url = new URL(urls.getClotheProducts);
    url.search = new URLSearchParams({
      populate: "images",
    }).toString();
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const body: responseBody = await response.json();
    const data = body.data as ClotheProduct[];
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function getClotheProductById(documentId: string) {
  try {
    const url = new URL(urls.getClotheProductById);
    url.pathname = url.pathname.replace(":id", documentId);
    url.search = new URLSearchParams({
      populate: "images",
    }).toString();
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const body: responseBody = await response.json();
    const data = body.data as ClotheProduct;
    return data;
  } catch (error) {
    // TODO: how to fix the error type ts in the file I use this function? (when returning error)
    console.error(error);
  }
}
