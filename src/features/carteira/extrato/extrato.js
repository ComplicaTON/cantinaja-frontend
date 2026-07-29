function formatarMoeda(valor) {
  return "R$ " + Number(valor).toFixed(2).replace('.', ',');
}

function formatarData(dataISO) {
  const data = new Date(dataISO);
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function calcularTotais() {
  let somaEntradas = 0;
  let somaSaidas = 0;

  for (let i = 0; i < mockExtrato.length; i++) {
    let item = mockExtrato[i];

    if (item.tipo === "RECARGA") {
      somaEntradas += item.valor;
    } else if (item.tipo === "DEBITO") {
      somaSaidas += item.valor;
    }
  }

  const saldoAtual = somaEntradas - somaSaidas;

  document.getElementById("totalRecarregado").textContent = formatarMoeda(somaEntradas);
  document.getElementById("totalGasto").textContent = formatarMoeda(somaSaidas);
  
  // Atualiza o card de saldo disponível no momento
  const elSaldo = document.getElementById("saldoAtual");
  if (elSaldo) {
    elSaldo.textContent = formatarMoeda(saldoAtual);
  }
}

function mostrarNaTabela(listaDeTransacoes, idDaTabela) {
  const tabela = document.getElementById(idDaTabela);
  let htmlAcumulado = "";

  if (listaDeTransacoes.length === 0) {
    tabela.innerHTML = `<tr><td colspan="3" class="text-center text-muted">Nenhuma transação encontrada.</td></tr>`;
    return;
  }

  for (let i = 0; i < listaDeTransacoes.length; i++) {
    let item = listaDeTransacoes[i];
    
    let ehEntrada = item.tipo === "RECARGA";
    let classeCor = ehEntrada ? "text-success" : "text-danger";
    let sinal = ehEntrada ? "+" : "-";

    htmlAcumulado += `
      <tr>
        <td><span class="badge ${ehEntrada ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} fw-bold">${item.tipo}</span></td>
        <td class="${classeCor} fw-bold">${sinal} ${formatarMoeda(item.valor)}</td>
        <td class="text-secondary">${formatarData(item.data)}</td>
      </tr>
    `;
  }

  tabela.innerHTML = htmlAcumulado;
}

function mostrarUltimas5() {
  let ultimas5 = [];

  for (let i = mockExtrato.length - 1; i >= 0; i--) {
    ultimas5.push(mockExtrato[i]);

    if (ultimas5.length === 5) {
      break;
    }
  }

  mostrarNaTabela(ultimas5, "tabelaCorpo");
}

function filtrarModal(tipoDesejado) {
  if (tipoDesejado === "TODAS") {
    mostrarNaTabela(mockExtrato, "tabelaModalCorpo");
    return;
  }

  let listaFiltrada = [];

  for (let i = 0; i < mockExtrato.length; i++) {
    let item = mockExtrato[i];

    if (tipoDesejado === "RECARGA" && item.tipo === "RECARGA") {
      listaFiltrada.push(item);
    } else if (tipoDesejado === "DEBITO" && item.tipo === "DEBITO") {
      listaFiltrada.push(item);
    }
  }

  mostrarNaTabela(listaFiltrada, "tabelaModalCorpo");
}

document.addEventListener("DOMContentLoaded", function () {
  calcularTotais();
  mostrarUltimas5();
  mostrarNaTabela(mockExtrato, "tabelaModalCorpo");

  const containerFiltros = document.getElementById("filtrosExtrato");
  
  if (containerFiltros) {
    containerFiltros.addEventListener("click", function (event) {
      const botaoClicado = event.target.closest("button[data-filtro]");
      if (!botaoClicado) return;

      const botoes = containerFiltros.querySelectorAll("button");
      for (let i = 0; i < botoes.length; i++) {
        botoes[i].classList.remove("active");
      }
      botaoClicado.classList.add("active");

      const filtro = botaoClicado.getAttribute("data-filtro");
      filtrarModal(filtro);
    });
  }
});