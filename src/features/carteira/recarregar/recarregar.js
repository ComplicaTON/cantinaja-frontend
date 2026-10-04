import { criarFormularioRecarga } from "./components/formulario-recarga.js";

const SELETOR_CONTAINER_RECARGA = "#recarregar-container";

function montarFeatureRecarga() {
  const container = document.querySelector(SELETOR_CONTAINER_RECARGA);

  if (!container) {
    console.error(
      `[Carteira/Recarga] Container para montagem não encontrado: ${SELETOR_CONTAINER_RECARGA}`,
    );

    return;
  }

  container.replaceChildren(criarFormularioRecarga());
}

montarFeatureRecarga();
