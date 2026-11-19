"use strict";

// Depende de dados.js (HEROIS e MAPAS). Carregue dados.js ANTES deste arquivo.
// Cada página informa qual é pelo atributo <body data-pagina="...">.

const PAGINA = document.body.dataset.pagina || "";
const PASTA_HEROIS = "imagens/herois/";
const PASTA_MAPAS = "imagens/mapas/";
const SITE_OFICIAL = "https://overwatch.blizzard.com/pt-br/heroes/";

// ---------- utilidades ----------

function normalizar(texto) {
  return String(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

function el(tag, classe, texto) {
  const e = document.createElement(tag);
  if (classe) e.className = classe;
  if (texto !== undefined) e.textContent = texto;
  return e;
}

function mostrarMensagem(texto) {
  const m = document.getElementById("mensagem");
  if (m) m.textContent = texto;
}

// Imagem de capa. Se o arquivo não existir na pasta, mostra um retrato
// provisório com as iniciais do herói (assim nenhum cartão fica quebrado).
function iniciais(nome) {
  return nome.replace(/[^A-Za-zÀ-ú. ]/g, "").split(/\s+/).map(p => p[0]).join("").slice(0, 2).toUpperCase();
}

function provisorio(nome) {
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'>" +
    "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#26354d'/><stop offset='1' stop-color='#0f1623'/></linearGradient></defs>" +
    "<rect width='400' height='500' fill='url(#g)'/>" +
    "<text x='200' y='290' font-family='Arial' font-size='150' font-weight='700' fill='#ff9848' text-anchor='middle'>" +
    iniciais(nome) + "</text></svg>";
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function criarImagem(src, alt, nome, classe) {
  const img = el("img", classe);
  img.alt = alt;
  img.loading = "lazy";
  img.src = src;
  img.addEventListener("error", () => {
    img.onerror = null;
    img.src = provisorio(nome);
  }, { once: true });
  return img;
}

function slugCor(funcao) {
  return funcao === "Tanque" ? "tanque" : funcao === "Suporte" ? "suporte" : "dano";
}

// ---------- cartões ----------

function cartaoHeroi(h) {
  const a = el("a", "cartao cartao-heroi");
  a.href = "heroi.html?id=" + encodeURIComponent(h.id);
  a.appendChild(criarImagem(PASTA_HEROIS + h.id + ".png", "Retrato de " + h.nome, h.nome, "retrato"));
  const corpo = el("div", "cartao-corpo");
  corpo.appendChild(el("h3", "", h.nome));
  corpo.appendChild(el("span", "selo selo-" + slugCor(h.funcao), h.funcao));
  corpo.appendChild(el("p", "", h.resumo));
  a.appendChild(corpo);
  return a;
}

function exibirHerois(lista, alvoId, mensagemVazia) {
  const alvo = document.getElementById(alvoId);
  if (!alvo) return;
  alvo.replaceChildren();
  if (lista.length === 0) {
    mostrarMensagem(mensagemVazia || "Nenhum herói encontrado. Confira o nome e tente novamente.");
    return;
  }
  mostrarMensagem(lista.length + " herói(s) encontrado(s).");
  lista.forEach(h => alvo.appendChild(cartaoHeroi(h)));
}

// ---------- busca (index e herois) ----------

function filtrarHerois() {
  const campo = document.getElementById("campoPersonagem");
  const termo = campo ? normalizar(campo.value.trim()) : "";
  const funcao = (document.getElementById("filtroFuncao") || {}).value || "";
  return HEROIS.filter(h =>
    (!termo || normalizar(h.nome).includes(termo)) &&
    (!funcao || h.funcao === funcao)
  );
}

function configurarBusca() {
  const form = document.getElementById("formPesquisa");
  const campo = document.getElementById("campoPersonagem");
  const filtro = document.getElementById("filtroFuncao");
  if (!form) return;

  const atualizar = () => exibirHerois(filtrarHerois(), "resultado");

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (PAGINA === "inicio" && !campo.value.trim()) {
      document.getElementById("resultado").replaceChildren();
      mostrarMensagem("Digite o nome de um herói para pesquisar.");
      return;
    }
    atualizar();
  });

  if (campo) {
    campo.addEventListener("input", () => {
      if (PAGINA === "herois") atualizar();
      else if (!campo.value.trim()) {
        document.getElementById("resultado").replaceChildren();
        mostrarMensagem("");
      }
    });
  }
  if (filtro) filtro.addEventListener("change", atualizar);

  if (PAGINA === "herois") atualizar();
  else mostrarMensagem("Bem-vindo à Central de Heróis!");
}

// ---------- página do herói ----------

function paginaHeroi() {
  const raiz = document.getElementById("ficha");
  if (!raiz) return;

  const id = new URLSearchParams(location.search).get("id");
  const h = HEROIS.find(x => x.id === id);

  if (!h) {
    raiz.appendChild(el("h1", "", "Herói não encontrado"));
    const p = el("p", "", "Volte à lista de heróis e escolha um personagem.");
    raiz.appendChild(p);
    const a = el("a", "botao-link", "Ver todos os heróis");
    a.href = "Page2.html";
    raiz.appendChild(a);
    return;
  }

  document.title = h.nome + " | Overwatch";

  const topo = el("div", "ficha-topo");
  topo.appendChild(criarImagem(PASTA_HEROIS + h.id + ".png", "Retrato de " + h.nome, h.nome, "ficha-imagem"));

  const info = el("div", "ficha-info");
  info.appendChild(el("h1", "", h.nome));
  info.appendChild(el("span", "selo selo-" + slugCor(h.funcao), h.funcao + " · " + h.sub));
  info.appendChild(el("p", "ficha-origem", "Origem: " + h.origem));
  info.appendChild(el("p", "", h.resumo));
  const oficial = el("a", "botao-link", "Ver na página oficial");
  oficial.href = SITE_OFICIAL + h.id + "/";
  oficial.target = "_blank";
  oficial.rel = "noopener";
  info.appendChild(oficial);
  topo.appendChild(info);
  raiz.appendChild(topo);

  const hist = el("section", "ficha-bloco");
  hist.appendChild(el("h2", "", "História"));
  hist.appendChild(el("p", "", h.historia));
  raiz.appendChild(hist);

  const hab = el("section", "ficha-bloco");
  hab.appendChild(el("h2", "", "Habilidades"));
  const lista = el("div", "grade");
  h.habilidades.forEach(([nome, desc]) => {
    const c = el("article", "cartao");
    c.appendChild(el("h3", "", nome));
    c.appendChild(el("p", "", desc));
    lista.appendChild(c);
  });
  hab.appendChild(lista);
  raiz.appendChild(hab);

  if (h.conferir) {
    raiz.appendChild(el("p", "nota", "Ficha resumida: confira a história e as habilidades completas na página oficial."));
  }

  // anterior / próximo
  const i = HEROIS.indexOf(h);
  const nav = el("div", "ficha-nav");
  const ant = HEROIS[(i - 1 + HEROIS.length) % HEROIS.length];
  const prox = HEROIS[(i + 1) % HEROIS.length];
  const a1 = el("a", "botao-link", "← " + ant.nome);
  a1.href = "heroi.html?id=" + ant.id;
  const a2 = el("a", "botao-link", prox.nome + " →");
  a2.href = "heroi.html?id=" + prox.id;
  nav.append(a1, a2);
  raiz.appendChild(nav);
}

// ---------- mapas ----------

function paginaMapas() {
  const alvo = document.getElementById("listaMapas");
  const filtro = document.getElementById("filtroModo");
  if (!alvo) return;

  const modos = [...new Set(MAPAS.map(m => m.modo))];
  if (filtro) {
    modos.forEach(m => {
      const o = el("option", "", m);
      o.value = m;
      filtro.appendChild(o);
    });
  }

  const desenhar = () => {
    alvo.replaceChildren();
    const escolhido = filtro ? filtro.value : "";
    modos.filter(m => !escolhido || m === escolhido).forEach(modo => {
      const grupo = MAPAS.filter(m => m.modo === modo);
      const sec = el("section", "grupo-mapas");
      sec.appendChild(el("h2", "", modo + " (" + grupo.length + ")"));
      const grade = el("div", "grade");
      grupo.forEach(m => {
        const c = el("article", "cartao cartao-mapa");
        c.appendChild(criarImagem(PASTA_MAPAS + m.id + ".jpg", "Mapa " + m.nome, m.nome, "imagem-mapa"));
        const corpo = el("div", "cartao-corpo");
        corpo.appendChild(el("h3", "", m.nome));
        corpo.appendChild(el("p", "mapa-local", m.local));
        corpo.appendChild(el("p", "", m.descricao));
        c.appendChild(corpo);
        grade.appendChild(c);
      });
      sec.appendChild(grade);
      alvo.appendChild(sec);
    });
  };

  if (filtro) filtro.addEventListener("change", desenhar);
  desenhar();
}

// ---------- habilidades ----------

function paginaHabilidades() {
  const alvo = document.getElementById("listaHabilidades");
  const campo = document.getElementById("buscaHabilidade");
  const filtro = document.getElementById("filtroFuncao");
  if (!alvo) return;

  const desenhar = () => {
    alvo.replaceChildren();
    const termo = campo ? normalizar(campo.value.trim()) : "";
    const funcao = filtro ? filtro.value : "";
    const lista = HEROIS.filter(h =>
      (!funcao || h.funcao === funcao) &&
      (!termo || normalizar(h.nome).includes(termo) ||
        h.habilidades.some(([n]) => normalizar(n).includes(termo)))
    );
    mostrarMensagem(lista.length + " herói(s) listado(s).");
    lista.forEach(h => {
      const d = el("details", "cartao detalhe-heroi");
      const s = el("summary", "", h.nome + " — " + h.funcao + " (" + h.sub + ")");
      d.appendChild(s);
      const ul = el("ul");
      h.habilidades.forEach(([n, desc]) => {
        const li = el("li");
        const b = el("strong", "", n + ": ");
        li.append(b, document.createTextNode(desc));
        ul.appendChild(li);
      });
      d.appendChild(ul);
      const a = el("a", "botao-link", "Abrir ficha de " + h.nome);
      a.href = "heroi.html?id=" + h.id;
      d.appendChild(a);
      alvo.appendChild(d);
    });
  };

  if (campo) campo.addEventListener("input", desenhar);
  if (filtro) filtro.addEventListener("change", desenhar);
  desenhar();
}

// ---------- tema e relógio ----------

function alternarTema() {
  document.body.classList.toggle("tema-claro");
  try {
    localStorage.setItem("tema", document.body.classList.contains("tema-claro") ? "claro" : "escuro");
  } catch (e) { /* sem armazenamento: ignora */ }
}

function atualizarRelogio() {
  const r = document.getElementById("relogio");
  if (r) r.textContent = new Date().toLocaleTimeString("pt-BR");
}

// ---------- inicialização ----------

document.addEventListener("DOMContentLoaded", () => {
  try {
    if (localStorage.getItem("tema") === "claro") document.body.classList.add("tema-claro");
  } catch (e) { /* ignora */ }

  if (PAGINA === "inicio" || PAGINA === "herois") configurarBusca();
  if (PAGINA === "heroi") paginaHeroi();
  if (PAGINA === "mapas") paginaMapas();
  if (PAGINA === "habilidades") paginaHabilidades();

  atualizarRelogio();
  window.setInterval(atualizarRelogio, 1000);
});
