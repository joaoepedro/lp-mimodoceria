import { config, type TipoEvento } from "@/config";

const c = config.calculadora;
const fmt = (n: number) => n.toLocaleString("pt-BR");

export function limitarConvidados(n: number) {
  if (!Number.isFinite(n)) return c.convidadosMinimo;
  return Math.max(c.convidadosMinimo, Math.round(n));
}

export function calcular(tipo: TipoEvento, convidadosBruto: number) {
  const convidados = limitarConvidados(convidadosBruto);
  const ev = c.eventos[tipo];
  const docinhos = Math.ceil((convidados * ev.docinhosPorConvidado) / c.unidadesPorSabor) * c.unidadesPorSabor;
  const sabores = Math.min(c.maxSabores, docinhos / c.unidadesPorSabor);
  const porSabor = Math.ceil(docinhos / sabores / 10) * 10;
  const bemCasados = convidados * ev.bemCasadosPorConvidado;
  let linhaSabores: string;
  if (sabores === 1) linhaSabores = `1 sabor de ${c.unidadesPorSabor} unidades`;
  else if (porSabor === c.unidadesPorSabor) linhaSabores = `${sabores} sabores de ${c.unidadesPorSabor} unidades`;
  else linhaSabores = `Até ${sabores} sabores, cerca de ${fmt(porSabor)} de cada`;
  return { convidados, docinhos, sabores, porSabor, bemCasados, linhaSabores };
}

export function mensagemCalculadora(tipo: TipoEvento, convidados: number, data: string) {
  const r = calcular(tipo, convidados);
  let dataFmt = "a definir";
  if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    const [a, m, d] = data.split("-");
    dataFmt = `${d}/${m}/${a}`;
  }
  return config.mensagens.calculadora
    .replace("{evento}", c.eventos[tipo].nomeMensagem)
    .replace("{convidados}", fmt(r.convidados))
    .replace("{docinhos}", fmt(r.docinhos))
    .replace("{bemCasados}", r.bemCasados > 0 ? ` + ${fmt(r.bemCasados)} bem-casados` : "")
    .replace("{data}", dataFmt);
}

export { fmt };
