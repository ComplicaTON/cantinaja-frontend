import { CONFIG_API } from "/lib/config.js";
import { renderizarHtml } from "../../../../shared/utils.js";
import { carregarTransacoes } from "./service/api.js";

const CARD_HTML = 
`<div class="d-flex flex-column flex-lg-row gap-3">

  <!-- CARD 1: Total Recarregado -->

  <div class="card bg-primary border-0 shadow-sm flex-fill">
    <div class="card-body p-3 p-md-4">
      <h6 class="card-title text-light text-uppercase fw-bold mb-2">Total Recarregado</h6>
      <p class="fs-2 fw-semibold text-light m-0" id="total-recarregado">R$ 0</p>
    </div>
  </div>

  <!-- CARD 2: Total Gasto -->

  <div class="card bg-primary border-0 shadow-sm flex-fill">
    <div class="card-body p-3 p-md-4">
      <h6 class="card-title text-light text-uppercase fw-bold mb-2">Total Gasto</h6>
      <p class="fs-2 fw-semibold text-light m-0" id="total-gasto">R$ 0</p>
    </div>
  </div>

  <!-- CARD 3: Quantidade de Transações -->

  <div class="card bg-primary border-0 shadow-sm flex-fill">
    <div class="card-body p-3 p-md-4">
      <h6 class="card-title text-light text-uppercase fw-bold mb-2">Quantidade de Transações</h6>
      <p class="fs-2 fw-semibold text-light m-0" id="quantidade-transacoes">0</p>
    </div>
  </div>

</div>`

renderizarHtml(CARD_HTML, 'CARD_RESUMO');

// Tenta bater na API real primeiro
carregarTransacoes(CONFIG_API.carteira.alunoId)
  .then(({totalDebito, totalRecarga, totalTransacoes}) => {
    // Sucesso: Backend respondeu
    atualizarTela(totalDebito, totalRecarga, totalTransacoes);
  })
  .catch((erro) => {
    // Falha: Backend offline ou erro de rede
    console.warn("API indisponível. Usando dados do mock local para renderizar a tela.");
    
    const mock = window.mockData || { transacoes: [], custo: 0, recarga: 0 };
    const totalDebito = mock.custo || 0;
    const totalRecarga = mock.recarga || 0;
    const totalTransacoes = mock.transacoes ? mock.transacoes.length : 0;
    
    atualizarTela(totalDebito, totalRecarga, totalTransacoes);
  });

// Função auxiliar para evitar repetição de código
function atualizarTela(debitoBruto, recargaBruta, qtdTransacoes) {
  const debitoFormatado = debitoBruto.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const recargaFormatada = recargaBruta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  document.getElementById("total-recarregado").innerText = recargaFormatada;
  document.getElementById("total-gasto").innerText = debitoFormatado;
  document.getElementById("quantidade-transacoes").innerText = qtdTransacoes;
}