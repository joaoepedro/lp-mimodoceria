import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { config, type TipoEvento } from "@/config";
import { calcular, fmt, limitarConvidados, mensagemCalculadora } from "@/lib/calculadora";
import { useWhatsApp } from "./WhatsApp";

const c = config.calculadora;

export function Calculadora() {
  const abrir = useWhatsApp();
  const [tipo, setTipo] = useState<TipoEvento>("festa");
  const [convidados, setConvidados] = useState<number>(c.convidadosInicial);
  const [texto, setTexto] = useState(String(c.convidadosInicial));
  const [data, setData] = useState("");
  const r = calcular(tipo, convidados);

  const definir = (n: number) => {
    const v = limitarConvidados(n);
    setConvidados(v);
    setTexto(String(v));
  };

  return (
    <section id="calculadora" className="bg-cacau py-20 text-pistache md:py-24">
      <div className="container-mimo grid items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="h2-mimo">Quantos docinhos sua festa precisa?</h2>
          <p className="mt-3 text-creme-escuro">Conte quantos convidados você espera e a gente sugere a quantidade.</p>

          <fieldset className="mt-8">
            <legend className="mb-3 text-sm font-semibold">Tipo de evento</legend>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(c.eventos) as TipoEvento[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={tipo === k}
                  onClick={() => setTipo(k)}
                  className={`min-h-[44px] rounded-full border-2 px-4 text-[15px] font-semibold ${
                    tipo === k ? "border-pistache bg-pistache text-cacau" : "border-pill-borda text-pistache"
                  }`}
                >
                  {c.eventos[k].rotulo}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="convidados" className="mb-2 block text-sm font-semibold">Número de convidados</label>
              <div className="flex h-12 items-center rounded-full bg-pistache text-cacau">
                <button type="button" aria-label="Diminuir convidados" onClick={() => definir(convidados - c.passo)} className="grid h-12 w-12 shrink-0 place-items-center rounded-full">
                  <Minus size={18} />
                </button>
                <input
                  id="convidados"
                  type="number"
                  inputMode="numeric"
                  min={c.convidadosMinimo}
                  step={c.passo}
                  value={texto}
                  onChange={(e) => {
                    setTexto(e.target.value);
                    const n = parseInt(e.target.value, 10);
                    setConvidados(limitarConvidados(Number.isNaN(n) ? c.convidadosMinimo : n));
                  }}
                  onBlur={() => setTexto(String(convidados))}
                  className="w-full min-w-0 bg-transparent text-center font-bold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button type="button" aria-label="Aumentar convidados" onClick={() => definir(convidados + c.passo)} className="grid h-12 w-12 shrink-0 place-items-center rounded-full">
                  <Plus size={18} />
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="data" className="mb-2 block text-sm font-semibold">Data do evento (opcional)</label>
              <input id="data" type="date" value={data} onChange={(e) => setData(e.target.value)} className="h-12 w-full rounded-full bg-pistache px-5 text-cacau" />
            </div>
          </div>
        </div>

        <div aria-live="polite" className="rotate-[1.5deg] rounded-[32px] bg-rosa p-7 text-cacau md:p-9">
          <p className="sobretitulo text-rosa-texto">Nossa sugestão</p>
          <p className="mt-3">
            Para <strong>{fmt(r.convidados)} convidados</strong>, sugerimos
          </p>
          <p className="mt-1 flex items-baseline gap-3">
            <span className="font-display text-[72px] font-extrabold leading-none tracking-[-0.03em] text-framboesa">{fmt(r.docinhos)}</span>
            <span className="text-xl font-bold">docinhos</span>
          </p>
          <p className="mt-2 text-rosa-texto">{r.linhaSabores}</p>
          {r.bemCasados > 0 && (
            <p className="mt-4 rounded-2xl bg-rosa-claro px-4 py-3 font-semibold">+ {fmt(r.bemCasados)} bem-casados (1 por convidado)</p>
          )}
          <button type="button" onClick={() => abrir(mensagemCalculadora(tipo, convidados, data))} className="btn-primario mt-6 w-full">
            Enviar esta sugestão no WhatsApp
          </button>
          <p className="mt-4 text-[13px] text-rosa-texto">
            É uma estimativa. Se a festa tiver bolo grande ou doces de outros fornecedores, pode precisar de menos.
          </p>
        </div>
      </div>
    </section>
  );
}
