import { apiBaseUrl } from "@config";

import {
  Category,
  ClotheSetBanner,
  HeroBanner,
  NavbarItem,
  Product,
  PromoBanner,
  responseBody,
} from "./definitions";

const urls = {
  getBanners: new URL("/api/banners", apiBaseUrl),
  getNavbarItems: new URL("/api/navbar-items", apiBaseUrl),
  getHeroBanners: new URL("/api/hero-banners", apiBaseUrl),
  getCategories: new URL("/api/categories", apiBaseUrl),
  getClotheSetBanners: new URL("/api/clothe-set-banners", apiBaseUrl),
  getProductById: new URL("/api/products/:id", apiBaseUrl),
  getProducts: new URL("/api/products", apiBaseUrl),
};

export async function getPromoBannerData() {
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
    })) as PromoBanner[];
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
    throw error;
  }
}
export async function getNavbarItems() {
  try {
    const url = new URL(urls.getNavbarItems);
    url.search = new URLSearchParams({
      sort: "index",
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
    throw error;
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
    throw error;
  }
}

export async function getCategories() {
  try {
    const url = new URL(urls.getCategories);
    const populateFields = [
      "filters",
      "filters.image",
      "image",
      "sizeGuideImage",
    ];
    const params = new URLSearchParams();
    params.append("sort", "index");
    populateFields.forEach((field, index) =>
      params.append(`populate[${index}]`, field)
    );

    url.search = params.toString();
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const body: responseBody = await response.json();
    const data = body.data as Category[];
    return data;
  } catch (error) {
    console.error(error);
    throw error;
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
    throw error;
  }
}

export async function getProducts() {
  try {
    const url = new URL(urls.getProducts);
    const populateFields = [
      "imagesByColor",
      "imagesByColor.images",
      "category",
      "category.image",
      "category.sizeGuideImage",
    ];
    const params = new URLSearchParams();
    populateFields.forEach((field, index) =>
      params.append(`populate[${index}]`, field)
    );

    url.search = params.toString();
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const body: responseBody = await response.json();
    const data = body.data as Product[];
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getProductById(documentId: string) {
  try {
    const url = new URL(urls.getProductById);
    url.pathname = url.pathname.replace(":id", documentId);
    const populateFields = [
      "imagesByColor",
      "imagesByColor.images",
      "category",
      "category.image",
      "category.sizeGuideImage",
    ];
    const params = new URLSearchParams();
    populateFields.forEach((field, index) =>
      params.append(`populate[${index}]`, field)
    );
    url.search = params.toString();
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const body: responseBody = await response.json();
    const data = body.data as Product;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
