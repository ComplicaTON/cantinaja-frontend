const SELETORES = Object.freeze({
  formulario: "[data-recarga-formulario]",
  valor: "[data-recarga-valor]",
  botao: "[data-recarga-botao]",
  textoBotao: "[data-recarga-texto-botao]",
  carregamento: "[data-recarga-carregamento]",
  icone: "[data-recarga-icone]",
  status: "[data-recarga-status]",
  feedback: "[data-recarga-feedback]",
  toast: "[data-recarga-toast]",
  mensagemToast: "[data-recarga-toast-mensagem]",
  iconeToast: "[data-recarga-toast-icone]",
});

const MARCACAO_FORMULARIO = `
    <section
      class="cj-recarregar"
      aria-labelledby="titulo-recarregar"
      data-recarga-componente
    >
      <div class="card cj-recarregar__card shadow-sm border-0">
        <div class="card-body p-3 p-md-4">
          <h2 id="titulo-recarregar" class="h4 fw-semibold mb-3">
            Recarregar carteira
          </h2>

          <form
            aria-labelledby="titulo-recarregar"
            data-recarga-formulario
            novalidate
          >
            <label for="valor-recarga" class="form-label fw-medium">
              Valor da recarga em reais
            </label>

            <div class="row g-2">
              <div class="col-12 col-md-8">
                <div class="input-group">
                  <span class="input-group-text" aria-hidden="true"> R$ </span>

                  <input
                    id="valor-recarga"
                    name="valor"
                    class="form-control"
                    type="text"
                    inputmode="decimal"
                    autocomplete="transaction-amount"
                    placeholder="0,00"
                    required
                    aria-required="true"
                    aria-invalid="false"
                    aria-describedby="ajuda-valor-recarga feedback-valor-recarga"
                    aria-errormessage="feedback-valor-recarga"
                    data-recarga-valor
                  />
                </div>

                <p
                  id="feedback-valor-recarga"
                  class="visually-hidden"
                  data-recarga-feedback
                ></p>
              </div>

              <div class="col-12 col-md-4 d-grid align-self-start">
                <button
                  class="btn cj-recarregar__botao"
                  type="submit"
                  aria-busy="false"
                  data-recarga-botao
                >
                  <span
                    class="spinner-border spinner-border-sm d-none me-1"
                    aria-hidden="true"
                    data-recarga-carregamento
                  ></span>

                  <i
                    class="fa-solid fa-plus me-1"
                    aria-hidden="true"
                    data-recarga-icone
                  ></i>

                  <span data-recarga-texto-botao> Recarregar </span>
                </button>
              </div>
            </div>

            <p id="ajuda-valor-recarga" class="form-text mb-0 fw-medium">
              Informe um valor entre R$ 5,00 e R$ 500,00.
            </p>

            <div
              class="visually-hidden"
              role="status"
              aria-live="polite"
              aria-atomic="true"
              data-recarga-status
            ></div>
          </form>

          <div
            class="toast-container position-fixed top-0 end-0 p-3"
            aria-live="polite"
            aria-atomic="true"
          >
            <div
              class="toast cj-recarregar__toast border-0"
              role="status"
              aria-live="polite"
              aria-atomic="true"
              data-bs-autohide="true"
              data-bs-delay="3000"
              data-recarga-toast
            >
              <div class="d-flex align-items-center">
                <div class="toast-body d-flex align-items-center gap-2">
                  <i
                    class="fa-solid fa-circle-info"
                    aria-hidden="true"
                    data-recarga-toast-icone
                  ></i>

                  <span data-recarga-toast-mensagem></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

export const SELETORES_FORMULARIO_RECARGA = SELETORES;

export function criarFormularioRecarga() {
  const template = document.createElement("template");

  template.innerHTML = MARCACAO_FORMULARIO.trim();

  const componente = template.content.firstElementChild;

  if (!componente) {
    throw new Error("Não foi possível criar o componente de recarga.");
  }

  return componente;
}
