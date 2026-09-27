import { CONFIG_API } from "../../../../../lib/config.js";

export async function carregarSaldo(alunoId) {
  const { baseUrl } = CONFIG_API.carteira;
  const resposta = await fetch(`${baseUrl}/api/carteiras/${alunoId}`);
  const saldoJson = await resposta.json();

  return saldoJson;
}