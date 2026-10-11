document.addEventListener("DOMContentLoaded", () => {
  // Dados simulados recebidos do backend/mock conforme nova estrutura sugerida
  // Exemplo esperado do mockData: { transacoes: [], custo: 100, recarga: 500 }
  const mockData = window.mockData || { transacoes: [], custo: 0, recarga: 0 };
  const transacoes = mockData.transacoes;

  // Elementos do DOM - Tela Principal
  const totalRecarregadoEl = document.getElementById("totalRecarregado");
  const totalGastoEl = document.getElementById("totalGasto");
  const saldoAtualEl = document.getElementById("saldoAtual");
  const tabelaCorpoEl = document.getElementById("tabelaCorpo");

  // Elementos do DOM - Modal
  const tabelaModalCorpoEl = document.getElementById("tabelaModalCorpo");
  const botoesFiltro = document.querySelectorAll("#filtrosExtrato button");

  // Função para sanitizar strings e prevenir ataques de XSS
  function escaparHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Função para formatar valores em R$
  function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  // Função para formatar a data
  function formatarData(dataISO) {
    if (!dataISO) return "";
    const [dataParte] = String(dataISO).split("T");
    const partes = dataParte.split("-");
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataISO;
  }

  // NOVA ABORDAGEM: Renderiza os cards utilizando os totais vindos do backend
  function carregarResumo() {
    // Evita o forEach e utiliza as propriedades "custo" e "recarga" enviadas pela API/Mock
    const totalRecarregado = mockData.recarga || 0;
    const totalGasto = mockData.custo || 0;
    
    // O saldo atual é a diferença (supondo que o saldo total da carteira seja isso)
    const saldoAtual = totalRecarregado - totalGasto;

    if (totalRecarregadoEl)
      totalRecarregadoEl.textContent = formatarMoeda(totalRecarregado);
    if (totalGastoEl) totalGastoEl.textContent = formatarMoeda(totalGasto);
    if (saldoAtualEl) saldoAtualEl.textContent = formatarMoeda(saldoAtual);
  }

  // Gera as linhas HTML para as tabelas com escaping de segurança
  function criarLinhasTabela(lista) {
    if (!lista || lista.length === 0) {
      return `<tr><td colspan="3" class="text-center text-muted">Nenhuma transação encontrada.</td></tr>`;
    }

    return lista
      .map((item) => {
        const isRecarga = item.tipo === "RECARGA";
        const badgeClasse = isRecarga ? "bg-success" : "bg-danger";
        const sinal = isRecarga ? "+" : "-";

        const tipoEscapado = escaparHtml(item.tipo);
        const dataFormatada = escaparHtml(formatarData(item.data));

        return `
          <tr>
            <td><span class="badge ${badgeClasse}">${tipoEscapado}</span></td>
            <td class="fw-semibold ${isRecarga ? "text-success" : "text-danger"}">
              ${sinal} ${formatarMoeda(item.valor)}
            </td>
            <td class="text-secondary">${dataFormatada}</td>
          </tr>
        `;
      })
      .join("");
  }

  // Renderiza a tabela inicial (ordenada por data e limitada às 5 mais recentes)
  function renderizarTabelaPrincipal() {
    if (!tabelaCorpoEl) return;
    const ultimasTransacoes = [...transacoes]
      .sort((a, b) => String(b.data).localeCompare(String(a.data)))
      .slice(0, 5);

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