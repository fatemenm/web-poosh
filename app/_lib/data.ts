import { apiBaseUrl } from "@config";

import { ProductModel } from "@/_models/product.model";

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
  getBanners: apiBaseUrl + "/api/banners",
  getNavbarItems: apiBaseUrl + "/api/navbar-items",
  getHeroBanners: apiBaseUrl + "/api/hero-banners",
  getCategories: apiBaseUrl + "/api/categories",
  getClotheSetBanners: apiBaseUrl + "/api/clothe-set-banners",
  getProductById: apiBaseUrl + "/api/products/:id",
  getProducts: apiBaseUrl + "/api/products",
};
type optionsType = {
  sort?: string;
  populates?: string[];
  pathParams?: Record<string, string>;
};

function createUrl(baseUrl: string, options: optionsType = {}) {
  const url = new URL(baseUrl);
  const params = new URLSearchParams({});
  if (options.sort) params.append("sort", options.sort);
  if (options.populates)
    for (const [index, query] of options.populates.entries()) {
      params.append(`populate[${index}]`, query);
    }
  if (options.pathParams) {
    for (const [key, value] of Object.entries(options.pathParams)) {
      url.pathname = url.pathname.replace(`:${key}`, value);
    }
  }
  url.search = params.toString();
  return url;
}

export async function getPromoBannerData() {
  try {
    const url = createUrl(urls.getBanners);
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
    const url = createUrl(urls.getNavbarItems, {
      sort: "index",
      populates: ["image"],
    });
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
    const url = createUrl(urls.getHeroBanners, { populates: ["image"] });
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
    const url = createUrl(urls.getCategories, {
      populates: ["filters", "filters.image", "image", "sizeGuideImage"],
    });
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
    const url = createUrl(urls.getClotheSetBanners, { populates: ["image"] });
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
    const url = createUrl(urls.getProducts, {
      populates: [
        "imagesByColor",
        "imagesByColor.images",
        "category",
        "category.image",
        "category.sizeGuideImage",
      ],
    });
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
    const url = createUrl(urls.getProductById, {
      populates: [
        "imagesByColor",
        "imagesByColor.images",
        "category",
        "category.image",
        "category.sizeGuideImage",
      ],
      pathParams: { id: documentId },
    });
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const body: responseBody = await response.json();
    const data = body.data as Product;
    return new ProductModel(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
