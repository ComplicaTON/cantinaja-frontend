const feature = document.getElementById("feature-cadastrar-item");



feature.innerHTML = `
<div class="row justify-content-center">
    <div class="col-12 col-md-8 col-lg-6">
        <div class="text-center mb-4">
            <h1 class="display-6 cj-title">
                <i class="fa-solid fa-utensils cj-icon me-2"></i>
                Cadastro de Item
            </h1>
            <p class="lead cj-subtitle">
                Cadastre um novo produto para aparecer no cardápio.
            </p>
        </div>
        <div class="card cj-form-card">
            <div class="card-body p-4">
                <form id="form-cadastrar-item" novalidate>
                    <div class="mb-4">
                        <label
                            for="nome"
                            class="form-label"
                        >
                            <i class="fa-solid fa-tag cj-icon me-2"></i>
                            Nome do Item
                        </label>
                        <input
                            id="nome"
                            type="text"
                            class="form-control form-control-lg"
                            placeholder="Ex.: Coxinha de Frango"
                        >
                        <div class="invalid-feedback">
                            Informe o nome do item.
                        </div>
                    </div>
                    <div class="mb-4">
                        <label
                            for="preco"
                            class="form-label"
                        >
                            <i class="fa-solid fa-dollar-sign cj-icon me-2"></i>
                            Preço
                        </label>
                        <input
                            id="preco"
                            type="number"
                            class="form-control form-control-lg"
                            placeholder="0,00"
                            step="0.01"
                            min="0"
                        >
                        <div class="invalid-feedback">
                            Informe um preço válido.
                        </div>
                    </div>
                    <button
                        type="submit"
                        class="btn cj-btn w-100 btn-lg"
                    >
                        <i class="fa-solid fa-plus me-2"></i>
                        Cadastrar Item
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
`;

// task - 2 Seleção dos elementos da página


const formulario = document.getElementById("form-cadastrar-item");

const nome = document.getElementById("nome");

const preco = document.getElementById("preco");

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    let formularioValido = true;

    // ===== Validação Nome =====

    if (nome.value.trim() === "") {

        nome.classList.add("is-invalid");

        formularioValido = false;

    } else {

        nome.classList.remove("is-invalid");

    }

    // ===== Validação Preço =====

    if (preco.value.trim() === "" || Number(preco.value) <= 0) {

        preco.classList.add("is-invalid");

        formularioValido = false;

    } else {

        preco.classList.remove("is-invalid");

    }



});

// Remove o erro quando o usuário digita

nome.addEventListener("input", function () {

    if (nome.value.trim() !== "") {

        nome.classList.remove("is-invalid");

    }

});

preco.addEventListener("input", function () {

    if (preco.value.trim() !== "" && Number(preco.value) > 0) {

        preco.classList.remove("is-invalid");

    }

});
