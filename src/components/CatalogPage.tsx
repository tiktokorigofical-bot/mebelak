import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Product } from "../types";
import { CATALOG_CATEGORIES } from "../data/catalog";
import { Footer } from "./Footer";
import { fmt } from "../utils/format";

interface CatalogPageProps {
  products: Product[];
  onOrderClick: () => void;
  onProductClick: (product: Product) => void;
}

export function CatalogPage({ products, onOrderClick, onProductClick }: CatalogPageProps) {
  const [mode, setMode] = useState<"categories" | "products">("categories");

  return (
    <div className="min-h-screen pt-16" style={{ background: "#110e0b" }}>
      <div className="px-8 md:px-16 lg:px-24 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-xs tracking-[0.3em] mb-4" style={{ color: "#c4a35a", fontFamily: "Inter, sans-serif" }}>
              MEBELAK — КАТАЛОГ
            </p>
            <h1 className="text-5xl md:text-6xl font-normal text-foreground" style={{ fontFamily: "Playfair Display, serif" }}>
              Вся коллекция
            </h1>
          </div>

          <div
            className="flex rounded-xl p-1 self-start md:self-auto"
            style={{ background: "#1c1813", border: "1px solid rgba(240,235,227,0.1)" }}
          >
            <button
              onClick={() => setMode("categories")}
              className="px-5 py-2.5 text-xs tracking-widest rounded-lg transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
                background: mode === "categories" ? "#c4a35a" : "transparent",
                color: mode === "categories" ? "#110e0b" : "rgba(240,235,227,0.5)",
              }}
            >
              КАТЕГОРИИ
            </button>
            <button
              onClick={() => setMode("products")}
              className="px-5 py-2.5 text-xs tracking-widest rounded-lg transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
                background: mode === "products" ? "#c4a35a" : "transparent",
                color: mode === "products" ? "#110e0b" : "rgba(240,235,227,0.5)",
              }}
            >
              ГОТОВЫЕ ТОВАРЫ
            </button>
          </div>
        </div>

        {mode === "categories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATALOG_CATEGORIES.map((item) => (
              <button
                key={item.id}
                onClick={() => setMode("products")}
                className="group relative overflow-hidden text-left rounded-2xl"
                style={{ aspectRatio: "16/10" }}
              >
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(10,8,6,0.78) 0%, rgba(10,8,6,0.25) 100%)" }} />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <span className="self-start px-3 py-1.5 text-xs tracking-widest border rounded-lg" style={{ borderColor: "rgba(196,163,90,0.3)", color: "#c4a35a", fontFamily: "Inter, sans-serif" }}>
                    {['ДИВАНЫ', 'ДИВАНЫ', 'КРЕСЛА', 'КОМПЛЕКТЫ'][item.id - 1]}
                  </span>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-normal text-foreground mb-2 whitespace-pre-line" style={{ fontFamily: "Playfair Display, serif" }}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs tracking-widest border px-5 py-3 rounded-xl transition-all group-hover:border-primary group-hover:text-primary" style={{ borderColor: "rgba(240,235,227,0.2)", color: "rgba(240,235,227,0.65)", fontFamily: "Inter, sans-serif" }}>
                      СМОТРЕТЬ ТОВАРЫ
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {mode === "products" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => onProductClick(product)}
                className="group text-left rounded-2xl overflow-hidden border transition-all hover:border-primary"
                style={{ background: "#1c1813", borderColor: "rgba(240,235,227,0.08)" }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img src={product.imgs[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 text-xs tracking-widest rounded-lg" style={{ background: "#c4a35a", color: "#110e0b", fontFamily: "Inter, sans-serif" }}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                    {product.category}
                  </p>
                  <h3 className="text-lg font-normal text-foreground mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <span key={index} style={{ width: 10, height: 10, borderRadius: "50%", background: index < Math.round(product.rating) ? "#c4a35a" : "transparent", border: "1px solid rgba(196,163,90,0.25)" }} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                      {product.reviews}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-light text-foreground" style={{ fontFamily: "Playfair Display, serif" }}>
                        {fmt(product.price)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm text-muted-foreground line-through mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                          {fmt(product.oldPrice)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs tracking-wide flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#c4a35a", fontFamily: "Inter, sans-serif" }}>
                      ПОДРОБНЕЕ <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-16 p-10 flex flex-col md:flex-row items-center justify-between gap-8 border rounded-2xl" style={{ borderColor: "rgba(196,163,90,0.18)", background: "rgba(196,163,90,0.03)" }}>
          <div>
            <h3 className="text-2xl font-normal text-foreground mb-2" style={{ fontFamily: "Playfair Display, serif" }}>Не нашли нужное?</h3>
            <p className="text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>Создадим мебель по вашим эскизам и размерам</p>
          </div>
          <button onClick={onOrderClick} className="flex items-center gap-3 px-8 py-4 text-xs tracking-widest rounded-xl whitespace-nowrap transition-all hover:opacity-90" style={{ background: "#c4a35a", color: "#110e0b", fontFamily: "Inter, sans-serif" }}>
            ИНДИВИДУАЛЬНЫЙ ЗАКАЗ
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <Footer onOrderClick={onOrderClick} />
    </div>
  );
}
