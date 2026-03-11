export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  tags: string[];
  rating: number;
  imageUrl: string;
};

export type ProductSort = "price_asc" | "price_desc" | "rating_desc";

export type ProductsResponse = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
};

export type ProductQueryParams = {
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  tag?: string;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
};

export type GetProductsParams = {
  q?: string;
  tag?: string;
  sort?: ProductSort;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
  pageSize?: string;
};
