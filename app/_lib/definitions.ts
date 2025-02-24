export type PromoBanner = {
  startDate: Date;
  endDate: Date;
  promoMessage: string;
  siteTagline: string;
  ctaText: string;
  ctaUrl: string;
};

export type responseBody = {
  data: Record<string, unknown>[] | unknown;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
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
