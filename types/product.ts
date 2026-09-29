export type ProductColorOption = {
  id: string;
  label: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
  reference?: string;
  additionalOptions?: string;
  availabilityStatus?: "on_order" | "in_stock";
  priceOnRequest?: boolean;
  sku?: string;
  unit?: string;
  colorOptions?: ProductColorOption[];
};

export type ProductsApiResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "newest";

export type ProductFiltersState = {
  categories: string[];
  brands: string[];
  warranties: string[];
  finishes: string[];
  certifications: string[];
  thicknesses: string[];
  diameters: string[];
  colors: string[];
  widths: string[];
  lengths: string[];
  materials: string[];
  volumes: string[];
  packagings: string[];
  formats: string[];
  sizes: string[];
  priceMin: number;
  priceMax: number;
};

export type FilterOption = {
  id: string;
  label: string;
};
