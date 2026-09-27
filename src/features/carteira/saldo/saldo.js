import { CONFIG_API } from "/lib/config.js";
import { renderizarHtml } from "../../../../shared/utils.js";
import { carregarSaldo } from "./service/api.js";

const CARD_HTML = 
`<div class="d-flex flex-column flex-lg-row gap-3">

  <!-- CARD 1: Total Saldo -->

  <div class="card bg-primary border-0 shadow-sm flex-fill">
    <div class="card-body p-3 p-md-4">
      <h6 class="card-title text-light text-uppercase fw-bold mb-2">Saldo</h6>
      <p class="fs-2 fw-semibold text-light m-0" id="total-saldo">R$ 0</p>
    </div>
  </div>

</div>`

renderizarHtml(CARD_HTML, 'CARD_SALDO')

carregarSaldo(CONFIG_API.carteira.alunoId)
.then((saldoJson) => {
  // Conversão de valores para reais
  const saldo = saldoJson.saldo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  const saldoId = document.getElementById("total-saldo");

  // Renderização dos valores na tela
  saldoId.innerText = saldo;

  if (saldoJson.saldoBaixo === true) {
    // Mudar a cor do saldo
    saldoId.classList.remove("text-light")
    saldoId.classList.add("text-secondary")

    // Renderizar badge de alerta
    const badge = document.createElement("span");
    badge.classList.add("badge", "bg-secondary");
    badge.textContent = "SALDO BAIXO";
    saldoId.appendChild(badge);
  }
})
.catch((erro) => console.error("Falha ao carregar o saldo:", erro));