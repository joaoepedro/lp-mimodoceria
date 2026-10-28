export const config = {
  marca: {
    nome: "Mimo Doceria",
    logoNome: "mimo",
    logoComplemento: "doceria",
    instagram: "@mimodoceria",
    cidade: "São Paulo",
    bairroRetirada: "Vila Mariana",
    areaEntrega: "toda a capital paulista",
    fundacao: 2019,
  },
  contato: {
    whatsapp: "", // só números com DDI e DDD; vazio = modo demonstração
    horario: "segunda a sábado, das 9h às 19h",
    horarioCurto: "Seg a sáb, 9h às 19h",
  },
  projetoConceitual: true,
  prova: { festas: "+1.200", nota: "4,9 de 5", avaliacoes: 380 },
  pedido: {
    minimoPorSabor: 50,
    antecedenciaFestaDias: 7,
    antecedenciaCasamentoDias: 30,
    sinalPercentual: 50,
    parcelasCasamento: 3,
    agendaCasamentos: "2027",
  },
  cardapio: [
    { nome: "Brigadeiros gourmet", preco: "R$ 240", unidade: "o cento", descricao: "Tradicional com chocolate belga, pistache, ninho com Nutella, maracujá, café, churros e limão-siciliano." },
    { nome: "Docinhos finos", preco: "R$ 320", unidade: "o cento", descricao: "Camafeu de nozes, trufa de champanhe, olho de sogra, damasco com chocolate branco e bombom de uva." },
    { nome: "Bem-casados", preco: "R$ 5,50", unidade: "a unidade", descricao: "Doce de leite, ovos moles ou limão. Embrulhados em papel crepom com fita na cor do seu evento." },
    { nome: "Caixas presente", preco: "R$ 48", unidade: "a caixa", descricao: "Nove doces de sabores sortidos, laço e cartão com a sua mensagem." },
  ],
  degustacao: { preco: "R$ 45", sabores: 4 },
  calculadora: {
    convidadosInicial: 60,
    convidadosMinimo: 10,
    passo: 10,
    unidadesPorSabor: 50,
    maxSabores: 6,
    eventos: {
      festa: { rotulo: "Aniversário ou festa", nomeMensagem: "aniversário ou festa infantil", docinhosPorConvidado: 4, bemCasadosPorConvidado: 0 },
      casamento: { rotulo: "Casamento", nomeMensagem: "casamento", docinhosPorConvidado: 5, bemCasadosPorConvidado: 1 },
      corporativo: { rotulo: "Evento corporativo", nomeMensagem: "evento corporativo", docinhosPorConvidado: 3, bemCasadosPorConvidado: 0 },
    },
  },
  mensagens: {
    geral: "Oi, Mimo! Vim pelo site e quero encomendar doces para a minha festa.",
    cardapio: "Oi, Mimo! Vi o cardápio no site e quero montar um pedido.",
    degustacao: "Oi, Mimo! Vou casar e quero pedir a caixa degustação.",
    calculadora: "Oi, Mimo! Usei a calculadora do site: {evento} para {convidados} convidados, sugestão de {docinhos} docinhos{bemCasados}. Data: {data}. Pode me ajudar a montar o pedido?",
  },
  seo: {
    titulo: "Mimo Doceria | Doces finos para festas em São Paulo",
    descricao: "Brigadeiros gourmet, bem-casados e docinhos finos feitos à mão, com entrega em toda a capital paulista. Veja o cardápio e encomende pelo WhatsApp.",
  },
} as const;

export type TipoEvento = keyof typeof config.calculadora.eventos;
