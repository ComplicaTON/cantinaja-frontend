# Documento Técnico — Front-end Cantinaja

Este documento descreve a arquitetura, os padrões de código e o style guide visual utilizados no front-end do projeto Cantinaja. Ele deve ser consultado antes de criar novas telas, componentes ou features, e atualizado sempre que uma decisão de arquitetura ou UI mudar.

---

## 1. Stack

| Camada     | Tecnologia                      | Observações                                           |
| ---------- | ------------------------------- | ----------------------------------------------------- |
| Markup/UI  | HTML5 + Bootstrap 5.3.8         | Via CDN (jsDelivr), grid, componentes e utilitários   |
| Ícones     | Font Awesome (Kit)              | Carregado via `kit.fontawesome.com`                   |
| Tipografia | Google Fonts — **Inter**        | Variable font, pesos 100–900                          |
| Cores      | Paleta customizada (Color Hunt) | https://colorhunt.co/palette/f4e7e1ff9b45d5451b521c0d |

As tags de `<head>` abaixo são o padrão obrigatório em toda nova página (`src/app/**/index.html`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  rel="stylesheet"
/>
<script
  src="https://kit.fontawesome.com/78b084acaa.js"
  crossorigin="anonymous"
></script>
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
  rel="stylesheet"
  crossorigin="anonymous"
/>
```

E antes do fechamento de `</body>`:

```html
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
  crossorigin="anonymous"
></script>
```

---

## 2. Arquitetura Feature-Based

O projeto segue o modelo **feature-based** (organização por funcionalidade de negócio, não por tipo técnico de arquivo). Cada feature é autocontida: reúne suas próprias telas, estilos e lógica, evitando pastas genéricas gigantes como `components/` ou `pages/` soltas na raiz.

```
src/
  app/                # Pontos de entrada (páginas/rotas) da aplicação
    index.html
    carteira/
      index.html
    cardapio/
      index.html
  features/           # Regras de negócio e telas agrupadas por domínio
    carteira/
      saldo/
      recarregar/
      extrato/
      resumo/
    cardapio/
      listar-itens/
      cadastrar-item/
      editar-item/
      alterar-disponibilidade/
shared/                # Código reaproveitável entre múltiplas features (navbar, utils)
lib/                   # Integrações/wrappers de bibliotecas externas e config
styles/                # Tokens de design, variáveis globais e overrides do Bootstrap
```

### 2.1 `src/app`

Contém os pontos de entrada navegáveis da aplicação (uma pasta por rota/página). Um `index.html` em `app/` é **casca de página**: monta o layout (navbar, container, footer) e importa a(s) feature(s) correspondente(s). Não deve conter regra de negócio.

### 2.2 `src/features/<dominio>/<subfeature>`

Cada domínio de negócio (ex.: `carteira`) tem subpastas por caso de uso (`saldo`, `recarregar`, `extrato`, `resumo`). Uma subfeature deve conter tudo que só ela usa: markup/partials, scripts e estilos específicos. Regra prática: **se um arquivo é usado por só uma feature, ele mora dentro da feature; se é usado por duas ou mais, sobe para `shared/`.**

### 2.3 `shared/`

Componentes, partials, helpers e estilos usados por mais de uma feature (ex.: cards de valor monetário, badges de status, modais de confirmação). Nada aqui deve conhecer regra de negócio de uma feature específica.

### 2.4 `lib/`

Configuração e wrappers de bibliotecas de terceiros (ex.: inicialização de tooltips/popovers do Bootstrap, helpers de formatação, wrapper de chamadas HTTP). Código aqui é infraestrutura, não UI nem regra de negócio.

### 2.5 `styles/`

Estilos globais: tokens de cor, tipografia, espaçamento e overrides pontuais do Bootstrap (variáveis Sass ou CSS custom properties). Estilo específico de uma feature fica na própria feature; só o que é verdadeiramente global vive aqui.

### 2.6 Regra de dependência

```
app  →  features  →  shared  →  lib
```

Uma camada só pode importar de si mesma ou das camadas à direita. `shared/` e `lib/` nunca importam de `features/` ou `app/`. Isso evita acoplamento cruzado entre features.

---

## 3. Padrões de escrita de código

- **Idioma**: nomes de arquivos, pastas, subfeatures, variáveis e funções em **português** — o mesmo idioma do domínio usado no backend (ex.: `recarregar/`, `saldo/`, `renderizarHtml`). Termos técnicos consagrados permanecem em inglês (`shared`, `lib`, `app`, `fetch`, `index.html`). Textos visíveis ao usuário em **pt-br** (`<html lang="pt-br">`).
- **Nomenclatura de pastas/arquivos**: `kebab-case` (ex.: `cadastrar-item`, `card-saldo.html`).
- **Nomenclatura de classes CSS customizadas**: prefixo do projeto + BEM leve, para não colidir com utilitários do Bootstrap. Ex.: `cj-card-saldo`, `cj-card-saldo__titulo`, `cj-card-saldo--destaque`.
- **HTML**: indentação de 2 espaços, atributos de `<link>`/`<script>` quebrados em múltiplas linhas quando a tag ficar longa (ver exemplo da seção 1), sempre `lang`, `charset` e `viewport` no `<head>`.
- **Preferir utilitários do Bootstrap** (`d-flex`, `gap-3`, `mt-4`, `text-muted`, etc.) a CSS customizado. Só criar classe própria quando o utilitário não cobrir o caso.
- **Ícones**: usar apenas Font Awesome, com sufixo semântico, nunca ícone "solto" sem `aria-label` quando não houver texto ao lado (acessibilidade).
- **Uma feature, uma responsabilidade**: uma subfeature (`recarregar`, `extrato`, etc.) não deve fazer merge de responsabilidades de outra. Se um componente passa a ser usado por outra feature, mover para `shared/`.
- **Sem duplicação de setup de página**: qualquer `<head>` novo deve reaproveitar exatamente as tags descritas na seção 1 (mesma versão de Bootstrap, mesmo kit do Font Awesome, mesma URL da Inter) para manter consistência visual e cache de CDN entre páginas.

---

## 4. Style Guide

### 4.1 Paleta de cores

Paleta oficial (Color Hunt): https://colorhunt.co/palette/f4e7e1ff9b45d5451b521c0d

| Cor              | Hex       | Papel sugerido         | Uso                                                                                    |
| ---------------- | --------- | ---------------------- | -------------------------------------------------------------------------------------- |
| 🟧 Creme         | `#F4E7E1` | **Background / Light** | Fundo de página, fundo de cards, superfícies claras                                    |
| 🟠 Laranja       | `#FF9B45` | **Primary**            | Botões primários, links, elementos de destaque, navbar (se clara)                      |
| 🔴 Terracota     | `#D5451B` | **Secondary / Accent** | Hover de botão primário, alertas, badges de destaque, valores importantes (ex.: saldo) |
| 🟤 Marrom escuro | `#521C0D` | **Dark / Text**        | Texto principal, navbar escura, footer, bordas de contraste                            |

Recomendações de aplicação:

- Texto sobre `#F4E7E1` → usar `#521C0D` (contraste alto).
- Texto sobre `#FF9B45` ou `#D5451B` → usar `#F4E7E1` ou branco puro `#FFFFFF` (nunca `#521C0D` sobre essas cores, contraste insuficiente).
- Estados de erro reaproveitam `#D5451B`; não introduzir um vermelho fora da paleta.
- Evitar introduzir cores fora dessas quatro. Tons intermediários (tints/shades) só via `color-mix()`/opacidade das cores acima, quando necessário para estados `:hover`/`:disabled`.

Mapeamento para as variáveis do Bootstrap (já aplicado em `styles/styles.css`). As versões `-rgb` alimentam os **utilitários** (`bg-primary`, `bg-dark`, `text-*`):

```css
:root {
  --bs-primary: #ff9b45;      --bs-primary-rgb: 255, 155, 69;
  --bs-secondary: #d5451b;    --bs-secondary-rgb: 213, 69, 27;
  --bs-light: #f4e7e1;        --bs-light-rgb: 244, 231, 225;
  --bs-dark: #521c0d;         --bs-dark-rgb: 82, 28, 13;
  --bs-body-bg: #f4e7e1;      --bs-body-color: #521c0d;
}
```

> ⚠️ **Pega-ratão do Bootstrap 5.3:** as classes `.btn-*` **não** leem `--bs-primary` — a cor do botão é "compilada" em variáveis próprias (`--bs-btn-bg`, etc.). Por isso, mudar `--bs-primary` **não** recolore os botões. Para o botão usar a paleta, `styles/styles.css` sobrescreve as variáveis do próprio botão (`.btn-primary { --bs-btn-bg: #ff9b45; ... }`). Já os **utilitários** (`bg-dark` da navbar, `bg-primary`, `text-primary`) respeitam as `-rgb` do `:root` normalmente.

### 4.2 Tipografia — Inter

Fonte única do projeto: **Inter** (Google Fonts, variable font, `ital,opsz,wght@0,14..32,100..900`).

```css
body {
  font-family: "Inter", system-ui, sans-serif;
}
```

Pesos definidos por tipo de texto — usar exatamente estes valores, não pesos intermediários "livres":

| Elemento                       | Peso (`font-weight`) | Tamanho sugerido  | Uso                                         |
| ------------------------------ | -------------------- | ----------------- | ------------------------------------------- |
| H1 — Título de página          | 700 (Bold)           | 2.5rem / 40px     | Título principal de cada tela               |
| H2 — Título de seção           | 700 (Bold)           | 2rem / 32px       | Divisões grandes dentro da página           |
| H3 — Subtítulo                 | 600 (SemiBold)       | 1.5rem / 24px     | Subseções, títulos de bloco                 |
| H4 — Título de card/componente | 600 (SemiBold)       | 1.25rem / 20px    | Cabeçalho de card, modal, painel            |
| Lead / texto de destaque       | 500 (Medium)         | 1.125rem / 18px   | Chamadas de atenção, resumo de saldo        |
| Corpo de texto (padrão)        | 400 (Regular)        | 1rem / 16px       | Parágrafos, descrições                      |
| Label / texto de formulário    | 500 (Medium)         | 0.875rem / 14px   | Labels de input, texto de botão pequeno     |
| Botões                         | 600 (SemiBold)       | 1rem / 16px       | Todo `<button>`/`.btn`                      |
| Caption / legenda              | 400 (Regular)        | 0.75rem / 12px    | Timestamps, notas de rodapé, ajuda de campo |
| Link                           | 500 (Medium)         | herda do contexto | `<a>` dentro de texto corrido               |

Regra geral: nunca usar pesos abaixo de 400 (`Thin`, `ExtraLight`, `Light`) em texto de UI — a variable font permite, mas prejudica legibilidade em telas pequenas. Pesos acima de 700 (`ExtraBold`, `Black`) reservados a usos pontuais de branding, não em texto de tela.

### 4.3 Ícones — Font Awesome

- Biblioteca: Font Awesome via Kit (`kit.fontawesome.com`), já incluído no `<head>` padrão.
- Estilo padrão: **Solid** (`fa-solid`) para ícones funcionais (ações, navegação); **Regular** (`fa-regular`) apenas quando for necessário um traço mais leve em contextos decorativos.
- Tamanho segue o texto ao redor por padrão (`1em`); usar classes utilitárias do próprio Font Awesome (`fa-lg`, `fa-xl`) para destaque, evitando `font-size` customizado solto.
- Cor do ícone herda `currentColor` sempre que possível, para acompanhar o texto/estado do componente (ex.: ícone dentro de `.btn-primary` fica automaticamente na cor de texto do botão).
- Ícone sem texto ao lado precisa de `aria-label` no elemento pai ou `<span class="visually-hidden">` — acessibilidade obrigatória.

### 4.4 Espaçamento de componentes

Base: escala de espaçamento nativa do Bootstrap (`$spacer: 1rem`), usada via utilitários (`m-*`, `p-*`, `gap-*`), múltiplos de `0.25rem`:

| Token     | Valor         | Utilitário Bootstrap | Uso típico                                                     |
| --------- | ------------- | -------------------- | -------------------------------------------------------------- |
| `space-0` | 0             | `0`                  | Reset                                                          |
| `space-1` | 0.25rem (4px) | `1`                  | Espaço entre ícone e texto                                     |
| `space-2` | 0.5rem (8px)  | `2`                  | Espaço entre label e input                                     |
| `space-3` | 1rem (16px)   | `3`                  | Padding interno padrão de card, gap entre campos de formulário |
| `space-4` | 1.5rem (24px) | `4`                  | Espaço entre blocos dentro de uma mesma seção                  |
| `space-5` | 3rem (48px)   | `5`                  | Espaço entre seções distintas da página                        |

Regras práticas:

- **Padding interno de card/painel**: `p-3` (mobile) a `p-4` (desktop).
- **Gap entre itens de uma lista/grid de cards**: `gap-3`.
- **Gap entre campos de um formulário**: `gap-3` verticalmente (ou `mb-3` em cada `.form-group` caso não use flex/grid).
- **Espaço entre navbar e conteúdo**: `mt-4` no container principal.
- **Espaço entre seções da página** (ex.: bloco de saldo → bloco de extrato): `my-5`.
- **Botões lado a lado**: `gap-2`.
- Não usar valores de espaçamento "soltos" (`margin: 13px`, `padding: 22px`) — sempre a escala acima, via classes utilitárias ou variáveis CSS equivalentes em `styles/`.

### 4.5 Navegação — Navbar (Bootstrap)

O menu principal da aplicação é sempre o componente **Navbar** nativo do Bootstrap (`.navbar`), sem substituições por menus customizados.

Markup de referência (o componente real está em `shared/navbar.js`; ver seção 5). A cor vem da **paleta**, não de um hex cravado: `bg-dark` usa a variável `--bs-dark-rgb` de `styles/styles.css` (= `#521C0D`), e `data-bs-theme="dark"` deixa texto/ícones/toggler claros automaticamente.

```html
<nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div class="container">
    <a class="navbar-brand fw-semibold" href="/src/app/index.html">CantinaJá</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarPrincipal"
      aria-controls="navbarPrincipal"
      aria-expanded="false"
      aria-label="Alternar navegação"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarPrincipal">
      <ul class="navbar-nav ms-auto gap-2">
        <li class="nav-item">
          <a class="nav-link" href="/src/app/cardapio/index.html"
            ><i class="fa-solid fa-utensils me-1"></i>Cardápio</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/src/app/carteira/index.html"
            ><i class="fa-solid fa-wallet me-1"></i>Carteira</a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>
```

Diretrizes:

- Fundo da navbar na cor **Dark** da paleta (`#521C0D`) — via classe **`bg-dark`** + `data-bs-theme="dark"`, que puxa a cor de `--bs-dark-rgb` (`styles/styles.css`). **Não** cravar `style="background-color: #521C0D"`: se a paleta mudar, a navbar deve acompanhar sozinha.
- Usar sempre `navbar-expand-lg` (colapsa em telas menores que `lg`) com `navbar-toggler` para mobile.
- Itens de menu com ícone Font Awesome + texto, nunca só ícone (exceto ações secundárias como perfil/notificação, que precisam de `aria-label`).
- Nenhuma feature deve renderizar seu próprio menu de navegação — a navbar é montada uma vez em `src/app` e as features só populam conteúdo abaixo dela.

---

## 5. Montando a tela: `renderizarHtml`, a navbar e as seções de feature

Este projeto **não usa `fetch` de arquivos `.html`** para montar a tela. O padrão é: cada pedaço de UI é uma **string de HTML** exportada por um módulo, e o helper `renderizarHtml` (em `shared/utils.js`) injeta essa string dentro de um elemento da página pelo `id`.

### 5.1 O helper `renderizarHtml`

```js
// shared/utils.js
export function renderizarHtml(html, idPrincipal) { ... }
```

- **`html`**: uma string com o HTML a inserir (ex.: a navbar, um card).
- **`idPrincipal`**: o `id` do elemento que vai **receber** esse HTML.
- Comportamento: insere o HTML **no início** do elemento (`insertAdjacentHTML("afterbegin")`). Se o `id` não existir na página, ele apenas avisa no console (`console.warn`) e não faz nada — por isso o elemento-alvo precisa existir no HTML da casca **antes** do script rodar.

### 5.2 A casca injeta a navbar (padrão de toda página `src/app/**/index.html`)

A navbar é um componente compartilhado (`shared/navbar.js`) que exporta a string `navbarHtml`. A casca (mantida pelos instrutores) declara um contêiner vazio, injeta a navbar nele e deixa um `<main>` **vazio** como área de trabalho — é aí que os devs montam a tela:

```html
<body>
  <!-- 1) contêiner-alvo da navbar (mantido pela casca/instrutor) -->
  <div id="navbar"></div>

  <!-- 2) área de trabalho: VAZIA. Cada feature cria a sua <section> aqui dentro. -->
  <main class="container my-4">
    <!-- as features desta página injetam aqui (ver 5.3) -->
  </main>

  <script src="…bootstrap.bundle.min.js" …></script>

  <!-- 3) módulo da casca: importa o helper e a navbar, e injeta a navbar -->
  <script type="module">
    import { renderizarHtml } from "/shared/utils.js";
    import { navbarHtml } from "/shared/navbar.js";

    renderizarHtml(navbarHtml, "navbar");
  </script>
</body>
```

> A casca **não** vem com as seções de feature prontas — isso é trabalho do dev (seção 5.3). A casca entrega só a navbar + o `<main>` vazio.

> **Importante:** os scripts são **ES modules** (`<script type="module">` + `import`/`export`). Por isso o projeto **precisa ser servido por um servidor** (Live Server, ou `npx serve` na raiz) — abrir o arquivo direto (`file://`) faz o `import` falhar. Sempre sirva pela **raiz do repositório**, para os caminhos absolutos (`/shared/...`, `/src/app/...`) funcionarem.

### 5.2.1 Abordagem alternativa com `fetch` (didática) e por que preferimos o módulo

Existe uma forma clássica de montar a navbar: guardar o markup num arquivo `.html` separado (`shared/navbar.html`) e **buscá-lo em tempo de execução** com `fetch`. Mantemos esse arquivo no repositório **só para fins didáticos** — é bom conhecer a técnica:

```js
// Alternativa com fetch — NÃO é o padrão do projeto, mas funciona:
fetch("/shared/navbar.html")
  .then((resposta) => resposta.text())
  .then((html) => renderizarHtml(html, "navbar"));
```

**Por que o projeto usa `shared/navbar.js` (string em módulo) no lugar do `fetch`:**

- **É uma requisição de rede a menos.** O `fetch` faz uma **chamada HTTP extra** para baixar o `.html` toda vez que a página abre; o `import` do módulo entrega o markup direto, sem ida ao servidor.
- **É síncrono e previsível.** O `fetch` é **assíncrono** (`.then`/`await`): a navbar aparece "depois", e você precisa cuidar da ordem e de possíveis falhas de rede. O `import` resolve o módulo antes do código rodar — a string já está lá.
- **Falha cedo e claro.** Se você errar o caminho do `import`, o erro aparece **na hora**, no console, apontando o módulo. Um `fetch` que falha (404, offline) só quebra em runtime, silenciosamente, e some com a navbar sem dizer o porquê.
- **Combina com o resto do código.** Todo o projeto já usa ES modules (`export`/`import`) em `lib/` e `shared/`. Usar módulo para a navbar mantém **um padrão só** — sem misturar "às vezes fetch, às vezes import".

Regra prática: **use `shared/navbar.js` (módulo).** O `shared/navbar.html` + `fetch` fica como material de estudo; se um dia mexer na navbar, mexa no `navbar.js` (o `.html` é só espelho didático).

### 5.3 Uma feature cria a própria seção e injeta o conteúdo

Cada feature é responsável por **criar a sua `<section>`** dentro do `<main>` da casca e **injetar** a própria UI nela. Passo a passo (exemplo do saldo, FED-006):

**1) A feature cria o seu ponto de ancoragem** dentro do `<main>` da casca (uma `<section>` com um `id` só dela):

```html
<!-- dentro do <main> da casca (src/app/carteira/index.html) -->
<section id="feature-saldo" class="my-5"></section>
```

**2) A feature injeta o conteúdo nessa seção** pelo seu próprio script:

```js
// src/features/carteira/saldo/saldo.js
import { renderizarHtml } from "/shared/utils.js";

const saldoHtml = `
  <div class="card">
    <div class="card-body">
      <h4 class="card-title">Meu saldo</h4>
      <p class="fs-2 fw-semibold" id="valor-saldo">—</p>
    </div>
  </div>
`;

renderizarHtml(saldoHtml, "feature-saldo");   // injeta na <section id="feature-saldo">
// ...depois o fetch preenche #valor-saldo
```

**3) A casca carrega o script da feature** (uma linha por história, combinada na squad):

```html
<script type="module" src="/src/features/carteira/saldo/saldo.js"></script>
```

> Combinem entre a squad os `id`s das seções e a ordem em que aparecem no `<main>` — é isso que define o layout da página.

Regras que decorrem disso:

- **A feature nunca cria página inteira** (nada de `<html>`/`<head>`/`<body>`). Ela entrega **fragmento + script** e injeta na sua seção.
- **A feature nunca mexe na navbar nem em outra seção** — só na `id` reservada para ela. Isso é o que permite quatro devs trabalharem na mesma página sem conflito.
- **Componente usado por 2+ features** (ex.: um card de valor monetário usado por saldo **e** resumo) sobe para `shared/` e é importado pelas duas, seguindo a regra de dependência da seção 2.6.

### 5.4 `shared/navbar.js` é read-only para os times

Alterar a navbar muda **todas as páginas**. Por isso `shared/navbar.js` (como todo `shared/` e `lib/`) só muda com revisão de instrutor. Se faltar um link ou algo nela, isso é tarefa de manutenção do compartilhado, não de uma história de feature.

---

## 6. Checklist rápido para nova página/feature

- [ ] `<head>` segue exatamente o padrão da seção 1 (mesmas versões de Bootstrap/Font Awesome/Inter).
- [ ] Página vive em `src/app/<rota>/index.html` e delega conteúdo de negócio para `src/features/...`.
- [ ] Componentes reutilizados por 2+ features foram movidos para `shared/`.
- [ ] Cores usadas pertencem à paleta da seção 4.1 (sem cor "fora da paleta").
- [ ] Textos usam os pesos de Inter definidos na tabela da seção 4.2.
- [ ] Ícones são Font Awesome, com `aria-label` quando não houver texto.
- [ ] Espaçamentos usam a escala da seção 4.4 (utilitários Bootstrap).
- [ ] Menu de navegação é a Navbar do Bootstrap, não um componente customizado.
- [ ] A casca injeta a navbar com `renderizarHtml(navbarHtml, "navbar")` (seção 5.2).
- [ ] Cada feature injeta seu HTML só na seção reservada a ela, via `renderizarHtml` (seção 5.3).
- [ ] Projeto servido pela **raiz** com Live Server / `npx serve` (ES modules exigem servidor).
