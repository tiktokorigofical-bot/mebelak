import { useState } from "react";

interface CopyTextProps {
  value: string;
  label?: string;
  className?: string;
}

export function CopyText({ value, label, className }: CopyTextProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleCopy}
        className={className}
        style={{ cursor: "pointer" }}
      >
        {label ?? value}
      </button>
      {copied && (
        <span className="text-[10px] text-primary" style={{ color: "#c4a35a", fontFamily: "Inter, sans-serif" }}>
          Текст скопирован
        </span>
      )}
    </div>
  );
}
