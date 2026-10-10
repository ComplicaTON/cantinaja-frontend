import { CONFIG_API } from "../../../../../lib/config.js";

const TEMPO_LIMITE_REQUISICAO_MS = 10_000;

const CODIGOS_ERRO_SERVICO = Object.freeze({
  VALOR_INVALIDO: "VALOR_INVALIDO",
  API_INDISPONIVEL: "API_INDISPONIVEL",
  TEMPO_LIMITE_EXCEDIDO: "TEMPO_LIMITE_EXCEDIDO",
  RESPOSTA_INVALIDA: "RESPOSTA_INVALIDA",
  RESPOSTA_INESPERADA: "RESPOSTA_INESPERADA",
});

export class ErroRecarga extends Error {
  constructor(mensagem, { codigo, status = null, causa } = {}) {
    super(mensagem, causa ? { cause: causa } : undefined);

    this.name = "ErroRecarga";
    this.codigo = codigo;
    this.status = status;
  }
}

function garantirValorValido(valorEmReais) {
  if (typeof valorEmReais !== "number" || !Number.isFinite(valorEmReais)) {
    throw new ErroRecarga("O valor informado para a recarga é inválido.", {
      codigo: CODIGOS_ERRO_SERVICO.VALOR_INVALIDO,
    });
  }
}

function montarUrlRecarga() {
  const { baseUrl, alunoId } = CONFIG_API.carteira;

  return `${baseUrl}/api/carteiras/${encodeURIComponent(alunoId)}/recargas`;
}

function montarOpcoesRequisicao(valorEmReais) {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      valor: valorEmReais,
    }),
    signal: AbortSignal.timeout(TEMPO_LIMITE_REQUISICAO_MS),
  };
}

async function lerCorpoJson(resposta) {
  const texto = await resposta.text();

  if (!texto) {
    return null;
  }

  try {
    return JSON.parse(texto);
  } catch {
    return null;
  }
}

function respostaTemFormatoValido(corpo) {
  return (
    typeof corpo === "object" &&
    corpo !== null &&
    Number.isInteger(corpo.alunoId) &&
    typeof corpo.saldo === "number" &&
    Number.isFinite(corpo.saldo) &&
    typeof corpo.saldoBaixo === "boolean"
  );
}

function obterErroDeRespostaHttp(resposta, corpo) {
  if (!resposta.ok) {
    return new ErroRecarga(
      corpo?.mensagem ??
        "Não foi possível realizar a recarga. Tente novamente.",
      {
        codigo: corpo?.erro ?? CODIGOS_ERRO_SERVICO.RESPOSTA_INESPERADA,
        status: resposta.status,
      },
    );
  }

  if (resposta.status !== 201 || !respostaTemFormatoValido(corpo)) {
    return new ErroRecarga(
      "A API retornou uma resposta inválida para a recarga.",
      {
        codigo: CODIGOS_ERRO_SERVICO.RESPOSTA_INVALIDA,
        status: resposta.status,
      },
    );
  }

  return null;
}

function mapearExcecaoParaErroRecarga(erro) {
  if (erro instanceof ErroRecarga) {
    return erro;
  }

  const requisicaoExpirou =
    erro instanceof DOMException &&
    (erro.name === "TimeoutError" || erro.name === "AbortError");

  if (requisicaoExpirou) {
    return new ErroRecarga(
      "A solicitação demorou mais que o esperado. Tente novamente.",
      {
        codigo: CODIGOS_ERRO_SERVICO.TEMPO_LIMITE_EXCEDIDO,
        causa: erro,
      },
    );
  }

  return new ErroRecarga(
    "Não foi possível conectar ao serviço de recarga. Verifique sua conexão e tente novamente.",
    {
      codigo: CODIGOS_ERRO_SERVICO.API_INDISPONIVEL,
      causa: erro,
    },
  );
}

/**
 * Envia uma solicitação de recarga para a API da carteira.
 *
 * @param {number} valorEmReais Valor validado da recarga, em reais.
 * @returns {Promise<{
 *   alunoId: number,
 *   saldo: number,
 *   saldoBaixo: boolean
 * }>}
 * @throws {ErroRecarga}
 */
export async function realizarRecarga(valorEmReais) {
  garantirValorValido(valorEmReais);

  try {
    const resposta = await fetch(
      montarUrlRecarga(),
      montarOpcoesRequisicao(valorEmReais),
    );

    const corpo = await lerCorpoJson(resposta);
    const erroDeResposta = obterErroDeRespostaHttp(resposta, corpo);

    if (erroDeResposta) {
      throw erroDeResposta;
    }

    return corpo;
  } catch (erro) {
    throw mapearExcecaoParaErroRecarga(erro);
  }
}
