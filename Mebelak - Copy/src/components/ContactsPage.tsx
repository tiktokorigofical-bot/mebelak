import { ArrowRight } from "lucide-react";
import { Footer } from "./Footer";
import { CopyText } from "./CopyText";
import { CONTACT_PHONE, CONTACT_TELEGRAM } from "../data/contact";

interface ContactsPageProps {
  onOrderClick: () => void;
}

export function ContactsPage({ onOrderClick }: ContactsPageProps) {
  return (
    <div className="min-h-screen pt-16" style={{ background: "#110e0b" }}>
      <div className="px-8 md:px-16 lg:px-24 py-20">
        <p className="text-xs tracking-[0.3em] mb-4" style={{ color: "#c4a35a", fontFamily: "Inter, sans-serif" }}>MEBELAK — КОНТАКТЫ</p>
        <h1 className="text-5xl md:text-6xl font-normal text-foreground mb-16" style={{ fontFamily: "Playfair Display, serif" }}>
          Давайте<br /><em style={{ color: "#c4a35a" }}>познакомимся</em>
        </h1>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-10">
            <div>
              <p className="text-xs tracking-widest text-muted-foreground mb-4" style={{ fontFamily: "Inter, sans-serif" }}>ТЕЛЕФОН</p>
              <CopyText
                value={CONTACT_PHONE}
                className="text-2xl text-foreground hover:text-primary transition-colors"
              />
            </div>
            <div>
              <p className="text-xs tracking-widest text-muted-foreground mb-4" style={{ fontFamily: "Inter, sans-serif" }}>TELEGRAM</p>
              <CopyText
                value={CONTACT_TELEGRAM}
                className="text-xl text-foreground hover:text-primary transition-colors"
              />
            </div>
            <div>
              <p className="text-xs tracking-widest text-muted-foreground mb-4" style={{ fontFamily: "Inter, sans-serif" }}>СОЦИАЛЬНЫЕ СЕТИ</p>
              <div className="flex gap-4">
                {['Instagram', 'Pinterest', 'Telegram'].map((s) => (
                  <a key={s} href="#" className="px-4 py-2 text-xs border rounded-lg hover:border-primary hover:text-primary transition-all" style={{ borderColor: "rgba(240,235,227,0.15)", color: "rgba(240,235,227,0.6)", fontFamily: "Inter, sans-serif" }}>
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden relative" style={{ minHeight: "400px", background: "#1c1813", border: "1px solid rgba(240,235,227,0.08)" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                Контакты для заказа доступны слева. Напишите нам в Telegram или позвоните.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-muted-foreground text-sm mb-6" style={{ fontFamily: "Inter, sans-serif" }}>Хотите сделать заказ или получить консультацию?</p>
          <button onClick={onOrderClick} className="inline-flex items-center gap-3 px-10 py-5 text-sm tracking-widest rounded-xl transition-all hover:opacity-90" style={{ background: "#c4a35a", color: "#110e0b", fontFamily: "Inter, sans-serif" }}>
            СОЗДАТЬ ЗАПРОС
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
      <Footer onOrderClick={onOrderClick} />
    </div>
  );
}
