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
    wallet/
      index.html
  features/           # Regras de negócio e telas agrupadas por domínio
    wallet/
      balance/
      recharge/
      statement/
    menu/
      item-availability/
      item-creating/
      item-editing/
      item-list/
shared/                # Código reaproveitável entre múltiplas features
lib/                   # Integrações/wrappers de bibliotecas externas e config
styles/                # Tokens de design, variáveis globais e overrides do Bootstrap
```

### 2.1 `src/app`

Contém os pontos de entrada navegáveis da aplicação (uma pasta por rota/página). Um `index.html` em `app/` é **casca de página**: monta o layout (navbar, container, footer) e importa a(s) feature(s) correspondente(s). Não deve conter regra de negócio.

### 2.2 `src/features/<dominio>/<subfeature>`

Cada domínio de negócio (ex.: `wallet`) tem subpastas por caso de uso (`balance`, `recharge`, `statement`). Uma subfeature deve conter tudo que só ela usa: markup/partials, scripts e estilos específicos. Regra prática: **se um arquivo é usado por só uma feature, ele mora dentro da feature; se é usado por duas ou mais, sobe para `shared/`.**

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

- **Idioma**: nomes de arquivos, pastas, classes CSS customizadas e variáveis em **inglês**; textos visíveis ao usuário em **pt-br** (`<html lang="pt-br">`).
- **Nomenclatura de pastas/arquivos**: `kebab-case` (ex.: `wallet-recharge`, `balance-card.html`).
- **Nomenclatura de classes CSS customizadas**: prefixo do projeto + BEM leve, para não colidir com utilitários do Bootstrap. Ex.: `cj-balance-card`, `cj-balance-card__title`, `cj-balance-card--highlighted`.
- **HTML**: indentação de 2 espaços, atributos de `<link>`/`<script>` quebrados em múltiplas linhas quando a tag ficar longa (ver exemplo da seção 1), sempre `lang`, `charset` e `viewport` no `<head>`.
- **Preferir utilitários do Bootstrap** (`d-flex`, `gap-3`, `mt-4`, `text-muted`, etc.) a CSS customizado. Só criar classe própria quando o utilitário não cobrir o caso.
- **Ícones**: usar apenas Font Awesome, com sufixo semântico, nunca ícone "solto" sem `aria-label` quando não houver texto ao lado (acessibilidade).
- **Uma feature, uma responsabilidade**: uma subfeature (`recharge`, `statement`, etc.) não deve fazer merge de responsabilidades de outra. Se um componente passa a ser usado por outra feature, mover para `shared/`.
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

Sugestão de mapeamento para variáveis do Bootstrap (`styles/`):

```css
:root {
  --bs-primary: #ff9b45;
  --bs-secondary: #d5451b;
  --bs-light: #f4e7e1;
  --bs-dark: #521c0d;
}
```

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

```html
<nav class="navbar navbar-expand-lg" style="background-color: #521C0D;">
  <div class="container">
    <a class="navbar-brand text-white fw-semibold" href="/">Cantinaja</a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarMain"
      aria-controls="navbarMain"
      aria-expanded="false"
      aria-label="Alternar navegação"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarMain">
      <ul class="navbar-nav ms-auto gap-2">
        <li class="nav-item">
          <a class="nav-link text-white" href="/wallet"
            ><i class="fa-solid fa-wallet me-1"></i>Carteira</a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>
```

Diretrizes:

- Fundo da navbar em `#521C0D` (Dark), texto/ícones em branco ou `#F4E7E1`.
- Usar sempre `navbar-expand-lg` (colapsa em telas menores que `lg`) com `navbar-toggler` para mobile.
- Itens de menu com ícone Font Awesome + texto, nunca só ícone (exceto ações secundárias como perfil/notificação, que precisam de `aria-label`).
- Nenhuma feature deve renderizar seu próprio menu de navegação — a navbar é montada uma vez em `src/app` e as features só populam conteúdo abaixo dela.

---

## 5. Checklist rápido para nova página/feature

- [ ] `<head>` segue exatamente o padrão da seção 1 (mesmas versões de Bootstrap/Font Awesome/Inter).
- [ ] Página vive em `src/app/<rota>/index.html` e delega conteúdo de negócio para `src/features/...`.
- [ ] Componentes reutilizados por 2+ features foram movidos para `shared/`.
- [ ] Cores usadas pertencem à paleta da seção 4.1 (sem cor "fora da paleta").
- [ ] Textos usam os pesos de Inter definidos na tabela da seção 4.2.
- [ ] Ícones são Font Awesome, com `aria-label` quando não houver texto.
- [ ] Espaçamentos usam a escala da seção 4.4 (utilitários Bootstrap).
- [ ] Menu de navegação é a Navbar do Bootstrap, não um componente customizado.
