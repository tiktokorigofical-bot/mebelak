import { ArrowRight, Instagram } from "lucide-react";
import type { Page } from "../types";
import { NAV_ITEMS } from "../data/navigation";
import { CopyText } from "./CopyText";
import { CONTACT_PHONE, CONTACT_TELEGRAM } from "../data/contact";

interface FooterProps {
  onOrderClick: () => void;
  setPage?: (p: Page) => void;
}

export function Footer({ onOrderClick, setPage }: FooterProps) {
  return (
    <footer className="border-t px-8 md:px-16 lg:px-24 py-16" style={{ background: "#0e0c09", borderColor: "rgba(240,235,227,0.06)" }}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-1">
          <p className="text-foreground tracking-[0.2em] text-lg font-semibold mb-4" style={{ fontFamily: "Playfair Display, serif" }}>MEBELAK</p>
          <p className="text-xs text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
            Мягкая мебель по индивидуальным проектам. Москва, с 2015 года.
          </p>
          <button onClick={onOrderClick} className="flex items-center gap-2 text-xs tracking-widest border px-5 py-3 rounded-xl transition-all hover:bg-primary hover:border-primary hover:text-primary-foreground" style={{ borderColor: "rgba(196,163,90,0.3)", color: "#c4a35a", fontFamily: "Inter, sans-serif" }}>
            ЗАКАЗАТЬ <ArrowRight size={11} />
          </button>
        </div>
        <div>
          <p className="text-xs tracking-widest text-muted-foreground mb-6" style={{ fontFamily: "Inter, sans-serif" }}>МАГАЗИН</p>
          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => setPage?.(item.id)} className="text-xs text-left hover:text-primary transition-colors" style={{ color: "rgba(240,235,227,0.45)", fontFamily: "Inter, sans-serif" }}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs tracking-widest text-muted-foreground mb-6" style={{ fontFamily: "Inter, sans-serif" }}>КОНТАКТЫ</p>
          <div className="flex flex-col gap-3">
            <CopyText
              value={CONTACT_PHONE}
              label={CONTACT_PHONE}
              className="text-xs text-left hover:text-primary transition-colors"
            />
            <CopyText
              value={CONTACT_TELEGRAM}
              label={CONTACT_TELEGRAM}
              className="text-xs text-left hover:text-primary transition-colors"
            />
          </div>
        </div>
        <div>
          <p className="text-xs tracking-widest text-muted-foreground mb-6" style={{ fontFamily: "Inter, sans-serif" }}>СОЦИАЛЬНЫЕ СЕТИ</p>
          <div className="flex flex-col gap-3">
            {['Instagram', 'Pinterest', 'Telegram'].map((s) => (
              <a key={s} href="#" className="flex items-center gap-2 text-xs hover:text-primary transition-colors" style={{ color: "rgba(240,235,227,0.45)", fontFamily: "Inter, sans-serif" }}>
                <Instagram size={11} />{s}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4 border-t text-xs text-muted-foreground" style={{ borderColor: "rgba(240,235,227,0.05)", fontFamily: "Inter, sans-serif" }}>
        <p>© 2025 MEBELAK. Мягкая мебель по вашему проекту</p>
        <p>Политика конфиденциальности</p>
      </div>
    </footer>
  );
}
