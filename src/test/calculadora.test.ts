import { describe, it, expect } from "vitest";
import { calcular, mensagemCalculadora } from "@/lib/calculadora";

describe("calculadora", () => {
  it("60 convidados em aniversário dão 250 docinhos em 5 sabores de 50", () => {
    const r = calcular("festa", 60);
    expect(r.docinhos).toBe(250);
    expect(r.linhaSabores).toBe("5 sabores de 50 unidades");
  });
  it("casamento soma 1 bem-casado por convidado", () => {
    expect(calcular("casamento", 60).bemCasados).toBe(60);
    expect(calcular("festa", 60).bemCasados).toBe(0);
  });
  it("convidados nunca abaixo de 10", () => {
    expect(calcular("festa", 3).convidados).toBe(10);
  });
  it("máximo 6 sabores", () => {
    const r = calcular("casamento", 200);
    expect(r.docinhos).toBe(1000);
    expect(r.linhaSabores).toBe("Até 6 sabores, cerca de 170 de cada");
  });
  it("mensagem formata data e bem-casados", () => {
    const m = mensagemCalculadora("casamento", 60, "2027-05-09");
    expect(m).toContain("sugestão de 300 docinhos + 60 bem-casados. Data: 09/05/2027");
    expect(mensagemCalculadora("festa", 60, "")).toContain("Data: a definir");
  });
});
