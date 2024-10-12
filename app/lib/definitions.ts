export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type product = {
  name: string;
  category: string;
  subCategory: string | undefined;
  color: string;
  size: string;
  price: string;
  stockStatus: boolean;
};
