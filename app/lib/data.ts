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
};

export async function getBannerData() {
  try {
    const response = await fetch(urls.getBanners.href);
    const body: responseBody = await response.json();
    const data = body.data.map((item) => ({
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
  }
}
export async function getNavbarItems() {
  try {
    urls.getNavbarItems.search = new URLSearchParams({
      sort: "index:desc",
      populate: "image",
    }).toString();
    const response = await fetch(urls.getNavbarItems.href);
    const body: responseBody = await response.json();
    const data = body.data as NavbarItem[];
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getHeroBanners() {
  try {
    urls.getHeroBanners.search = new URLSearchParams({
      populate: "image",
    }).toString();
    const response = await fetch(urls.getHeroBanners.href);
    const body: responseBody = await response.json();
    const data = body.data as HeroBanner[];
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCategories() {
  try {
    urls.getCategories.search = new URLSearchParams({
      sort: "index",
      populate: "image",
    }).toString();
    const response = await fetch(urls.getCategories.href, {
      cache: "no-cache", // don't cache
    });
    const body: responseBody = await response.json();
    const data = body.data as Category[];
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getClotheSetBanners() {
  try {
    urls.getClotheSetBanners.search = new URLSearchParams({
      populate: "image",
    }).toString();
    const response = await fetch(urls.getClotheSetBanners.href);
    const body: responseBody = await response.json();
    const data = body.data as ClotheSetBanner[];
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getClotheProducts() {
  try {
    urls.getClotheProducts.search = new URLSearchParams({
      sort: "createdAt",
      populate: "image",
    }).toString();
    const response = await fetch(urls.getClotheProducts.href);
    const body: responseBody = await response.json();
    const data = body.data as ClotheProduct[];
    return data;
  } catch (error) {
    console.error(error);
  }
}
