export type Banner = {
  startDate: Date;
  endDate: Date;
  promoMessage: string;
  siteTagline: string;
  ctaText: string;
  ctaUrl: string;
};

export type responseBody = {
  data: Record<string, unknown>[];
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
  order: number;
  image?: Image | null;
};

export type NavigationLink = {
  linkText: string;
  linkUrl: string;
  row: number;
  col: number;
};

export type Image = {
  id: number;
  alternativeText: string;
  url: string;
  width: number;
  height: number;
};
export interface HeaderData {
  banner: Banner | undefined;
  navbarItems: NavbarItem[] | undefined;
}

export type HeroBanner = {
  image: Image;
  linkText: string;
  linkUrl: string;
  texts: {
    primary: string;
    secondary: string;
  };
};
