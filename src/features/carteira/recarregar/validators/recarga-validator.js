const VALOR_MINIMO_RECARGA_EM_CENTAVOS = 500;
const VALOR_MAXIMO_RECARGA_EM_CENTAVOS = 50000;

const PADRAO_VALOR_MONETARIO = /^(\d+)(?:[.,](\d{1,2}))?$/;

const formatadorBRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const CODIGOS_ERRO = Object.freeze({
  VALOR_OBRIGATORIO: "VALOR_OBRIGATORIO",
  FORMATO_INVALIDO: "FORMATO_INVALIDO",
  VALOR_ABAIXO_DO_MINIMO: "VALOR_ABAIXO_DO_MINIMO",
  VALOR_ACIMA_DO_MAXIMO: "VALOR_ACIMA_DO_MAXIMO",
});

const MENSAGENS_ERRO = Object.freeze({
  [CODIGOS_ERRO.VALOR_OBRIGATORIO]: "Informe o valor da recarga.",
  [CODIGOS_ERRO.FORMATO_INVALIDO]:
    "Informe um valor válido, usando no máximo duas casas decimais.",
  [CODIGOS_ERRO.VALOR_ABAIXO_DO_MINIMO]: `O valor da recarga deve ser de no mínimo ${formatadorBRL.format(VALOR_MINIMO_RECARGA_EM_CENTAVOS / 100)}.`,
  [CODIGOS_ERRO.VALOR_ACIMA_DO_MAXIMO]: `O valor da recarga deve ser de no máximo ${formatadorBRL.format(VALOR_MAXIMO_RECARGA_EM_CENTAVOS / 100)}.`,
});

function criarResultadoInvalido(codigo) {
  const mensagem = MENSAGENS_ERRO[codigo];

  if (!mensagem) {
    throw new Error(
      `[Carteira/Recarga] Código de validação não registrado: ${codigo}`,
    );
  }

  return {
    valido: false,
    codigo,
    mensagem,
  };
}

function converterParaCentavos(valor) {
  const correspondencia = PADRAO_VALOR_MONETARIO.exec(valor);

  if (!correspondencia) {
    return null;
  }

  const [, parteInteira, parteDecimal = ""] = correspondencia;
  const parteDecimalNormalizada = parteDecimal.padEnd(2, "0");

  return BigInt(parteInteira) * 100n + BigInt(parteDecimalNormalizada);
}

function obterErroDeFaixa(valorEmCentavos) {
  if (valorEmCentavos < VALOR_MINIMO_RECARGA_EM_CENTAVOS) {
    return CODIGOS_ERRO.VALOR_ABAIXO_DO_MINIMO;
  }

  if (valorEmCentavos > VALOR_MAXIMO_RECARGA_EM_CENTAVOS) {
    return CODIGOS_ERRO.VALOR_ACIMA_DO_MAXIMO;
  }

  return null;
}

/**
 * Valida e normaliza o valor informado para uma recarga.
 *
 * @param {string} valorInformado: Valor recebido do campo do formulário.
 * @returns {
 *    | { valido: true, valorEmReais: number }
 *    | { valido: false, codigo: string, mensagem: string }
 * }
 */
export function validarValorRecarga(valorInformado) {
  if (typeof valorInformado !== "string") {
    return criarResultadoInvalido(CODIGOS_ERRO.FORMATO_INVALIDO);
  }

  const valorNormalizado = valorInformado.trim();

  if (!valorNormalizado) {
    return criarResultadoInvalido(CODIGOS_ERRO.VALOR_OBRIGATORIO);
  }

  if (valorNormalizado.length > 10) {
    return criarResultadoInvalido(CODIGOS_ERRO.FORMATO_INVALIDO);
  }

  const valorEmCentavos = converterParaCentavos(valorNormalizado);

  if (valorEmCentavos === null) {
    return criarResultadoInvalido(CODIGOS_ERRO.FORMATO_INVALIDO);
  }

  const erroDeFaixa = obterErroDeFaixa(valorEmCentavos);

  if (erroDeFaixa) {
    return criarResultadoInvalido(erroDeFaixa);
  }

  return {
    valido: true,
    valorEmReais: Number(valorEmCentavos) / 100,
  };
}
