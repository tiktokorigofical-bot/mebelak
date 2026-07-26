import { ArrowRight } from "lucide-react";
import { Footer } from "./Footer";

interface AboutPageProps {
  onOrderClick: () => void;
}

export function AboutPage({ onOrderClick }: AboutPageProps) {
  return (
    <div className="min-h-screen pt-16" style={{ background: "#110e0b" }}>
      <div className="px-8 md:px-16 lg:px-24 py-20">
        <div className="max-w-3xl mb-20">
          <p className="text-xs tracking-[0.3em] mb-4" style={{ color: "#c4a35a", fontFamily: "Inter, sans-serif" }}>О НАС</p>
          <h1 className="text-5xl md:text-6xl font-normal text-foreground leading-tight mb-8" style={{ fontFamily: "Playfair Display, serif" }}>
            Студия, которая создаёт <em style={{ color: "#c4a35a" }}>пространство для жизни</em>
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            MEBELAK — производственная студия мягкой мебели с 2015 года. Мы не просто выпускаем диваны и кресла — мы создаём предметы, которые становятся частью вашей жизни. Каждое изделие проходит ручную обработку и авторский контроль качества.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
            <img src="https://images.unsplash.com/photo-1699472816073-1420ecfdcacd?w=900&h=700&fit=crop&auto=format" alt="Производство MEBELAK" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center gap-10">
            {[
              { num: "2015", label: "Год основания", desc: "10 лет на рынке мебели" },
              { num: "1 400+", label: "Проектов", desc: "Реализованных в России и СНГ" },
              { num: "850 м²", label: "Производственный цех", desc: "В собственном пространстве в Москве" },
              { num: "30+", label: "Мастеров", desc: "В команде студии" },
            ].map((stat) => (
              <div key={stat.num} className="flex gap-6 items-start">
                <span className="text-3xl font-light min-w-[5rem]" style={{ color: "#c4a35a", fontFamily: "Playfair Display, serif" }}>{stat.num}</span>
                <div>
                  <p className="text-sm font-medium text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-1" style={{ fontFamily: "Inter, sans-serif" }}>{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-16" style={{ borderColor: "rgba(240,235,227,0.08)" }}>
          <h2 className="text-3xl font-normal text-foreground mb-12" style={{ fontFamily: "Playfair Display, serif" }}>Наши принципы</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Честность в деталях", desc: "Мы не скрываем состав материалов. Каждый покупатель получает полный паспорт изделия с указанием всех компонентов." },
              { title: "Долговечность", desc: "Производим мебель, которая служит десятилетиями. Это экономически и экологически разумнее, чем частые замены." },
              { title: "Авторский дизайн", desc: "Большинство форм разработано нашей студией. Мы не копируем — мы создаём, вдохновляясь архитектурой и природой." },
            ].map((v) => (
              <div key={v.title} className="p-8 border rounded-2xl" style={{ borderColor: "rgba(240,235,227,0.08)", background: "#1c1813" }}>
                <h4 className="text-lg font-normal text-foreground mb-3" style={{ fontFamily: "Playfair Display, serif" }}>{v.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <button onClick={onOrderClick} className="inline-flex items-center gap-3 px-10 py-5 text-xs tracking-widest rounded-xl transition-all hover:opacity-90" style={{ background: "#c4a35a", color: "#110e0b", fontFamily: "Inter, sans-serif" }}>
            РАБОТАТЬ С НАМИ
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
      <Footer onOrderClick={onOrderClick} />
    </div>
  );
}
