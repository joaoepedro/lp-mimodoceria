import { createFileRoute } from "@tanstack/react-router";
import * as Accordion from "@radix-ui/react-accordion";
import { MapPin, MessageCircle, Plus } from "lucide-react";
import { config } from "@/config";
import { Docinho, Vitrine, type Sabor } from "@/components/mimo/Docinho";
import { WhatsAppProvider, useWhatsApp } from "@/components/mimo/WhatsApp";
import { Calculadora } from "@/components/mimo/Calculadora";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: config.seo.titulo },
      { name: "description", content: config.seo.descricao },
      { property: "og:title", content: config.seo.titulo },
      { property: "og:description", content: config.seo.descricao },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#EEF2E2" },
    ],
  }),
  component: () => (
    <WhatsAppProvider>
      <Pagina />
    </WhatsAppProvider>
  ),
});

const { marca, contato, pedido } = config;

function Pagina() {
  const abrir = useWhatsApp();
  const geral = () => abrir(config.mensagens.geral);
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cacau focus:px-4 focus:py-2 focus:text-pistache">
        Pular para o conteúdo
      </a>
      <Cabecalho onEncomendar={geral} />
      <main id="conteudo">
        <Topo onEncomendar={geral} />
        <Ocasioes />
        <Cardapio />
        <Calculadora />
        <ComoFunciona onEncomendar={geral} />
        <QuemFaz />
        <Depoimentos />
        <Degustacao />
        <Duvidas />
        <ChamadaFinal onEncomendar={geral} />
      </main>
      <Rodape />
      <button type="button" aria-label="Encomendar pelo WhatsApp" onClick={geral} className="fixed bottom-5 right-5 z-40 grid h-[60px] w-[60px] place-items-center rounded-full bg-whatsapp text-branco shadow-lg">
        <MessageCircle size={28} />
      </button>
    </>
  );
}

function Cabecalho({ onEncomendar }: { onEncomendar: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-borda bg-pistache/95 backdrop-blur">
      <div className="container-mimo flex h-[72px] items-center justify-between gap-4">
        <a href="#" className="flex min-w-0 items-center gap-2">
          <Docinho sabor="tradicional" tamanho={38} />
          <span className="font-display text-2xl font-extrabold tracking-[-0.03em]">{marca.logoNome}</span>
          <span className="text-[13px] text-cacau-suave">{marca.logoComplemento}</span>
        </a>
        <nav className="flex items-center gap-7">
          <a href="#cardapio" className="hidden text-[15px] md:inline">Cardápio</a>
          <a href="#como-pedir" className="hidden text-[15px] md:inline">Como pedir</a>
          <a href="#duvidas" className="hidden text-[15px] md:inline">Dúvidas</a>
          <button type="button" onClick={onEncomendar} className="btn-secundario shrink-0">Encomendar</button>
        </nav>
      </div>
    </header>
  );
}

const vitrineTopo: Sabor[] = ["limao", "maracuja", "ninho", "tradicional", "camafeu", "pistache", "trufa", "tradicional", "ninho", "maracuja", "cafe"];
const vitrineFim: Sabor[] = ["cafe", "pistache", "tradicional", "ninho", "maracuja", "camafeu", "trufa", "tradicional", "pistache", "ninho", "limao"];

function Topo({ onEncomendar }: { onEncomendar: () => void }) {
  return (
    <section className="pt-14">
      <div className="container-mimo text-center">
        <p className="sobretitulo max-sm:text-[12px] max-sm:tracking-[0.12em]">Doces finos para festas · {marca.cidade}</p>
        <h1 className="h1-mimo mx-auto mt-4 max-w-[22ch]">
          Doces que fazem sua festa ficar na <span className="text-framboesa">memória</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[46ch] text-[19px] text-cacau-suave">
          Brigadeiros, bem-casados e docinhos finos feitos à mão e entregues no horário da sua festa.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6">
          <button type="button" onClick={onEncomendar} className="btn-primario btn-grande">
            <MessageCircle size={20} aria-hidden="true" /> Quero encomendar meus doces
          </button>
          <a href="#cardapio" className="font-semibold underline underline-offset-4">Ver cardápio e preços</a>
        </div>
      </div>
      <div className="relative mt-14">
        <span className="absolute right-[8%] top-[-46px] z-10 rotate-6 rounded-lg bg-framboesa px-3 py-1.5 text-sm font-bold text-branco">
          feitos à mão, um por um
        </span>
        <Vitrine sabores={vitrineTopo} tamanho="clamp(76px, 8vw, 112px)" />
        <div className="balcao px-6 pb-[30px] pt-10">
          <p className="mx-auto flex max-w-fit items-start justify-center gap-2 text-center text-[15px] font-semibold text-pistache sm:items-center">
            <MapPin aria-hidden="true" size={18} className="mt-[3px] shrink-0 text-rosa-vivo sm:mt-0" />
            <span>
              Entrega em {marca.areaEntrega} · Retirada na {marca.bairroRetirada}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Ocasioes() {
  const itens: [Sabor, string, string][] = [
    ["camafeu", "Casamentos", "Bem-casados, docinhos finos e caixa degustação para vocês provarem antes do grande dia."],
    ["tradicional", "Aniversários e festas", "Brigadeiros gourmet em cores e sabores que combinam com o tema da festa."],
    ["pistache", "Empresas e presentes", "Caixas para clientes, equipes e datas especiais, com cartão personalizado."],
  ];
  return (
    <section className="container-mimo py-20 md:py-24">
      <div className="grid gap-4 md:grid-cols-2 md:items-end md:gap-10">
        <h2 className="h2-mimo max-w-[16ch]">Tem doce certo para cada comemoração</h2>
        <p className="max-w-[40ch] text-cacau-suave md:justify-self-end">Do casamento ao aniversário do pequeno, passando pelo presente da empresa.</p>
      </div>
      <ul className="mt-10 border-t-2 border-cacau">
        {itens.map(([s, t, d], i) => (
          <li key={t} className="grid grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-x-5 gap-y-2 border-b border-borda py-6 md:grid-cols-[48px_64px_minmax(0,1fr)_minmax(0,1fr)] md:gap-x-8">
            <span className="font-display text-lg font-bold text-framboesa">0{i + 1}</span>
            <Docinho sabor={s} tamanho={64} />
            <h3 className="text-[clamp(26px,3vw,36px)] font-bold leading-tight">{t}</h3>
            <p className="col-span-3 text-cacau-suave md:col-span-1">{d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Cardapio() {
  const abrir = useWhatsApp();
  const grade: Sabor[] = ["tradicional", "pistache", "ninho", "maracuja", "trufa", "camafeu", "cafe", "limao", "tradicional"];
  return (
    <section id="cardapio" className="container-mimo">
      <div className="grid gap-10 rounded-[36px] bg-rosa p-7 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:p-12">
        <div>
          <p className="sobretitulo text-rosa-texto">Cardápio</p>
          <h2 className="h2-mimo mt-3">Escolha seus doces</h2>
          <p className="mt-3 text-rosa-texto">Preços por cento, com mínimo de {pedido.minimoPorSabor} unidades por sabor. Forminhas e embalagem já inclusas.</p>
          <div className="mt-6 grid max-w-[200px] grid-cols-3 gap-2.5">
            {grade.map((s, i) => <Docinho key={i} sabor={s} className="aspect-square w-full" />)}
          </div>
          <button type="button" onClick={() => abrir(config.mensagens.cardapio)} className="btn-primario mt-8">Quero montar meu pedido</button>
        </div>
        <div>
          <ul>
            {config.cardapio.map((item) => (
              <li key={item.nome} className="border-b border-dashed border-rosa-linha py-5 first:pt-0">
                <div className="flex flex-col gap-1 lg:flex-row lg:items-baseline lg:gap-3">
                  <h3 className="font-display text-2xl font-bold lg:whitespace-nowrap">{item.nome}</h3>
                  <span aria-hidden="true" className="pontilhado hidden flex-1 lg:block" />
                  <span className="text-[15px] text-rosa-texto">
                    a partir de <strong className="font-display text-2xl font-bold text-cacau">{item.preco}</strong> {item.unidade}
                  </span>
                </div>
                <p className="mt-2 text-[15px] text-rosa-texto">{item.descricao}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[15px] text-rosa-texto">Forminhas especiais (pétala, cetim, metalizada) e cores personalizadas sob consulta.</p>
        </div>
      </div>
      <div className="h-20 md:h-24" />
    </section>
  );
}

function ComoFunciona({ onEncomendar }: { onEncomendar: () => void }) {
  const passos: [Sabor, string, string][] = [
    ["tradicional", "Chame no WhatsApp", "Conte a data, o local e quantos convidados você espera."],
    ["pistache", "Monte o cardápio", "Sugerimos sabores, quantidades e embalagem. Você recebe o orçamento por escrito."],
    ["maracuja", "Reserve a data", `Com ${pedido.sinalPercentual}% de sinal no Pix ou cartão. O restante, na entrega.`],
    ["camafeu", "Receba pronto para a mesa", "Entregamos em caixas próprias, na janela de horário combinada."],
  ];
  return (
    <section id="como-pedir" className="container-mimo py-20 md:py-24">
      <h2 className="h2-mimo text-center">Do pedido à sua mesa em 4 passos</h2>
      <ol className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:timeline-linha">
        {passos.map(([s, t, d], i) => (
          <li key={t} className="relative text-center">
            <Docinho sabor={s} tamanho={64} soForminha className="relative">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-cacau font-bold text-branco">{i + 1}</span>
            </Docinho>
            <h3 className="mt-4 font-sans text-xl font-bold tracking-normal">{t}</h3>
            <p className="mx-auto mt-2 max-w-[30ch] text-base text-cacau-suave">{d}</p>
          </li>
        ))}
      </ol>
      <div className="mx-auto mt-12 flex max-w-[820px] flex-col items-center gap-4 rounded-[32px] bg-pistache-medio px-6 py-5 text-center sm:flex-row sm:rounded-full sm:text-left">
        <p className="flex-1 text-cacau-verde">
          Peça com pelo menos <strong className="text-cacau">{pedido.antecedenciaFestaDias} dias</strong> de antecedência para festas e{" "}
          <strong className="text-cacau">{pedido.antecedenciaCasamentoDias} dias</strong> para casamentos.
        </p>
        <button type="button" onClick={onEncomendar} className="btn-primario shrink-0">Quero encomendar</button>
      </div>
    </section>
  );
}

function QuemFaz() {
  const beneficios = [
    ["Bonito na mesa e no paladar", "Cada doce é enrolado e decorado à mão, um por um, com chocolate belga."],
    ["Chega inteiro e no horário", "Caixas próprias e janela de entrega combinada com você ou com o cerimonial."],
    ["Sem surpresa no orçamento", "Forminha e embalagem no preço. A taxa de entrega vem antes de fechar."],
    ["Fresquinho no seu dia", "Produzimos para a data do seu evento. Nada sai de estoque."],
  ];
  return (
    <section className="bg-pistache-medio py-20 md:py-24">
      <div className="container-mimo grid items-center gap-12 md:grid-cols-2">
        <div className="relative mx-auto w-full max-w-[440px]">
          <div className="grid aspect-[4/5] place-items-center rounded-[220px_220px_32px_32px] border-2 border-dashed border-rosa-linha bg-rosa p-6 text-center text-rosa-texto">
            [Foto da confeiteira no ateliê]
          </div>
          <div className="absolute -bottom-4 right-2 -rotate-3 rounded-2xl bg-cacau px-5 py-3 text-pistache sm:-right-4">
            <p className="font-display text-[34px] font-extrabold leading-none tracking-[-0.03em]">{config.prova.festas}</p>
            <p className="text-sm text-creme-escuro">festas desde {marca.fundacao}</p>
          </div>
        </div>
        <div>
          <h2 className="h2-mimo">Oi, eu sou a Lívia</h2>
          <p className="mt-5 text-lg text-cacau-verde">
            Comecei fazendo brigadeiro para o aniversário da minha sobrinha, em {marca.fundacao}. No fim da festa, metade dos convidados pediu meu contato, e a cozinha de casa virou ateliê.
          </p>
          <p className="mt-4 text-lg text-cacau-verde">
            Hoje são mais de 1.200 festas, e eu ainda provo cada fornada antes de sair. Meu jeito de trabalhar é simples: sabor de verdade, acabamento caprichado e respeito pelo horário da sua festa.
          </p>
          <p className="mt-5 text-cacau-verde"><strong className="text-cacau">Lívia Moraes</strong> · confeiteira e fundadora da {marca.nome}</p>
          <div className="mt-8 grid gap-6 border-t border-borda pt-8 sm:grid-cols-2">
            {beneficios.map(([t, d]) => (
              <div key={t}>
                <h3 className="font-sans text-[17px] font-bold tracking-normal">{t}</h3>
                <p className="mt-1 text-[15px] text-cacau-verde">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Depoimentos() {
  return (
    <section className="container-mimo py-20 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="h2-mimo">Quem já fez festa com a Mimo</h2>
        <p className="text-cacau-suave"><strong className="font-display text-[28px] font-bold text-cacau">{config.prova.nota}</strong> em {config.prova.avaliacoes} avaliações</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-[3fr_2fr]">
        <figure className="flex flex-col justify-between rounded-[32px] bg-cacau p-8 text-pistache md:p-10">
          <span aria-hidden="true" className="font-display text-[80px] leading-none text-rosa-vivo">“</span>
          <blockquote className="font-display text-[clamp(22px,2.4vw,30px)] font-semibold leading-tight tracking-[-0.02em]">
            Pedi 300 docinhos para o aniversário de 1 ano do Theo e não sobrou nenhum. Chegaram ao salão uma hora antes, tudo arrumadinho.
          </blockquote>
          <figcaption className="mt-6 text-creme-escuro"><strong className="text-pistache">Renata S.</strong> · Mooca · Festa infantil</figcaption>
        </figure>
        <div className="grid gap-5">
          <figure className="rounded-[28px] bg-rosa p-7">
            <blockquote>“Fizemos a caixa degustação e escolhemos os sabores juntos. No casamento, os bem-casados acabaram antes da valsa.”</blockquote>
            <figcaption className="mt-4 text-[15px] text-rosa-texto"><strong className="text-cacau">Juliana e Pedro</strong> · Pinheiros · Casamento</figcaption>
          </figure>
          <figure className="rounded-[28px] bg-pistache-medio p-7">
            <blockquote>“Encomendamos 80 caixas de fim de ano para clientes. Entrega no prazo, cartão personalizado e muito elogio.”</blockquote>
            <figcaption className="mt-4 text-[15px] text-cacau-verde"><strong className="text-cacau">Marcos A.</strong> · Itaim Bibi · Presentes corporativos</figcaption>
          </figure>
        </div>
      </div>
      {config.projetoConceitual && <p className="mt-4 text-[13px] text-cacau-suave">Depoimentos fictícios · projeto conceitual.</p>}
    </section>
  );
}

function Degustacao() {
  const abrir = useWhatsApp();
  return (
    <section className="container-mimo">
      <div className="grid items-center gap-10 rounded-[36px] bg-rosa p-7 md:grid-cols-[3fr_2fr] md:p-12">
        <div>
          <span className="inline-block rounded-full bg-cacau px-3 py-1.5 text-xs font-bold tracking-[0.12em] text-rosa">
            AGENDA DE CASAMENTOS ABERTA PARA {pedido.agendaCasamentos}
          </span>
          <h2 className="h2-mimo mt-5">Vai casar? Prove antes de escolher</h2>
          <p className="mt-4 text-rosa-texto">
            A caixa degustação traz {config.degustacao.sabores} sabores à sua escolha e chega na sua casa. Custa <strong className="text-cacau">{config.degustacao.preco}</strong>, e o valor é abatido do pedido do casamento.
          </p>
          <button type="button" onClick={() => abrir(config.mensagens.degustacao)} className="btn-secundario mt-7">Quero minha caixa degustação</button>
        </div>
        <div className="mx-auto grid w-full max-w-[280px] -rotate-3 grid-cols-2 gap-4 rounded-[28px] bg-cacau p-6">
          {(["tradicional", "pistache", "camafeu", "maracuja"] as Sabor[]).map((s) => <Docinho key={s} sabor={s} className="aspect-square w-full" />)}
        </div>
      </div>
    </section>
  );
}

const duvidas = [
  ["Qual é o pedido mínimo?", `${pedido.minimoPorSabor} unidades por sabor. Você pode combinar quantos sabores quiser.`],
  ["Com quanta antecedência preciso pedir?", `Pelo menos ${pedido.antecedenciaFestaDias} dias para festas e ${pedido.antecedenciaCasamentoDias} dias para casamentos. Para datas mais próximas, chame no WhatsApp e consulte a agenda.`],
  ["Vocês entregam no local da festa?", `Sim, em ${marca.areaEntrega}. A taxa varia por região e aparece no orçamento. A retirada no ateliê, na ${marca.bairroRetirada}, é grátis e com hora marcada.`],
  ["Quanto tempo os doces duram?", "Brigadeiros e docinhos: até 3 dias, em local fresco e longe do sol. Bem-casados: até 7 dias. Não precisam de geladeira."],
  ["Posso escolher a cor das forminhas e da embalagem?", "Pode. Temos cores básicas sem custo extra e forminhas especiais sob consulta, para combinar com a decoração."],
  ["Como funciona o pagamento?", `${pedido.sinalPercentual}% para reservar a data e ${100 - pedido.sinalPercentual}% até a entrega, no Pix ou cartão. Casamentos podem parcelar em até ${pedido.parcelasCasamento} vezes.`],
  ["Vocês têm opções sem glúten ou sem lactose?", "Alguns sabores são naturalmente sem glúten; sem lactose, sob consulta. Nossa cozinha manipula glúten, leite e oleaginosas."],
  ["Atendem fora da capital?", "Grande São Paulo sob consulta, com taxa de entrega à parte."],
];

function Duvidas() {
  const abrir = useWhatsApp();
  return (
    <section id="duvidas" className="container-mimo grid gap-10 py-20 md:grid-cols-[2fr_3fr] md:py-24">
      <div>
        <h2 className="h2-mimo">Ficou alguma dúvida?</h2>
        <p className="mt-4 text-cacau-suave">Se a sua não estiver aqui, é só chamar. Respondemos de {contato.horario}.</p>
        <button type="button" onClick={() => abrir(config.mensagens.geral)} className="btn-secundario mt-6">Perguntar no WhatsApp</button>
      </div>
      <Accordion.Root type="single" collapsible className="border-t-2 border-cacau">
        {duvidas.map(([p, r], i) => (
          <Accordion.Item key={p} value={String(i)} className="border-b border-borda">
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left font-semibold">
                {p}
                <Plus aria-hidden="true" size={22} className="shrink-0 text-framboesa transition-transform duration-200 group-data-[state=open]:rotate-45" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden text-cacau-suave data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <p className="pb-5 pr-8">{r}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}

function ChamadaFinal({ onEncomendar }: { onEncomendar: () => void }) {
  return (
    <section className="pt-10">
      <div className="container-mimo text-center">
        <h2 className="mx-auto max-w-[22ch] text-[clamp(34px,4.4vw,56px)] font-extrabold leading-[1.05]">Sua festa já tem data? Seus doces também podem ter</h2>
        <p className="mt-4 text-cacau-suave">Chame no WhatsApp, conte sobre o evento e receba seu orçamento por escrito.</p>
        <button type="button" onClick={onEncomendar} className="btn-primario btn-grande mt-7">
          <MessageCircle size={20} aria-hidden="true" /> Quero encomendar meus doces
        </button>
        <p className="mt-4 text-sm text-cacau-suave">Atendimento de {contato.horario}.</p>
      </div>
      <div className="mt-14">
        <Vitrine sabores={vitrineFim} tamanho="clamp(64px, 6.5vw, 92px)" />
      </div>
    </section>
  );
}

function Rodape() {
  return (
    <footer className="balcao pb-8 pt-12 text-sm text-creme-escuro">
      <div className="container-mimo grid gap-6 md:grid-cols-2">
        <div>
          <p className="font-display text-[22px] font-extrabold tracking-[-0.03em] text-pistache">mimo doceria</p>
          <p>Doces finos para festas</p>
        </div>
        <div className="space-y-1 md:text-right">
          <p>Ateliê na {marca.bairroRetirada}, {marca.cidade} · Retirada com hora marcada</p>
          <p>{contato.horarioCurto} · {marca.instagram}</p>
          <a href="#" className="text-rosa underline underline-offset-4">Política de privacidade</a>
        </div>
      </div>
      {config.projetoConceitual && (
        <div className="container-mimo">
          <p className="mt-8 border-t border-friso pt-5 text-[13px]">Projeto conceitual criado para portfólio. Marca, preços e depoimentos fictícios.</p>
        </div>
      )}
    </footer>
  );
}
