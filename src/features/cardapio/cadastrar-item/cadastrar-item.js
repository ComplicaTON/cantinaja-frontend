import { renderizarHtml } from '../../../../shared/utils.js';
import { navbarHtml } from "../../../../shared/navbar.js";
import { CONFIG_API, USE_MOCKS } from "../../../../lib/config.js";


console.log("Modo Mock:", USE_MOCKS);
console.log("API Cardápio:", CONFIG_API.cardapio.baseUrl);

const html = `
<section class="card border-0 shadow-sm rounded-4 p-4 bg-white">

    <h2 class="h3 fw-bold text-dark mb-4">
        Cadastro de Item
    </h2>

    <div id="mensagem-feedback" class="d-none mb-3 alert" role="alert"></div>

    <form id="form-cadastrar-item" class="d-flex flex-column gap-3">

        <div>
            <label for="nome" class="form-label fw-medium text-dark">
                Nome
            </label>
            <input
                id="nome"
                type="text"
                class="form-control rounded-3 py-2"
                placeholder="Digite o nome do item"
            >
            <div class="invalid-feedback">
                Informe o nome do item.
            </div>
        </div>

        <div>
            <label for="preco" class="form-label fw-medium text-dark">
                Preço
            </label>
            <input
                id="preco"
                type="number"
                class="form-control rounded-3 py-2"
                placeholder="0,00"
                step="0.01"
                min="0"
            >
            <div class="invalid-feedback">
                Informe um preço válido.
            </div>
        </div>

        <!-- O btn-primary já puxa o hover e as cores novas do styles.css -->
        <button type="submit" class="btn btn-primary fw-semibold rounded-3 py-2 mt-2 w-100">
            <i class="fa-solid fa-plus me-2" aria-hidden="true"></i>
            Cadastrar Item
        </button>

    </form>

</section>
`;

renderizarHtml(navbarHtml, "navbar");

renderizarHtml(html, "feature-cadastrar-item");

// Helper interno para exibir mensagens de feedback usando o alert do Bootstrap
function exibirMensagem(tipo, texto) {
    const container = document.getElementById("mensagem-feedback");
    if (!container) return;

    container.className = `alert alert-${tipo} mb-3`;
    container.textContent = texto;
    container.classList.remove("d-none");
}

function inicializarFormulario() {
    const formulario = document.getElementById("form-cadastrar-item");
    const nome = document.getElementById("nome");
    const preco = document.getElementById("preco");

    if (!formulario) return;

    formulario.addEventListener("submit", async function (event) {
        event.preventDefault();
        let formularioValido = true;

        // Oculta mensagens anteriores ao tentar enviar
        const msgContainer = document.getElementById("mensagem-feedback");
        if (msgContainer) msgContainer.classList.add("d-none");

        // ===== Validação Local (Cortesia) =====
        if (nome.value.trim() === "") {
            nome.classList.add("is-invalid");
            formularioValido = false;
        } else {
            nome.classList.remove("is-invalid");
        }

        if (preco.value.trim() === "" || Number(preco.value) <= 0) {
            preco.classList.add("is-invalid");
            formularioValido = false;
        } else {
            preco.classList.remove("is-invalid");
        }

        if (!formularioValido) return;

        // ===== Envio para a API/Mockoon =====
        try {
            const resposta = await fetch(`${CONFIG_API.cardapio.baseUrl}/api/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nome.value.trim(),
                    preco: parseFloat(preco.value)
                })
            });

            const corpo = await resposta.json();

            // Tratamento das respostas por Status HTTP[cite: 2, 4]
            if (resposta.status === 201) {
                // Sucesso: exibe feedback positivo
                exibirMensagem("success", "Item cadastrado com sucesso!");

                // Dispara um evento global para que a lista do cardápio (FED-002) receba e adicione o card[cite: 2, 4]
                document.dispatchEvent(new CustomEvent("itemCadastrado", { detail: corpo }));

                // Limpa o formulário
                formulario.reset();

            } else if (resposta.status === 409) {
                // Erro de nome duplicado (ex: "Coxinha")[cite: 2, 4]
                exibirMensagem("danger", corpo.mensagem || "Erro: Este item já existe.");

            } else if (resposta.status === 400) {
                // Erro de validação do backend[cite: 2, 4]
                exibirMensagem("danger", corpo.mensagem || "Erro nos dados informados.");

            } else {
                exibirMensagem("danger", corpo.mensagem || "Erro ao processar requisição.");
            }

        } catch (erro) {
            console.error("Erro de conexão/requisição:", erro);
            exibirMensagem("danger", "Não foi possível conectar ao servidor.");
        }
    });

    // Remove classes de erro visual enquanto o usuário digita
    nome.addEventListener("input", () => {
        if (nome.value.trim() !== "") nome.classList.remove("is-invalid");
    });

    preco.addEventListener("input", () => {
        if (preco.value.trim() !== "" && Number(preco.value) > 0) {
            preco.classList.remove("is-invalid");
        }
    });
}

inicializarFormulario();