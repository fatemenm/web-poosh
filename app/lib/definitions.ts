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
// TODO: how to replace null with sth else?
export type NavbarItem = {
  id: number;
  linkText: string;
  linkUrl: string;
  subLinks: Object | null;
  isExpandable: boolean;
};
