const SELETORES = Object.freeze({
  formulario: "[data-recarga-formulario]",
  valor: "[data-recarga-valor]",
  botao: "[data-recarga-botao]",
  textoBotao: "[data-recarga-texto-botao]",
  carregamento: "[data-recarga-carregamento]",
  feedback: "[data-recarga-feedback]",
});

const MARCACAO_FORMULARIO = `
    <section
      class="cj-recarregar"
      aria-labelledby="titulo-recarregar"
      data-recarga-componente
    >
      <div class="card cj-recarregar__card shadow-sm">
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
                  class="invalid-feedback mb-0"
                  aria-live="polite"
                  aria-atomic="true"
                  data-recarga-feedback
                ></p>
              </div>

              <div class="col-12 col-md-4 d-grid">
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
