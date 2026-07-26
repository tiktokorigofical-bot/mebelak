import { useState } from "react";
import { ArrowRight, ChevronLeft, Star, Plus, Minus } from "lucide-react";
import type { Product } from "../types";
import { Footer } from "./Footer";
import { fmt } from "../utils/format";

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onOrder: (name: string) => void;
}

export function ProductPage({ product, onBack, onOrder }: ProductPageProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedFabric, setSelectedFabric] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [qty, setQty] = useState(1);

  return (
    <div className="min-h-screen pt-16" style={{ background: "#110e0b" }}>
      <div
        className="px-8 md:px-16 py-4 border-b flex items-center gap-2 text-xs"
        style={{ borderColor: "rgba(240,235,227,0.07)", fontFamily: "Inter, sans-serif", color: "rgba(240,235,227,0.4)" }}
      >
        <button onClick={onBack} className="hover:text-primary transition-colors flex items-center gap-1">
          <ChevronLeft size={12} />
          Каталог
        </button>
        <span>/</span>
        <span style={{ color: "rgba(240,235,227,0.7)" }}>{product.name}</span>
      </div>

      <div className="px-8 md:px-16 lg:px-24 py-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col gap-3">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: "4/3", background: "#1c1813" }}
            >
              <img
                src={product.imgs[imgIdx]}
                alt={product.name}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              {product.badge && (
                <span
                  className="absolute top-4 left-4 px-3 py-1.5 text-xs tracking-widest rounded-lg"
                  style={{ background: "#c4a35a", color: "#110e0b", fontFamily: "Inter, sans-serif" }}
                >
                  {product.badge}
                </span>
              )}
            </div>
            {product.imgs.length > 1 && (
              <div className="flex gap-3">
                {product.imgs.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImgIdx(idx)}
                    className="overflow-hidden rounded-xl border-2 transition-all"
                    style={{
                      width: 72,
                      height: 56,
                      borderColor: imgIdx === idx ? "#c4a35a" : "transparent",
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs tracking-widest mb-2" style={{ color: "#c4a35a", fontFamily: "Inter, sans-serif" }}>
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-normal text-foreground mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={12}
                      fill={index < Math.round(product.rating) ? "#c4a35a" : "transparent"}
                      style={{ color: "#c4a35a" }}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                  {product.rating} · {product.reviews} отзывов
                </span>
              </div>
            </div>

            <div className="flex items-end gap-3">
              <span className="text-3xl font-light text-foreground" style={{ fontFamily: "Playfair Display, serif" }}>
                {fmt(product.price * qty)}
              </span>
              {product.oldPrice && (
                <span className="text-lg text-muted-foreground line-through mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  {fmt(product.oldPrice)}
                </span>
              )}
            </div>

            <div>
              <p className="text-xs tracking-widest text-muted-foreground mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                ЦВЕТ: <span className="text-foreground">{product.colors[selectedColor].name}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className="w-8 h-8 rounded-full border-2 transition-all"
                    style={{
                      background: color.hex,
                      borderColor: selectedColor === idx ? "#c4a35a" : "transparent",
                      boxShadow: selectedColor === idx ? `0 0 0 2px #110e0b, 0 0 0 4px #c4a35a` : "none",
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs tracking-widest text-muted-foreground mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                ОБИВКА
              </p>
              <div className="flex flex-wrap gap-2">
                {product.fabrics.map((fabric, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedFabric(idx)}
                    className="px-4 py-2 text-xs rounded-lg border transition-all"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      borderColor: selectedFabric === idx ? "#c4a35a" : "rgba(240,235,227,0.15)",
                      color: selectedFabric === idx ? "#c4a35a" : "rgba(240,235,227,0.6)",
                      background: selectedFabric === idx ? "rgba(196,163,90,0.08)" : "transparent",
                    }}
                  >
                    {fabric}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs tracking-widest text-muted-foreground mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                РАЗМЕР (ширина × глубина, см)
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(idx)}
                    className="px-4 py-2 text-xs rounded-lg border transition-all"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      borderColor: selectedSize === idx ? "#c4a35a" : "rgba(240,235,227,0.15)",
                      color: selectedSize === idx ? "#c4a35a" : "rgba(240,235,227,0.6)",
                      background: selectedSize === idx ? "rgba(196,163,90,0.08)" : "transparent",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <div
                className="flex items-center gap-0 border rounded-xl overflow-hidden"
                style={{ borderColor: "rgba(240,235,227,0.15)" }}
              >
                <button
                  type="button"
                  onClick={() => setQty((current) => Math.max(1, current - 1))}
                  className="px-4 py-3 text-foreground hover:text-primary transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 text-sm text-foreground min-w-[2.5rem] text-center" style={{ fontFamily: "Inter, sans-serif" }}>
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((current) => current + 1)}
                  className="px-4 py-3 text-foreground hover:text-primary transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => onOrder(`${product.name} (${product.colors[selectedColor].name}, ${product.fabrics[selectedFabric]}, ${product.sizes[selectedSize]}, ${qty} шт.)`)}
                className="flex-1 flex items-center justify-center gap-3 py-3.5 text-sm tracking-widest rounded-xl transition-all hover:opacity-90"
                style={{ background: "#c4a35a", color: "#110e0b", fontFamily: "Inter, sans-serif" }}
              >
                ЗАКАЗАТЬ
                <ArrowRight size={14} />
              </button>
            </div>

            <p className="text-xs text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
              {product.specs.find((spec) => spec.label === "Срок изготовления")?.value} · {product.specs.find((spec) => spec.label === "Доставка" || spec.label === "Доставка и монтаж")?.value}
            </p>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12 border-t pt-12" style={{ borderColor: "rgba(240,235,227,0.08)" }}>
          <div>
            <h3 className="text-xl font-normal text-foreground mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
              Об изделии
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              {product.description}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-normal text-foreground mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
              Характеристики
            </h3>
            <div className="flex flex-col gap-3">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex justify-between items-center py-3 border-b text-sm"
                  style={{ borderColor: "rgba(240,235,227,0.07)" }}
                >
                  <span className="text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>{spec.label}</span>
                  <span className="text-foreground text-right" style={{ fontFamily: "Inter, sans-serif" }}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer onOrderClick={() => onOrder(product.name)} />
    </div>
  );
}
