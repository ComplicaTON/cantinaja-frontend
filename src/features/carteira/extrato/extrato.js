document.addEventListener("DOMContentLoaded", () => {
  // Dados simulados da carteira obtidos do mock global
  const transacoes = window.mockData ? window.mockData.transacoes : [];

  // Elementos do DOM - Tela Principal
  const totalRecarregadoEl = document.getElementById("totalRecarregado");
  const totalGastoEl = document.getElementById("totalGasto");
  const saldoAtualEl = document.getElementById("saldoAtual");
  const tabelaCorpoEl = document.getElementById("tabelaCorpo");

  // Elementos do DOM - Modal
  const tabelaModalCorpoEl = document.getElementById("tabelaModalCorpo");
  const botoesFiltro = document.querySelectorAll("#filtrosExtrato button");

  // Função para formatar valores em R$
  function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // Função para formatar a data (YYYY-MM-DD para DD/MM/YYYY)
  function formatarData(dataISO) {
    if (!dataISO) return "";
    const partes = dataISO.split("-");
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataISO;
  }

  // Calcula os totais e renderiza os cards
  function carregarResumo() {
    let totalRecarregado = 0;
    let totalGasto = 0;

    transacoes.forEach((item) => {
      if (item.tipo === "RECARGA") {
        totalRecarregado += item.valor;
      } else if (item.tipo === "DEBITO") {
        totalGasto += item.valor;
      }
    });

    const saldoAtual = totalRecarregado - totalGasto;

    if (totalRecarregadoEl)
      totalRecarregadoEl.textContent = formatarMoeda(totalRecarregado);
    if (totalGastoEl) totalGastoEl.textContent = formatarMoeda(totalGasto);
    if (saldoAtualEl) saldoAtualEl.textContent = formatarMoeda(saldoAtual);
  }

  // Gera as linhas HTML para as tabelas
  function criarLinhasTabela(lista) {
    if (!lista || lista.length === 0) {
      return `<tr><td colspan="3" class="text-center text-muted">Nenhuma transação encontrada.</td></tr>`;
    }

    return lista
      .map((item) => {
        const isRecarga = item.tipo === "RECARGA";
        const badgeClasse = isRecarga ? "bg-success" : "bg-danger";
        const sinal = isRecarga ? "+" : "-";

        return `
          <tr>
            <td><span class="badge ${badgeClasse}">${item.tipo}</span></td>
            <td class="fw-semibold ${isRecarga ? "text-success" : "text-danger"}">
              ${sinal} ${formatarMoeda(item.valor)}
            </td>
            <td class="text-secondary">${formatarData(item.data)}</td>
          </tr>
        `;
      })
      .join("");
  }

  // Renderiza a tabela inicial (limitada às 5 mais recentes)
  function renderizarTabelaPrincipal() {
    if (!tabelaCorpoEl) return;
    const ultimasTransacoes = transacoes.slice(0, 5);
    tabelaCorpoEl.innerHTML = criarLinhasTabela(ultimasTransacoes);
  }

  // Renderiza a tabela do modal com filtro aplicado
  function renderizarTabelaModal(tipoFiltro = "TODAS") {
    if (!tabelaModalCorpoEl) return;

    let filtradas = transacoes;
    if (tipoFiltro !== "TODAS") {
      filtradas = transacoes.filter((t) => t.tipo === tipoFiltro);
    }

    tabelaModalCorpoEl.innerHTML = criarLinhasTabela(filtradas);
  }

  // Configuração dos eventos dos botões de filtro no Modal
  botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", (e) => {
      botoesFiltro.forEach((b) => b.classList.remove("active"));
      e.target.classList.add("active");

      const filtro = e.target.getAttribute("data-filtro");
      renderizarTabelaModal(filtro);
    });
  });

  // Inicialização
  carregarResumo();
  renderizarTabelaPrincipal();
  renderizarTabelaModal("TODAS");
});