import { renderizarHtml } from "../../../../shared/utils.js";
import { carregarTransacoes } from "./service/api.js";

const CARD_HTML = 
`<div class="d-flex flex-column flex-md-row gap-3">

  <div class="card bg-primary border-0 shadow-sm flex-fill">
    <div class="card-body p-4">
      <h6 class="card-title text-dark text-uppercase fw-bold mb-2">Total Recarregado</h6>
      <p class="fs-2 fw-semibold text-dark m-0" id="total-recarregado">R$ 0</p>
    </div>
  </div>

  <div class="card bg-primary border-0 shadow-sm flex-fill">
    <div class="card-body p-4">
      <h6 class="card-title text-dark text-uppercase fw-bold mb-2">Total Gasto</h6>
      <p class="fs-2 fw-semibold text-dark m-0" id="total-gasto">R$ 0</p>
    </div>
  </div>

  <div class="card bg-primary border-0 shadow-sm flex-fill">
    <div class="card-body p-4">
      <h6 class="card-title text-dark text-uppercase fw-bold mb-2">Quantidade de Transações</h6>
      <p class="fs-2 fw-semibold text-dark m-0" id="quantidade-transacoes">0</p>
    </div>
  </div>

</div>`

renderizarHtml(CARD_HTML, 'CARD_RESUMO')

carregarTransacoes(1)
.then(([totalDebito, totalRecarga, totalTransacoes]) => {
  const debito = totalDebito.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  const recarga = totalRecarga.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  document.getElementById("total-recarregado").innerText = recarga;
  document.getElementById("total-gasto").innerText = debito;
  document.getElementById("quantidade-transacoes").innerText = totalTransacoes;
})