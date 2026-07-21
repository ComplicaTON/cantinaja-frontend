import {
  criarFormularioRecarga,
  SELETORES_FORMULARIO_RECARGA,
} from "./components/formulario-recarga.js";
import { realizarRecarga, ErroRecarga } from "./services/recarga-service.js";
import { validarValorRecarga } from "./validators/recarga-validator.js";

const SELETOR_CONTAINER_RECARGA = "#recarregar-container";
const EVENTO_RECARGA_REALIZADA = "carteira:recarga-realizada";

const FORMATADOR_BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const CONFIGURACOES_TOAST = Object.freeze({
  sucesso: {
    classe: "cj-recarregar__toast--sucesso",
    icone: "fa-circle-check",
    role: "status",
    ariaLive: "polite",
  },
  erro: {
    classe: "cj-recarregar__toast--erro",
    icone: "fa-circle-exclamation",
    role: "alert",
    ariaLive: "assertive",
  },
});

function selecionarElemento(raiz, seletor, TipoElemento, nome) {
  const elemento = raiz.querySelector(seletor);

  if (!(elemento instanceof TipoElemento)) {
    throw new Error(
      `[Carteira/Recarga] Elemento "${nome}" não encontrado no componente.`,
    );
  }

  return elemento;
}

function obterElementosFormulario(componente) {
  const seletores = SELETORES_FORMULARIO_RECARGA;

  return {
    formulario: selecionarElemento(
      componente,
      seletores.formulario,
      HTMLFormElement,
      "formulário",
    ),
    valor: selecionarElemento(
      componente,
      seletores.valor,
      HTMLInputElement,
      "valor",
    ),
    botao: selecionarElemento(
      componente,
      seletores.botao,
      HTMLButtonElement,
      "botão",
    ),
    textoBotao: selecionarElemento(
      componente,
      seletores.textoBotao,
      HTMLElement,
      "texto do botão",
    ),
    carregamento: selecionarElemento(
      componente,
      seletores.carregamento,
      HTMLElement,
      "indicador de carregamento",
    ),
    icone: selecionarElemento(
      componente,
      seletores.icone,
      HTMLElement,
      "ícone do botão",
    ),
    feedback: selecionarElemento(
      componente,
      seletores.feedback,
      HTMLElement,
      "feedback do campo",
    ),
    status: selecionarElemento(
      componente,
      seletores.status,
      HTMLElement,
      "status acessível",
    ),
    toast: selecionarElemento(
      componente,
      seletores.toast,
      HTMLElement,
      "toast",
    ),
    mensagemToast: selecionarElemento(
      componente,
      seletores.mensagemToast,
      HTMLElement,
      "mensagem do toast",
    ),
    iconeToast: selecionarElemento(
      componente,
      seletores.iconeToast,
      HTMLElement,
      "ícone do toast",
    ),
  };
}

function limparErroDoCampo({ valor, feedback }) {
  valor.classList.remove("is-invalid");
  valor.setAttribute("aria-invalid", "false");
  feedback.textContent = "";
}

function exibirErroNoCampo({ valor, feedback }, mensagem) {
  valor.classList.add("is-invalid");
  valor.setAttribute("aria-invalid", "true");
  feedback.textContent = mensagem;
  valor.focus();
}

function definirProcessamento(elementos, processando) {
  const { formulario, botao, textoBotao, carregamento, icone, status } =
    elementos;

  formulario.setAttribute("aria-busy", String(processando));
  botao.setAttribute("aria-busy", String(processando));
  botao.disabled = processando;

  carregamento.classList.toggle("d-none", !processando);
  icone.classList.toggle("d-none", processando);

  textoBotao.textContent = processando ? "Processando..." : "Recarregar";
  status.textContent = processando
    ? "Solicitação de recarga em processamento."
    : "";
}

function criarInstanciaToast(elementoToast) {
  const ToastBootstrap = globalThis.bootstrap?.Toast;

  if (typeof ToastBootstrap !== "function") {
    throw new Error(
      "[Carteira/Recarga] Componente Toast do Bootstrap indisponível.",
    );
  }

  return new ToastBootstrap(elementoToast);
}

function exibirToast(elementos, instanciaToast, tipo, mensagem) {
  const configuracao = CONFIGURACOES_TOAST[tipo];
  const { toast, mensagemToast, iconeToast } = elementos;

  toast.classList.remove(
    CONFIGURACOES_TOAST.sucesso.classe,
    CONFIGURACOES_TOAST.erro.classe,
  );
  toast.classList.add(configuracao.classe);

  toast.setAttribute("role", configuracao.role);
  toast.setAttribute("aria-live", configuracao.ariaLive);

  iconeToast.classList.remove(
    CONFIGURACOES_TOAST.sucesso.icone,
    CONFIGURACOES_TOAST.erro.icone,
  );
  iconeToast.classList.add(configuracao.icone);

  mensagemToast.textContent = mensagem;
  instanciaToast.show();
}

function obterMensagemDeErro(erro) {
  if (erro instanceof ErroRecarga) {
    return erro.message;
  }

  console.error(
    "[Carteira/Recarga] Erro inesperado ao processar a recarga.",
    erro,
  );

  return "Não foi possível concluir a recarga. Tente novamente.";
}

function emitirEventoRecargaRealizada(formulario, resposta) {
  formulario.dispatchEvent(
    new CustomEvent(EVENTO_RECARGA_REALIZADA, {
      bubbles: true,
      detail: resposta,
    }),
  );
}

function configurarFormulario(elementos) {
  const { formulario, valor, toast } = elementos;
  const instanciaToast = criarInstanciaToast(toast);

  let envioEmAndamento = false;

  valor.addEventListener("input", () => {
    limparErroDoCampo(elementos);
  });

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (envioEmAndamento) {
      return;
    }

    limparErroDoCampo(elementos);

    const resultadoValidacao = validarValorRecarga(valor.value);

    if (!resultadoValidacao.valido) {
      exibirErroNoCampo(elementos, resultadoValidacao.mensagem);

      exibirToast(
        elementos,
        instanciaToast,
        "erro",
        resultadoValidacao.mensagem,
      );

      return;
    }

    envioEmAndamento = true;
    definirProcessamento(elementos, true);

    try {
      const resposta = await realizarRecarga(resultadoValidacao.valorEmReais);

      formulario.reset();
      limparErroDoCampo(elementos);

      exibirToast(
        elementos,
        instanciaToast,
        "sucesso",
        `Recarga de ${FORMATADOR_BRL.format(
          resultadoValidacao.valorEmReais,
        )} realizada com sucesso.`,
      );

      emitirEventoRecargaRealizada(formulario, resposta);
    } catch (erro) {
      exibirToast(elementos, instanciaToast, "erro", obterMensagemDeErro(erro));
    } finally {
      envioEmAndamento = false;
      definirProcessamento(elementos, false);
    }
  });
}

function montarFeatureRecarga() {
  const container = document.querySelector(SELETOR_CONTAINER_RECARGA);

  if (!container) {
    console.error(
      `[Carteira/Recarga] Container não encontrado: ${SELETOR_CONTAINER_RECARGA}`,
    );

    return;
  }

  const componente = criarFormularioRecarga();

  container.replaceChildren(componente);

  configurarFormulario(obterElementosFormulario(componente));
}

montarFeatureRecarga();
