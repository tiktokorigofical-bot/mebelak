import { ArrowRight, ChevronRight } from "lucide-react";
import bgImage from "@/imports/site_backgroung.png";
import type { Page } from "../types";
import { CATALOG_CATEGORIES } from "../data/catalog";
import { Footer } from "./Footer";

interface HomePageProps {
  onOrderClick: () => void;
  setPage: (p: Page) => void;
}

export function HomePage({ onOrderClick, setPage }: HomePageProps) {
  return (
    <div className="min-h-screen" style={{ background: "#110e0b" }}>
      <section
        className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(10,8,6,0.82) 55%, rgba(10,8,6,0.15) 100%)" }}
        />
        <div className="relative z-10 max-w-2xl" style={{ marginTop: "-5vh" }}>
          <p className="text-xs tracking-[0.35em] mb-8" style={{ color: "#c4a35a", fontFamily: "Inter, sans-serif" }}>
            — MEBELAK STUDIO
          </p>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal leading-none text-foreground mb-8"
            style={{ fontFamily: "Playfair Display, serif", letterSpacing: "-0.02em" }}
          >
            МЯГКАЯ<br />
            МЕБЕЛЬ<br />
            <em style={{ color: "#c4a35a", fontStyle: "italic" }}>ПО ВАШЕМУ</em><br />
            ПРОЕКТУ
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground mb-12 max-w-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            Индивидуальный подход. Премиальные материалы. Современный дизайн.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onOrderClick}
              className="flex items-center gap-3 px-8 py-4 text-sm tracking-widest rounded-xl transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#c4a35a", color: "#110e0b", fontFamily: "Inter, sans-serif" }}
            >
              СОЗДАТЬ ЗАПРОС / ЗАКАЗАТЬ
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => setPage("catalog")}
              className="flex items-center gap-3 px-8 py-4 text-sm tracking-widest rounded-xl border transition-all hover:border-primary hover:text-primary"
              style={{ borderColor: "rgba(240,235,227,0.2)", color: "rgba(240,235,227,0.75)", fontFamily: "Inter, sans-serif" }}
            >
              КАТАЛОГ
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-16 lg:px-24" style={{ background: "#110e0b" }}>
        <div className="flex items-center gap-6 mb-16 justify-center">
          <div className="h-px w-16 opacity-25" style={{ background: "#c4a35a" }} />
          <p className="text-xs tracking-[0.3em] text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
            · КАТАЛОГ ·
          </p>
          <div className="h-px w-16 opacity-25" style={{ background: "#c4a35a" }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATALOG_CATEGORIES.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage("catalog")}
              className="group relative overflow-hidden aspect-[3/4] text-left rounded-2xl"
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,6,0.88) 35%, rgba(10,8,6,0.05) 70%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-foreground font-light leading-snug mb-2 whitespace-pre-line text-sm md:text-base" style={{ fontFamily: "Playfair Display, serif" }}>
                  {item.title}
                </p>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "#c4a35a" }}>
                  <span className="text-xs tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>СМОТРЕТЬ</span>
                  <ArrowRight size={10} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="py-24 px-8 md:px-16 lg:px-24" style={{ background: "#0e0c09" }}>
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl">
            <img src="https://images.unsplash.com/photo-1640357960494-9242650846d3?w=800&h=600&fit=crop&auto=format" alt="Детали мебели MEBELAK" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-normal text-foreground leading-tight mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
              СОЗДАЁМ МЕБЕЛЬ,<br />
              КОТОРАЯ <em style={{ color: "#c4a35a" }}>ОЩУЩАЕТСЯ</em>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              Мы создаём мягкую мебель, в которой стиль сочетается с комфортом, а каждая деталь — с одной целью.
            </p>
            <button
              onClick={onOrderClick}
              className="flex items-center gap-3 px-7 py-4 text-xs tracking-widest rounded-xl border transition-all hover:bg-primary hover:border-primary hover:text-primary-foreground"
              style={{ borderColor: "rgba(196,163,90,0.35)", color: "#c4a35a", fontFamily: "Inter, sans-serif" }}
            >
              СОЗДАТЬ ЗАПРОС / ЗАКАЗАТЬ
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 md:px-16 lg:px-24 border-t" style={{ background: "#110e0b", borderColor: "rgba(240,235,227,0.06)" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: "◈", title: "Индивидуальный подход", desc: "Каждый заказ — уникальный проект" },
            { icon: "◆", title: "Премиальные материалы", desc: "Только сертифицированные ткани и фурнитура" },
            { icon: "◉", title: "Современное производство", desc: "Собственный цех в Москве" },
            { icon: "◎", title: "Доставка и монтаж под ключ", desc: "По всей России и СНГ" },
          ].map((adv) => (
            <div key={adv.title} className="flex flex-col gap-3">
              <span className="text-xl" style={{ color: "#c4a35a" }}>{adv.icon}</span>
              <h4 className="text-sm font-medium text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>{adv.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{adv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer onOrderClick={onOrderClick} setPage={setPage} />
    </div>
  );
}
