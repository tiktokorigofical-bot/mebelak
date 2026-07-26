import { useState, useRef } from "react";
import { ArrowRight, X, Upload, FileText, ImageIcon, Trash2 } from "lucide-react";

const MAX_FILES = 10;
const MIN_TOTAL_SIZE_MB = 50;

type OrderPageProps = {
  onClose: () => void;
  onSubmit: (phone: string, telegram: string, description: string, files: File[]) => void;
  prefillProduct?: string;
};

export function OrderPage({ onClose, onSubmit, prefillProduct }: OrderPageProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [description, setDescription] = useState(prefillProduct ? `Интересует: ${prefillProduct}\n\n` : "");
  const [dragOver, setDragOver] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; telegram?: string; description?: string; files?: string }>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const addFiles = (incoming: FileList | File[] | null) => {
    if (!incoming) return;
    const incomingFiles = Array.isArray(incoming) ? incoming : Array.from(incoming);
    const allowed = incomingFiles.filter(
      (f) => f.type.startsWith("image/") || f.type === "application/pdf"
    );

    if (files.length + allowed.length > MAX_FILES) {
      setErrors((prev) => ({ ...prev, files: `Можно загрузить не более ${MAX_FILES} файлов` }));
      return;
    }

    setFiles((prev) => [...prev, ...allowed]);
    setErrors((prev) => ({ ...prev, files: undefined }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLFormElement>) => {
    const items = Array.from(e.clipboardData.items);
    const imageItem = items.find((item) => item.type.startsWith("image/"));
    if (imageItem) {
      const file = imageItem.getAsFile();
      if (file) {
        e.preventDefault();
        addFiles([new File([file], file.name || "clipboard-image.png", { type: file.type })]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedPhone = phone.trim();
    const trimmedTelegram = telegram.trim();
    const trimmedDescription = description.trim();
    const totalSizeMb = files.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024);

    const nextErrors: { phone?: string; telegram?: string; description?: string; files?: string } = {};
    const wordCount = trimmedDescription.split(/\s+/).filter(Boolean).length;
    const hasContact = Boolean(trimmedPhone || trimmedTelegram);

    if (!trimmedDescription) {
      nextErrors.description = "Введите описание заказа";
    } else if (wordCount <= 5) {
      nextErrors.description = "Описание должно содержать больше 5 слов";
    }
    if (!trimmedPhone && !trimmedTelegram) {
      nextErrors.phone = "Укажите хотя бы один способ связи";
      nextErrors.telegram = "Укажите хотя бы один способ связи";
    } else {
      if (trimmedPhone) {
        if (!/^\+?\d+$/.test(trimmedPhone)) {
          nextErrors.phone = "некорректный ввод номера";
        } else if (trimmedPhone.replace(/^\+/, "").length < 7 || trimmedPhone.replace(/^\+/, "").length > 15) {
          nextErrors.phone = "некорректный ввод номера";
        }
      }
      if (trimmedTelegram) {
        if (!/^[a-zA-Z0-9_]{3,30}$/.test(trimmedTelegram.replace(/^@/, ""))) {
          nextErrors.telegram = "@user_name должен содержать только латинские буквы, цифры и подчёркивание";
        }
      }
    }
    if (files.length > MAX_FILES) {
      nextErrors.files = `Можно загрузить не более ${MAX_FILES} файлов`;
    }
    if (files.length > 0 && totalSizeMb < MIN_TOTAL_SIZE_MB) {
      nextErrors.files = `Общий размер вложений должен быть не менее ${MIN_TOTAL_SIZE_MB} МБ`;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit(trimmedPhone, trimmedTelegram, trimmedDescription, files);
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
      style={{ background: "#0e0c09" }}
    >
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-8 md:px-16 h-16 border-b shrink-0"
        style={{ background: "rgba(14,12,9,0.95)", backdropFilter: "blur(12px)", borderColor: "rgba(240,235,227,0.08)" }}
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs tracking-widest transition-colors hover:text-primary"
          style={{ color: "rgba(240,235,227,0.5)", fontFamily: "Inter, sans-serif" }}
        >
          <X size={20} />
          НАЗАД
        </button>
        <span className="text-foreground tracking-[0.2em] text-base font-medium" style={{ fontFamily: "Playfair Display, serif" }}>
          MEBELAK
        </span>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X size={20} />
        </button>
      </div>

      {sent ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
            style={{ background: "rgba(196,163,90,0.12)", border: "1px solid rgba(196,163,90,0.35)" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c4a35a" strokeWidth="1.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="font-serif text-4xl text-foreground mb-4" style={{ fontFamily: "Playfair Display, serif" }}>
            Запрос отправлен
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-10" style={{ fontFamily: "Inter, sans-serif" }}>
            Мы получили вашу заявку{files.length > 0 ? ` с ${files.length} файл${files.length === 1 ? "ом" : files.length < 5 ? "ами" : "ами"}` : ""}. Менеджер свяжется с вами в течение рабочего дня.
          </p>
          <button
            onClick={onClose}
            className="px-10 py-4 text-xs tracking-widest rounded-lg transition-all hover:opacity-90"
            style={{ background: "#c4a35a", color: "#110e0b", fontFamily: "Inter, sans-serif" }}
          >
            НА ГЛАВНУЮ
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} onPaste={handlePaste} className="flex-1 grid md:grid-cols-2 gap-0">
          <div className="px-8 md:px-16 py-12 flex flex-col gap-8 border-r" style={{ borderColor: "rgba(240,235,227,0.07)" }}>
            <div>
              <p className="text-xs tracking-[0.3em] mb-3" style={{ color: "#c4a35a", fontFamily: "Inter, sans-serif" }}>
                01 — ОПИСАНИЕ ЗАКАЗА
              </p>
              <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                Расскажите о вашем<br />
                <span style={{ fontStyle: "italic", color: "#c4a35a" }}>проекте</span>
              </h2>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                Опишите, что хотите заказать — размеры, материал, цвет, стиль
              </p>
            </div>

            <div className="flex flex-col gap-6 flex-1">
              <div>
                <label className="block text-xs tracking-widest text-muted-foreground mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                  ОПИСАНИЕ ЗАКАЗА *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setErrors((prev) => ({ ...prev, description: undefined }));
                  }}
                  placeholder="Например: хочу угловой диван в светло-бежевом букле, размер примерно 270×170 см, ножки дерево, для гостиной 20 м²..."
                  rows={8}
                  className="w-full px-5 py-4 text-sm text-foreground placeholder-muted-foreground border rounded-xl bg-transparent outline-none focus:border-primary transition-colors resize-none"
                  style={{ borderColor: "rgba(240,235,227,0.12)", fontFamily: "Inter, sans-serif", background: "rgba(255,255,255,0.03)" }}
                />
                {errors.description && <p className="text-xs text-red-400 mt-2">{errors.description}</p>}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs tracking-widest text-muted-foreground mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                    НОМЕР ТЕЛЕФОНА *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    placeholder="+7 999 000-00-00"
                    className="w-full px-5 py-4 text-sm text-foreground placeholder-muted-foreground border rounded-xl bg-transparent outline-none focus:border-primary transition-colors"
                    style={{ borderColor: "rgba(240,235,227,0.12)", fontFamily: "Inter, sans-serif", background: "rgba(255,255,255,0.03)" }}
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-2">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs tracking-widest text-muted-foreground mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                    TELEGRAM *
                  </label>
                  <input
                    type="text"
                    value={telegram}
                    onChange={(e) => {
                      setTelegram(e.target.value);
                      setErrors((prev) => ({ ...prev, telegram: undefined }));
                    }}
                    placeholder="@username"
                    className="w-full px-5 py-4 text-sm text-foreground placeholder-muted-foreground border rounded-xl bg-transparent outline-none focus:border-primary transition-colors"
                    style={{ borderColor: "rgba(240,235,227,0.12)", fontFamily: "Inter, sans-serif", background: "rgba(255,255,255,0.03)" }}
                  />
                  {errors.telegram && <p className="text-xs text-red-400 mt-2">{errors.telegram}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 md:px-16 py-12 flex flex-col gap-8">
            <div>
              <p className="text-xs tracking-[0.3em] mb-3" style={{ color: "#c4a35a", fontFamily: "Inter, sans-serif" }}>
                02 — ВЛОЖЕНИЯ
              </p>
              <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
                Прикрепите фото<br />
                <span style={{ fontStyle: "italic", color: "#c4a35a" }}>или PDF</span>
              </h2>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                Фото интерьера, планировки, референсы мебели — до {MAX_FILES} файлов, общий объём не менее {MIN_TOTAL_SIZE_MB} МБ
              </p>
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className="relative flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed rounded-2xl cursor-pointer transition-all"
              style={{
                borderColor: dragOver ? "#c4a35a" : "rgba(240,235,227,0.15)",
                background: dragOver ? "rgba(196,163,90,0.06)" : "rgba(255,255,255,0.02)",
                minHeight: "180px",
              }}
            >
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => addFiles(e.target.files)}
              />
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "rgba(196,163,90,0.1)", border: "1px solid rgba(196,163,90,0.25)" }}
              >
                <Upload size={22} style={{ color: "#c4a35a" }} />
              </div>
              <div className="text-center">
                <p className="text-sm text-foreground mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                  Перетащите файлы сюда
                </p>
                <p className="text-xs text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                  или нажмите для выбора · JPG, PNG, PDF · до {MAX_FILES} файлов
                </p>
              </div>
            </div>

            {errors.files && <p className="text-xs text-red-400">{errors.files}</p>}

            {files.length > 0 && (
              <div className="flex flex-col gap-3">
                {files.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl border"
                    style={{ borderColor: "rgba(240,235,227,0.1)", background: "rgba(255,255,255,0.03)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "rgba(196,163,90,0.1)" }}
                    >
                      {file.type === "application/pdf"
                        ? <FileText size={18} style={{ color: "#c4a35a" }} />
                        : <ImageIcon size={18} style={{ color: "#c4a35a" }} />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate" style={{ fontFamily: "Inter, sans-serif" }}>
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
                        {(file.size / 1024 / 1024).toFixed(1)} МБ
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                      className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-auto pt-4">
              <button
                type="submit"
                className="w-full py-5 flex items-center justify-center gap-3 text-sm tracking-widest rounded-xl transition-all hover:opacity-90 active:scale-[0.99]"
                style={{ background: "#c4a35a", color: "#110e0b", fontFamily: "Inter, sans-serif" }}
              >
                ОТПРАВИТЬ ЗАПРОС
                <ArrowRight size={16} />
              </button>
              <p className="text-xs text-muted-foreground text-center mt-3" style={{ fontFamily: "Inter, sans-serif" }}>
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
