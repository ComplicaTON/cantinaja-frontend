import { APIMock } from "../../../../../lib/config.js";

export async function carregarTransacoes(alunoId) {
  const resposta = await fetch(`${APIMock.carteira}/api/carteiras/${alunoId}/transacoes`);
  const transacoesJson = await resposta.json();

  let totalDebito = 0
  let totalRecarga = 0
  let totalTransacoes = 0

 transacoesJson.forEach(transacao => {
    if (transacao.tipo === "DEBITO") {
        totalDebito += transacao.valor
    }
    if (transacao.tipo === "RECARGA") {
        totalRecarga += transacao.valor
    }
    totalTransacoes += 1
 });

  const valoresTransacoes = [totalDebito, totalRecarga, totalTransacoes]
  return valoresTransacoes;
}