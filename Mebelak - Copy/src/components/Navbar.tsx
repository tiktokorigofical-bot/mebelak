import { useState } from "react";
import { ArrowRight, X, Menu } from "lucide-react";
import type { NavItem, Page } from "../types";
import { NAV_ITEMS } from "../data/navigation";

const NAVBAR_BG = "rgba(17,14,11,0.50)"; // измените это значение для настройки прозрачности
const NAVBAR_BLUR = "blur(16px)";

interface NavbarProps {
  page: Page;
  setPage: (p: Page) => void;
  onOrderClick: () => void;
}

export function Navbar({ page, setPage, onOrderClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-12 h-16"
      style={{ background: NAVBAR_BG, backdropFilter: NAVBAR_BLUR, borderBottom: "1px solid rgba(240,235,227,0.07)" }}
    >
      <button
        onClick={() => setPage("home")}
        className="flex items-center gap-3 hover:opacity-75 transition-opacity"
      >
        <img src="/logo.png" alt="Mebelak logo" className="h-9 w-9 rounded-full object-cover" />
        <span className="text-foreground tracking-[0.2em] text-xl font-semibold" style={{ fontFamily: "Playfair Display, serif" }}>
          MEBELAK
        </span>
      </button>

      <div className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className="text-xs tracking-widest transition-colors relative"
            style={{ fontFamily: "Inter, sans-serif", color: page === item.id ? "#c4a35a" : "rgba(240,235,227,0.55)" }}
          >
            {item.label}
            <span
              className="absolute -bottom-1 left-0 h-px transition-all duration-300"
              style={{ background: "#c4a35a", width: page === item.id ? "100%" : "0%" }}
            />
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onOrderClick}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 text-xs tracking-widest rounded-lg border transition-all hover:bg-primary hover:border-primary hover:text-primary-foreground"
          style={{ fontFamily: "Inter, sans-serif", background: "rgba(196,163,90,0.1)", borderColor: "rgba(196,163,90,0.35)", color: "#c4a35a" }}
        >
          СОЗДАТЬ ЗАПРОС
          <ArrowRight size={12} />
        </button>
        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 md:hidden flex flex-col"
          style={{ background: "rgba(14,12,9,0.98)", borderBottom: "1px solid rgba(240,235,227,0.08)" }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setMenuOpen(false); }}
              className="py-4 px-8 text-left text-xs tracking-widest border-b transition-colors"
              style={{ fontFamily: "Inter, sans-serif", color: page === item.id ? "#c4a35a" : "rgba(240,235,227,0.65)", borderColor: "rgba(240,235,227,0.06)" }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { onOrderClick(); setMenuOpen(false); }}
            className="py-4 px-8 text-left text-xs tracking-widest"
            style={{ fontFamily: "Inter, sans-serif", color: "#c4a35a" }}
          >
            СОЗДАТЬ ЗАПРОС →
          </button>
        </div>
      )}
    </nav>
  );
}
