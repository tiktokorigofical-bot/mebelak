import type { Product } from "../types";

const PRODUCT_STORAGE_COOKIE = "mebelak.products";
const PRODUCT_STORAGE_LOCAL = "mebelak.products.local";

function getCookieValue(name: string) {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split("=")
    .slice(1)
    .join("=");
}

export function loadProductsFromStorage(): Product[] | null {
  const cookieValue = getCookieValue(PRODUCT_STORAGE_COOKIE);
  if (cookieValue) {
    try {
      return JSON.parse(decodeURIComponent(cookieValue)) as Product[];
    } catch {
      // ignore malformed cookie
    }
  }

  const localValue = window.localStorage.getItem(PRODUCT_STORAGE_LOCAL);
  if (localValue) {
    try {
      return JSON.parse(localValue) as Product[];
    } catch {
      // ignore malformed local storage
    }
  }

  return null;
}

export function saveProductsToStorage(products: Product[]) {
  const value = encodeURIComponent(JSON.stringify(products));
  document.cookie = `${PRODUCT_STORAGE_COOKIE}=${value}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;

  try {
    window.localStorage.setItem(PRODUCT_STORAGE_LOCAL, JSON.stringify(products));
  } catch {
    // ignore localStorage failures
  }
}
