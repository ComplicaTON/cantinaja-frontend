const VALOR_MINIMO_EM_CENTAVOS = 500;
const VALOR_MAXIMO_EM_CENTAVOS = 50000;

const PADRAO_VALOR_MONETARIO = /^(\d+)(?:[.,](\d{1,2}))?$/;

const MENSAGENS_ERRO = Object.freeze({
  VALOR_OBRIGATORIO: "informe o valor da recarga.",
  FORMATO_INVALIDO:
    "Informa um valor válido, usando no máximo duas casas decimais.",
  VALOR_ABAIXO_DO_MINIMO: "O valor mínimo para recarga é R$ 5,00.",
  VALOR_ACIMA_DO_MAXIMO: "O valor máximo para recarga é R$ 500,00.",
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

  const [, parteInteita, parteDecimal = ""] = correspondencia;
  const centavos = parteDecimal.padEnd(2, "0");

  return Number(parteInteita) * 100 + Number(centavos);
}

function obterErroDeFaixa(valorEmCentavos) {
  if (!Number.isSafeInteger(valorEmCentavos)) {
    return "VALOR_ACIMA_DO_MAXIMO";
  }

  if (valorEmCentavos < VALOR_MINIMO_EM_CENTAVOS) {
    return "VALOR_ABAIXO_DO_MINIMO";
  }

  if (valorEmCentavos > VALOR_MAXIMO_EM_CENTAVOS) {
    return "VALOR_ACIMA_DO_MAXIMO";
  }

  return null;
}

export function validarValorRecarga(valorInformado) {
  if (typeof valorInformado !== "string") {
    return criarResultadoInvalido("FORMATO_INVALIDO");
  }

  const valor = valorInformado.trim();

  if (!valor) {
    return criarResultadoInvalido("VALOR_OBRIGATORIO");
  }

  const valorEmCentavos = converterParaCentavos(valor);

  if (valorEmCentavos === null) {
    return criarResultadoInvalido("FORMATO_INVALIDO");
  }

  const erroDeFaixa = obterErroDeFaixa(valorEmCentavos);

  if (erroDeFaixa) {
    return criarResultadoInvalido(erroDeFaixa);
  }

  return {
    valido: true,
    valorEmCentavos,
  };
}
