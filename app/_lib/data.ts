import { apiBaseUrl } from "@config";
import qs from "qs";

// import { stringify } from "querystring";
import { ProductModel } from "@/_models/product.model";

import {
  AuthResponseBody,
  Category,
  ClotheSetBanner,
  Color,
  GetResponseBody,
  HeroBanner,
  NavbarItem,
  Product,
  PromoBanner,
} from "./definitions";

const urls = {
  getBanners: apiBaseUrl + "/api/banners",
  getNavbarItems: apiBaseUrl + "/api/navbar-items",
  getHeroBanners: apiBaseUrl + "/api/hero-banners",
  getCategories: apiBaseUrl + "/api/categories",
  getCategoryById: apiBaseUrl + "/api/categories/:id",
  getCategoryAvailableOptions:
    apiBaseUrl + "/api/categories/:id/available-options",
  getClotheSetBanners: apiBaseUrl + "/api/clothe-set-banners",
  getProductById: apiBaseUrl + "/api/products/:id",
  getProducts: apiBaseUrl + "/api/products",
  signUp: apiBaseUrl + "/api/auth/local/register",
  signIn: apiBaseUrl + "/api/auth/local",
};

type queryType = {
  filters?: Record<string, unknown>;
  populate?: Record<string, unknown>;
  sort?: string[];
  fields?: string[];
};

async function fetchData(data: {
  baseUrl: string;
  query?: queryType;
  pathParams?: Record<string, string>;
}) {
  try {
    const url = new URL(data.baseUrl);
    if (data.pathParams) {
      for (const [key, value] of Object.entries(data.pathParams)) {
        url.pathname = url.pathname.replace(`:${key}`, value);
      }
    }
    const query = qs.stringify(data.query);
    url.search = query;
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const body: GetResponseBody = await response.json();
    return body;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function signUp(email: string, password: string) {
  try {
    const url = new URL(urls.signUp);
    const response = await fetch(url.href, {
      method: "POST",
      body: JSON.stringify({ username: email, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to send data");
    const body: AuthResponseBody = await response.json();
    return body;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const url = new URL(urls.signIn);
    const response = await fetch(url.href, {
      method: "POST",
      body: JSON.stringify({ identifier: email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to send data");
    const body: AuthResponseBody = await response.json();
    return body;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function signOut() {}

// const res = await signIn("kianoosh@test.com", "123456");
// console.log("login res:", res);

export async function getPromoBannerData() {
  const body: GetResponseBody = await fetchData({ baseUrl: urls.getBanners });
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
}

export async function getNavbarItems() {
  const body: GetResponseBody = await fetchData({
    baseUrl: urls.getNavbarItems,
    query: {
      sort: ["index"],
      populate: {
        image: "*",
      },
    },
  });

  return body.data as NavbarItem[];
}

export async function getHeroBanners() {
  const body: GetResponseBody = await fetchData({
    baseUrl: urls.getHeroBanners,
    query: {
      populate: {
        image: "*",
      },
    },
  });
  return body.data as HeroBanner[];
}

export async function getCategories() {
  const body: GetResponseBody = await fetchData({
    baseUrl: urls.getCategories,
    query: {
      populate: {
        preSetFilters: {
          populate: {
            image: "*",
          },
        },
        image: "*",
        sizeGuideImage: "*",
      },
      sort: ["index"],
    },
  });

  return body.data as Category[];
}

export async function getCategoryById(documentId: string) {
  const body: GetResponseBody = await fetchData({
    baseUrl: urls.getCategoryById,
    query: {
      populate: {
        image: "*",
        sizeGuideImage: "*",
        preSetFilters: {
          populate: {
            image: "*",
          },
        },
      },
    },
    pathParams: {
      id: documentId,
    },
  });

  return body.data as Category;
}

export async function getClotheSetBanners() {
  const body: GetResponseBody = await fetchData({
    baseUrl: urls.getClotheSetBanners,
    query: {
      populate: {
        image: "*",
      },
    },
  });

  return body.data as ClotheSetBanner[];
}

export async function getProductById(documentId: string) {
  const body: GetResponseBody = await fetchData({
    baseUrl: urls.getProductById,
    query: {
      populate: {
        imagesByColor: {
          populate: {
            images: "*",
          },
        },
        category: {
          populate: {
            image: "*",
            sizeGuideImage: "*",
          },
        },
        stocks: "*",
      },
    },
    pathParams: { id: documentId },
  });
  return new ProductModel(body.data as Product);
}

export async function getProducts(queryParams?: {
  filters?: {
    categoryId?: string;
    color?: string[];
    size?: string[];
    onSale?: boolean;
    categoryFilter?: string;
  };
  search?: {
    name?: string;
  };
  pagination?: {
    page: number;
    pageSize: number;
  };
}) {
  const query = {
    populate: {
      imagesByColor: {
        populate: {
          images: "*",
        },
      },
      category: {
        populate: {
          image: "*",
          sizeGuideImage: "*",
        },
      },
      stocks: "*",
    },
    filters: {
      category: { documentId: { $eq: queryParams?.filters?.categoryId } },
      salePrice: queryParams?.filters?.onSale ? { $gt: 0 } : undefined,
      name: {
        $contains:
          queryParams?.search?.name ?? queryParams?.filters?.categoryFilter,
      },
      stocks: {
        $and: [
          {
            $and: [
              {
                quantity: {
                  $gt: 0,
                },
              },
              {
                color: {
                  $in: queryParams?.filters?.color?.map((c) => c.trim()),
                },
              },
            ],
          },
          {
            $and: [
              {
                quantity: {
                  $gt: 0,
                },
              },
              {
                size: {
                  $in: queryParams?.filters?.size?.map((s) => s.trim()),
                },
              },
            ],
          },
        ],
      },
    },
    pagination: {
      page: queryParams?.pagination?.page,
      pageSize: queryParams?.pagination?.pageSize,
      withCount: true,
    },
  };
  const body: GetResponseBody = await fetchData({
    baseUrl: urls.getProducts,
    query: query,
  });

  const products = body.data as Product[];
  return {
    products: products.map((item) => new ProductModel(item)),
    pagination: body.meta?.pagination,
  };
}

export async function getCategoryColors(categoryId: string) {
  const body: GetResponseBody = await fetchData({
    baseUrl: urls.getCategoryAvailableOptions,
    pathParams: { id: categoryId },
  });
  const { colors } = body.data as {
    sizes: string[];
    colors: Color[];
  };
  return colors;
}

export async function getCategorySizes(categoryId: string) {
  const body: GetResponseBody = await fetchData({
    baseUrl: urls.getCategoryAvailableOptions,
    pathParams: { id: categoryId },
  });
  const { sizes } = body.data as {
    sizes: string[];
    colors: Color[];
  };
  return sizes;
}
