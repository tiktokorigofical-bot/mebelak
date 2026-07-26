import { Footer } from "./Footer";
import { MATERIALS } from "../data/materials";

interface MaterialsPageProps {
  onOrderClick: () => void;
}

export function MaterialsPage({ onOrderClick }: MaterialsPageProps) {
  return (
    <div className="min-h-screen pt-16" style={{ background: "#110e0b" }}>
      <div className="px-8 md:px-16 lg:px-24 py-20">
        <div className="mb-20">
          <p className="text-xs tracking-[0.3em] mb-4" style={{ color: "#c4a35a", fontFamily: "Inter, sans-serif" }}>MEBELAK — МАТЕРИАЛЫ</p>
          <h1 className="text-5xl md:text-6xl font-normal text-foreground mb-6" style={{ fontFamily: "Playfair Display, serif" }}>
            Мы работаем<br />
            <em style={{ color: "#c4a35a" }}>только с лучшим</em>
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-lg" style={{ fontFamily: "Inter, sans-serif" }}>
            Каждый материал в нашей мастерской отобран вручную. Мы сотрудничаем с европейскими и российскими поставщиками.
          </p>
        </div>

        <div className="space-y-6">
          {MATERIALS.map((mat, i) => (
            <div key={mat.name} className="group grid md:grid-cols-[1fr_2fr] gap-0 overflow-hidden border rounded-2xl" style={{ borderColor: "rgba(240,235,227,0.08)" }}>
              <div className="relative overflow-hidden aspect-video md:aspect-auto md:min-h-64">
                <img src={mat.img} alt={mat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center" style={{ background: i % 2 === 0 ? "#1c1813" : "#171410" }}>
                <span className="text-xs tracking-widest mb-4 inline-block" style={{ color: "#c4a35a", fontFamily: "Inter, sans-serif" }}>{mat.tag}</span>
                <h3 className="text-3xl font-normal text-foreground mb-4" style={{ fontFamily: "Playfair Display, serif" }}>{mat.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md" style={{ fontFamily: "Inter, sans-serif" }}>{mat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <h2 className="text-3xl font-normal text-foreground mb-12" style={{ fontFamily: "Playfair Display, serif" }}>Как мы работаем</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Консультация", desc: "Обсуждаем ваши пожелания, пространство и бюджет" },
              { step: "02", title: "Разработка", desc: "Дизайнер создаёт 3D-визуализацию под ваш интерьер" },
              { step: "03", title: "Производство", desc: "Изготавливаем мебель в собственном цехе в Москве" },
              { step: "04", title: "Доставка", desc: "Привозим и устанавливаем в указанное место" },
            ].map((s) => (
              <div key={s.step} className="flex flex-col gap-4">
                <span className="text-4xl font-light" style={{ color: "rgba(196,163,90,0.2)", fontFamily: "Playfair Display, serif" }}>{s.step}</span>
                <h4 className="text-sm font-medium text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>{s.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer onOrderClick={onOrderClick} />
    </div>
  );
}
