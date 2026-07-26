interface CookieConsentBannerProps {
  onDecision: (accepted: boolean) => void;
}

export function CookieConsentBanner({ onDecision }: CookieConsentBannerProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 py-4 md:px-8" style={{ background: "rgba(14,12,9,0.96)", borderTop: "1px solid rgba(240,235,227,0.08)" }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 md:flex-row md:items-center md:justify-between md:p-6">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
            Для сохранения заказов и прикреплённых файлов после перезагрузки сайта мы используем локальное хранилище браузера и cookie.
          </p>
          <p className="mt-2 text-sm text-muted-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
            Данные хранятся только на вашем устройстве, не передаются третьим лицам и используются исключительно для работы этого раздела. Нажимая «Принять», вы даёте согласие на использование такого хранения.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onDecision(false)}
            className="rounded-lg border px-4 py-2 text-sm transition-all hover:border-primary hover:text-primary"
            style={{ borderColor: "rgba(240,235,227,0.14)", color: "rgba(240,235,227,0.8)", fontFamily: "Inter, sans-serif" }}
          >
            Отклонить
          </button>
          <button
            type="button"
            onClick={() => onDecision(true)}
            className="rounded-lg px-4 py-2 text-sm transition-all hover:opacity-90"
            style={{ background: "#c4a35a", color: "#110e0b", fontFamily: "Inter, sans-serif" }}
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  );
}
