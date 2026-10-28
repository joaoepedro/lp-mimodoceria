export type Sabor = "tradicional" | "pistache" | "ninho" | "maracuja" | "camafeu" | "trufa" | "limao" | "cafe";

export function Docinho({ sabor, tamanho, soForminha, className = "", children }: { sabor: Sabor; tamanho?: number | string; soForminha?: boolean; className?: string; children?: React.ReactNode }) {
  const t = typeof tamanho === "number" ? `${tamanho}px` : tamanho;
  return (
    <span
      aria-hidden="true"
      className={`docinho s-${sabor} ${soForminha ? "so-forminha" : ""} ${className}`}
      style={t ? { width: t, height: t } : undefined}
    >
      {children}
    </span>
  );
}

export function Vitrine({ sabores, tamanho }: { sabores: Sabor[]; tamanho: string }) {
  return (
    <div aria-hidden="true" className="vitrine flex justify-center overflow-hidden" style={{ gap: "clamp(14px, 2vw, 28px)" }}>
      {sabores.map((s, i) => (
        <Docinho key={i} sabor={s} tamanho={tamanho} />
      ))}
    </div>
  );
}
