import { CONFIG_API } from "../../../../../lib/config.js";

export async function carregarTransacoes(alunoId) {
  const { baseUrl } = CONFIG_API.carteira;
  const resposta = await fetch(`${baseUrl}/api/carteiras/${alunoId}/transacoes`);
  const transacoesJson = await resposta.json();

  let totalDebito = 0
  let totalRecarga = 0
  let totalTransacoes = 0

 transacoesJson.forEach(transacao => {
    // Contagem dos valores de cada transação
    if (transacao.tipo === "DEBITO") {
        totalDebito += transacao.valor
    }
    if (transacao.tipo === "RECARGA") {
        totalRecarga += transacao.valor
    }
    totalTransacoes += 1
 });

  return { totalDebito, totalRecarga, totalTransacoes };
}