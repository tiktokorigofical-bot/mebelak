import { useEffect, useState } from "react";
import type { Order, Page, Product } from "../types";
import { Navbar } from "../components/Navbar";
import { HomePage } from "../components/HomePage";
import { CatalogPage } from "../components/CatalogPage";
import { OrdersPage } from "../components/OrdersPage";
import { ContactsPage } from "../components/ContactsPage";
import { ProductPage } from "../components/ProductPage";
import { AdminPage } from "../components/AdminPage";
import { OrderPage } from "../components/OrderPage";
import { CookieConsentBanner } from "../components/CookieConsentBanner";
import { loadProductsFromStorage, saveProductsToStorage } from "../utils/productStorage";
import { PRODUCTS as INITIAL_PRODUCTS } from "../data/products";

const STORAGE_KEY = "mebelak.orders";
const CONSENT_KEY = "mebelak.cookieConsent";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderPrefill, setOrderPrefill] = useState<string>();
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [consent, setConsent] = useState<boolean | null>(null);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedConsent = window.localStorage.getItem(CONSENT_KEY);
    if (savedConsent === "accepted") {
      setConsent(true);
      const savedOrders = window.localStorage.getItem(STORAGE_KEY);
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      }
    } else if (savedConsent === "rejected") {
      setConsent(false);
    } else {
      setConsent(null);
    }

    const storedProducts = loadProductsFromStorage();
    if (storedProducts) {
      setProducts(storedProducts);
    } else {
      setProducts(INITIAL_PRODUCTS);
    }

    if (window.location.pathname === "/admin") {
      setPage("admin");
    }
  }, []);

  useEffect(() => {
    if (consent === true) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }
  }, [orders, consent]);

  useEffect(() => {
    if (products.length > 0) {
      saveProductsToStorage(products);
    }
  }, [products]);

  const handleOrderClick = (prefill?: string) => {
    setOrderPrefill(prefill);
    setOrderOpen(true);
  };

  const handleOrderSubmit = (phone: string, telegram: string, description: string, files: File[]) => {
    const contactLines: string[] = [];
    if (phone.trim()) {
      contactLines.push(`Телефон: ${phone.trim()}`);
    }
    if (telegram.trim()) {
      contactLines.push(`Telegram: ${telegram.trim()}`);
    }

    const newOrder: Order = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      contact: contactLines.join("\n"),
      description,
      fileNames: files.map((file) => file.name),
      createdAt: new Date().toLocaleString("ru-RU"),
      status: "в обработке",
    };
    setOrders((prev: Order[]) => [newOrder, ...prev]);
  };

  const handleConsent = (accepted: boolean) => {
    window.localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "rejected");
    setConsent(accepted);
  };

  const handleProductClick = (product: Product) => {
    setActiveProduct(product);
    setPage("product");
  };

  useEffect(() => {
    if (page === "admin") {
      window.history.replaceState({}, "", "/admin");
    } else if (window.location.pathname === "/admin") {
      window.history.replaceState({}, "", "/");
    }
  }, [page]);

  const handleAdminAuthenticate = () => {
    setAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    setAdminAuthenticated(false);
    window.sessionStorage.removeItem("mebelak.admin.authenticated");
    setPage("home");
  };

  return (
    <>
      <Navbar page={page} setPage={setPage} onOrderClick={() => handleOrderClick()} />

      {page === "home" && <HomePage onOrderClick={() => handleOrderClick()} setPage={setPage} />}
      {page === "catalog" && <CatalogPage products={products} onOrderClick={() => handleOrderClick()} onProductClick={handleProductClick} />}
      {page === "orders" && (
        <OrdersPage
          orders={orders}
          onDeleteOrder={(id) => setOrders((prev: Order[]) => prev.filter((order) => order.id !== id))}
          onOrderClick={() => handleOrderClick()}
        />
      )}
      {page === "contacts" && <ContactsPage onOrderClick={() => handleOrderClick()} />}
      {page === "admin" && (
        <AdminPage
          authenticated={adminAuthenticated}
          onAuthenticate={handleAdminAuthenticate}
          onLogout={handleAdminLogout}
          onBack={() => setPage("home")}
          products={products}
          setProducts={setProducts}
        />
      )}
      {page === "product" && activeProduct && (
        <ProductPage
          product={activeProduct}
          onBack={() => setPage("catalog")}
          onOrder={(name) => handleOrderClick(name)}
        />
      )}

      {orderOpen && (
        <OrderPage
          onClose={() => setOrderOpen(false)}
          onSubmit={(phone, telegram, description, files) => {
            handleOrderSubmit(phone, telegram, description, files);
            setOrderOpen(false);
          }}
          prefillProduct={orderPrefill}
        />
      )}

      {consent === null && <CookieConsentBanner onDecision={handleConsent} />}
    </>
  );
}

