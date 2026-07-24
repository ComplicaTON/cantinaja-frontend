/**
 * Navbar compartilhada do projeto (componente único, usado por todas as páginas).
 *
 * Segue o padrão da seção "Navegação — Navbar" do README:
 * fundo #521C0D (Dark), itens com ícone Font Awesome + texto, colapsa em telas
 * menores que `lg`. Nenhuma feature deve renderizar seu próprio menu — a casca
 * (`src/app/<rota>/index.html`) injeta esta navbar uma única vez com o helper
 * `renderizarHtml` de `shared/utils.js`.
 *
 * Uso:
 *   import { renderizarHtml } from "/shared/utils.js";
 *   import { navbarHtml } from "/shared/navbar.js";
 *   renderizarHtml(navbarHtml, "navbar");   // "navbar" = id do container
 *
 * Este arquivo é COMPARTILHADO: alterá-lo muda a navbar de todas as páginas.
 * Mudanças passam por revisão de instrutor.
 */

export const navbarHtml = `
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
            <a class="nav-link" href="/src/app/cardapio/index.html">
              <i class="fa-solid fa-utensils me-1"></i>Cardápio
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/src/app/carteira/index.html">
              <i class="fa-solid fa-wallet me-1"></i>Carteira
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
`;
