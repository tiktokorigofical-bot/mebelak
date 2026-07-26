import { ArrowRight, Trash2 } from "lucide-react";
import { CopyText } from "./CopyText";
import { Footer } from "./Footer";
import { CONTACT_PHONE, CONTACT_TELEGRAM } from "../data/contact";
import type { Order } from "../types";

interface OrdersPageProps {
  orders: Order[];
  onDeleteOrder: (id: string) => void;
  onOrderClick: () => void;
}

export function OrdersPage({ orders, onDeleteOrder, onOrderClick }: OrdersPageProps) {
  return (
    <div className="min-h-screen pt-16" style={{ background: "#110e0b" }}>
      <div className="px-8 md:px-16 lg:px-24 py-20">
        <p className="text-xs tracking-[0.3em] mb-4" style={{ color: "#c4a35a", fontFamily: "Inter, sans-serif" }}>
          MEBELAK — ЗАКАЗЫ
        </p>
        <h1 className="text-5xl md:text-6xl font-normal text-foreground mb-10" style={{ fontFamily: "Playfair Display, serif" }}>
          Управляйте<br />
          <em style={{ color: "#c4a35a" }}>своими заказами</em>
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground mb-14" style={{ fontFamily: "Inter, sans-serif" }}>
          Статус ваших текущих заявок, контакт для связи и быстрый доступ к новому заказу. Вставьте изображение из буфера прямо при заполнении формы заказа.
        </p>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 mb-16">
          <div className="space-y-6">
            <div className="rounded-3xl p-8 border" style={{ borderColor: "rgba(240,235,227,0.08)", background: "rgba(255,255,255,0.02)" }}>
              <p className="text-xs tracking-widest text-muted-foreground mb-4" style={{ fontFamily: "Inter, sans-serif" }}>КОНТАКТЫ ДЛЯ ЗАКАЗА</p>
              <div className="flex flex-col gap-4">
                <CopyText
                  value={CONTACT_PHONE}
                  label={CONTACT_PHONE}
                  className="text-xl text-foreground hover:text-primary transition-colors"
                />
                <CopyText
                  value={CONTACT_TELEGRAM}
                  label={CONTACT_TELEGRAM}
                  className="text-xl text-foreground hover:text-primary transition-colors"
                />
              </div>
            </div>

          </div>

          <div className="rounded-3xl p-8 border" style={{ borderColor: "rgba(240,235,227,0.08)", background: "rgba(255,255,255,0.02)" }}>
            <p className="text-xs tracking-widest text-muted-foreground mb-4" style={{ fontFamily: "Inter, sans-serif" }}>НОВЫЙ ЗАКАЗ</p>
            <p className="text-sm text-foreground mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
              Если хотите добавить ещё одну заявку, откройте форму заказа и прикрепите фото или планировку. Вы можете вставить изображение из буфера сразу в форму.
            </p>
            <button
              type="button"
              onClick={onOrderClick}
              className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-widest rounded-xl transition-all hover:opacity-90"
              style={{ background: "#c4a35a", color: "#110e0b", fontFamily: "Inter, sans-serif" }}
            >
              СОЗДАТЬ ЗАКАЗ
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl p-12 border text-center" style={{ borderColor: "rgba(240,235,227,0.08)", background: "rgba(255,255,255,0.02)" }}>
            <p className="text-xl text-foreground mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
              У вас пока нет активных заявок
            </p>
            <p className="text-sm text-muted-foreground mb-8" style={{ fontFamily: "Inter, sans-serif" }}>
              Отправьте заявку, и она появится в этом списке.
            </p>
            <button
              type="button"
              onClick={onOrderClick}
              className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-widest rounded-xl transition-all hover:opacity-90"
              style={{ background: "#c4a35a", color: "#110e0b", fontFamily: "Inter, sans-serif" }}
            >
              ОТКРЫТЬ ФОРМУ
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="rounded-3xl p-8 border" style={{ borderColor: "rgba(240,235,227,0.08)", background: "rgba(255,255,255,0.02)" }}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs tracking-widest text-muted-foreground mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                      ЗАКАЗ №{order.id.slice(-6).toUpperCase()}
                    </p>
                    <div className="space-y-1">
                      {order.contact.split("\n").map((line, index) => line.trim() ? (
                        <p key={index} className="text-2xl font-medium text-foreground" style={{ fontFamily: "Playfair Display, serif" }}>
                          {line}
                        </p>
                      ) : null)}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-2 text-xs tracking-widest rounded-full" style={{ background: order.status === "в обработке" ? "rgba(196,163,90,0.16)" : order.status === "принят" ? "rgba(43,212,191,0.16)" : "rgba(255,98,98,0.16)", color: order.status === "в обработке" ? "#c4a35a" : order.status === "принят" ? "#2bd4bf" : "#ff6262", fontFamily: "Inter, sans-serif" }}>
                      {order.status.toUpperCase()}
                    </span>
                    <button
                      type="button"
                      onClick={() => onDeleteOrder(order.id)}
                      className="inline-flex items-center gap-2 px-3 py-2 text-xs tracking-widest rounded-full border transition-all hover:bg-red-500/10"
                      style={{ borderColor: "rgba(240,235,227,0.12)", color: "#f1ece4", fontFamily: "Inter, sans-serif" }}
                    >
                      <Trash2 size={14} /> УДАЛИТЬ
                    </button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs tracking-widest text-muted-foreground mb-2" style={{ fontFamily: "Inter, sans-serif" }}>СОЗДАНО</p>
                    <p className="text-sm text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>{order.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-muted-foreground mb-2" style={{ fontFamily: "Inter, sans-serif" }}>ФАЙЛЫ</p>
                    <div className="flex flex-wrap gap-2">
                      {order.fileNames.length > 0 ? order.fileNames.map((name, index) => (
                        <span key={index} className="px-3 py-2 text-xs rounded-full border" style={{ borderColor: "rgba(240,235,227,0.12)", color: "#f1ece4", fontFamily: "Inter, sans-serif" }}>
                          {name}
                        </span>
                      )) : (
                        <span className="text-xs text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>Без вложений</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-xs tracking-widest text-muted-foreground mb-2" style={{ fontFamily: "Inter, sans-serif" }}>КОММЕНТАРИЙ</p>
                  <p className="text-sm text-foreground whitespace-pre-line" style={{ fontFamily: "Inter, sans-serif" }}>{order.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer onOrderClick={onOrderClick} />
    </div>
  );
}
