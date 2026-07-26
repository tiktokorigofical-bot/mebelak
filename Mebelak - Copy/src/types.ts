export type Page = "home" | "catalog" | "orders" | "contacts" | "product" | "admin";

export type OrderStatus = "в обработке" | "принят" | "нужно уточнить";

export interface Order {
  id: string;
  contact: string;
  description: string;
  fileNames: string[];
  createdAt: string;
  status: OrderStatus;
}

export interface CatalogCategory {
  id: number;
  title: string;
  description: string;
  img: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  imgs: string[];
  colors: { name: string; hex: string }[];
  fabrics: string[];
  sizes: string[];
  description: string;
  specs: { label: string; value: string }[];
}

export interface Material {
  name: string;
  desc: string;
  tag: string;
  img: string;
}

export interface NavItem {
  id: Page;
  label: string;
}
