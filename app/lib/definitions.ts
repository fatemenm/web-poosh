import { ProductModel } from "@/models/product.model";

export type PromoBanner = {
  startDate: Date;
  endDate: Date;
  promoMessage: string;
  siteTagline: string;
  ctaText: string;
  ctaUrl: string;
};

export type ResponseBody = {
  data?: Record<string, unknown>[] | unknown;
  meta?: {
    pagination: Pagination;
  };
  error?: Error;
};

export type AuthResponseBody = {
  jwt: string;
  user: User;
};

export type Error = {
  status: number;
  name: string;
  message: string;
  details: unknown;
};

export type User = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
};

export type UserSize = {
  documentId?: string;
  weight: number;
  height: number;
  shoulderWidth?: number;
  chestWidth?: number;
  waistWidth?: number;
  pantsLength?: number;
  thighWidth?: number;
  hemWidth?: number;
  footSize?: number;
};

export type NavbarItem = {
  id: number;
  linkText: string;
  linkUrl: string;
  subLinks?: { items: NavigationLink[] } | null;
  isExpandable: boolean;
  index: number;
  image?: Image | null;
};

export type NavigationLink = {
  name: string;
  url: string;
  row: number;
  col: number;
};

export type Image = {
  id: number;
  alternativeText: string;
  url: string;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      name: string;
      width: number;
      height: number;
      url: string;
    };
  };
};
export type HeaderData = {
  banner: PromoBanner | undefined;
  navbarItems: NavbarItem[] | undefined;
};

export type HeroBanner = {
  image: Image;
  linkText: string;
  linkUrl: string;
  texts: {
    primary: string;
    secondary: string;
  };
};

export type Category = {
  documentId: string;
  id: number;
  index: number;
  name: string;
  image: Image;
  preSetFilters: Filter[];
  sizeGuideImage: Image;
  sizeTable: Record<string, string>[];
  careTips: string[];
};

export type Filter = {
  query: Record<string, string>;
  image: Image;
  index: number;
};

export type ClotheSetBanner = {
  id: number;
  image: Image;
  linkText: string;
  linkUrl: string;
  title: string;
};

export type Product = {
  id: number;
  documentId: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  category: Category;
  sizes: string[];
  colors: Color[];
  stocks: Stock[];
  information: {
    productInfo: string;
    modelSizeInfo: string;
    colorInfo: string;
  };
  imagesByColor: Array<{
    color: string;
    images: Image[];
  }>;
};

export type Color = {
  name: string;
  hexCode: string;
};

export type Stock = {
  id: number;
  size: string;
  color: string;
  quantity: number;
};

export type Pagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type BasketItem = {
  id: number;
  product: ProductModel;
  color: string;
  size: string;
  image: Image;
};
