// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// };

// export type product = {
//   name: string;
//   category: string;
//   subCategory: string | undefined;
//   color: string;
//   size: string;
//   price: string;
//   stockStatus: boolean;
// };

export type Banner = {
  startDate: string;
  endDate: string;
  dynamicText: string;
  staticText: string;
  ctaText: string;
  ctaUrl: string;
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
