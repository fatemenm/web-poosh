import { apiBaseUrl } from "@config";
import qs from "qs";

import { ProductModel } from "@/_models/product.model";

import {
  AuthResponseBody,
  Category,
  ClotheSetBanner,
  Color,
  Error as ErrorType,
  HeroBanner,
  NavbarItem,
  Product,
  PromoBanner,
  ResponseBody,
  User,
  UserSize,
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
  getUser: apiBaseUrl + "/api/users/me",
  getUserSize: apiBaseUrl + "/api/user-sizes",
  createUserSize: apiBaseUrl + "/api/user-sizes",
  updateUserSize: apiBaseUrl + "/api/user-sizes/:id",
  changePassword: apiBaseUrl + "/api/auth/change-password",
};

type queryType = {
  filters?: Record<string, unknown>;
  populate?: Record<string, unknown>;
  sort?: string[];
  fields?: string[];
};

async function requestWithAuth({
  baseUrl,
  id,
  method,
  body,
  headers,
  query,
}: {
  baseUrl: string;
  id?: string | number;
  method: "PUT" | "POST" | "GET";
  body?: any;
  headers?: HeadersInit;
  query?: queryType;
}) {
  try {
    const url = new URL(id ? baseUrl.replace(":id", id.toString()) : baseUrl);
    url.search = qs.stringify(query);
    const token = localStorage.getItem("accessToken");
    const response = await fetch(url.href, {
      method,
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await response.json();
    if (!response.ok) {
      const error = new Error(data.error.message || "Request failed");
      (error as any).status = data.error.status;
      (error as any).name = data.error.name || "RequestError";
      (error as any).body = data.error.details;
      throw error;
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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
    const body: ResponseBody = await response.json();
    return body;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
  passwordConfirmation: string
) {
  try {
    const res: AuthResponseBody = await requestWithAuth({
      baseUrl: urls.changePassword,
      method: "POST",
      body: {
        currentPassword,
        password: newPassword,
        passwordConfirmation,
      },
    });
    return res;
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const translations: Record<string, string> = {
        "The provided current password is invalid": "رمز عبور فعلی اشتباه است",
        "Passwords do not match": "رمز عبور و تکرار آن یکسان نیستند",
        "Your new password must be different than your current":
          "رمز عبور جدید باید با رمز عبور فعلی متفاوت باشد",
      };
      const translated = translations[error.message] || "خطایی رخ داده است";
      throw new Error(translated);
    }
    throw new Error("خطایی در ارتباط با سرور رخ داده است");
  }
}

export async function createUserSize(userSize: UserSize) {
  const res: ResponseBody = await requestWithAuth({
    baseUrl: urls.createUserSize,
    method: "POST",
    body: {
      data: {
        weight: userSize.weight,
        height: userSize.height,
        shoulderWidth: userSize.shoulderWidth,
        chestWidth: userSize.chestWidth,
        waistWidth: userSize.waistWidth,
        pantsLength: userSize.pantsLength,
        thighWidth: userSize.thighWidth,
        hemWidth: userSize.hemWidth,
        footSize: userSize.footSize,
      },
    },
  });
  return res.data as UserSize;
}

export async function updateUserSize(userSize: UserSize) {
  const res: ResponseBody = await requestWithAuth({
    baseUrl: urls.updateUserSize,
    method: "PUT",
    id: userSize.documentId,
    body: {
      data: {
        weight: userSize.weight,
        height: userSize.height,
        shoulderWidth: userSize.shoulderWidth,
        chestWidth: userSize.chestWidth,
        waistWidth: userSize.waistWidth,
        pantsLength: userSize.pantsLength,
        thighWidth: userSize.thighWidth,
        hemWidth: userSize.hemWidth,
        footSize: userSize.footSize,
      },
    },
  });

  return res.data as UserSize;
}

export async function getUserSize() {
  const res: ResponseBody = await requestWithAuth({
    baseUrl: urls.getUserSize,
    method: "GET",
    query: {
      sort: ["id:desc"],
    },
  });
  const userSizes = res.data as UserSize[];
  return userSizes[0];
}

export async function getUser() {
  const user: User = await requestWithAuth({
    baseUrl: urls.getUser,
    method: "GET",
  });
  return user;
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
    if (!response.ok) {
      const res: ResponseBody = await response.json();
      if (res.error?.status === 400) throw new Error("ایمیل قبلا ثبت شده است.");
    }
    const body: AuthResponseBody = await response.json();
    return body;
  } catch (error) {
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
    if (!response.ok) {
      const res: ResponseBody = await response.json();
      if (res.error?.status === 400)
        throw new Error("ایمیل یا رمز عبور نامعتبر است.");
    }
    const body: AuthResponseBody = await response.json();
    return body;
  } catch (error) {
    throw error;
  }
}

export async function getPromoBannerData() {
  const body: ResponseBody = await fetchData({ baseUrl: urls.getBanners });
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
  const body: ResponseBody = await fetchData({
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
  const body: ResponseBody = await fetchData({
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
  const body: ResponseBody = await fetchData({
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
  const body: ResponseBody = await fetchData({
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
  const body: ResponseBody = await fetchData({
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
  const body: ResponseBody = await fetchData({
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
  const body: ResponseBody = await fetchData({
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
  const body: ResponseBody = await fetchData({
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
  const body: ResponseBody = await fetchData({
    baseUrl: urls.getCategoryAvailableOptions,
    pathParams: { id: categoryId },
  });
  const { sizes } = body.data as {
    sizes: string[];
    colors: Color[];
  };
  return sizes;
}
