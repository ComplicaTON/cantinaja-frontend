import { CONFIG_API } from "../../../../lib/config.js";

const modalElement = document.getElementById('modalEditar');
const modal = new bootstrap.Modal(modalElement);
const form = document.getElementById("formEditarProduto");
const nameImput = document.getElementById("inputProduto");
const priceImput = document.getElementById("inputPreco");

let currentItem = null;

priceImput.addEventListener('input', (e) => {
let value = e.target.value.replace(/\D/g, '');
value = (value / 100).toFixed(2) + '';    
value = value.replace(".", ",");
value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
e.target.value = value;
});

export function abrirModal (produto){

    currentItem = produto;
    nameImput.value = produto.nome;

    priceImput.value = Number(produto.preco).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
    })

    modal.show();
}

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if(!currentItem) return;

        const precoLimpo = priceImput.value
        .replace(/\./g, '')
        .replace(',', '.');
        
        const dadosAtualizados = {
            nome: nameImput.value,
            preco: parseFloat(precoLimpo) || 0
        }

        const btnSalvar = document.getElementById("btnSalvar");
        const spinner = btnSalvar.querySelector('.spinner-border');

        btnSalvar.disabled = true;
        spinner.classList.remove('d-none');

        try {
            const url = `${CONFIG_API.cardapio.baseUrl}/api/items/${currentItem.id}`;

            const resposta = await fetch(url,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosAtualizados)
            })

            if (resposta.status === 400) {
                const erroDados = await resposta.json().catch(() => null);
                alert(`Atenção (400): ${erroDados?.message || "Dados inválidos."}`);
                return;
            }  

            if(!resposta.ok){
                throw new Error(`Erro ao atualizar:${resposta.status}`);
            }

            const respostaApi = await resposta.json();
            const produtoAtualizado = Array.isArray(respostaApi) ? respostaApi[0] : respostaApi;

            const cardExistente = document.getElementById(`card-${produtoAtualizado.id}`)

            if(cardExistente) {
                const elementoNome = cardExistente.querySelector("#nome-do-prato")
                if (elementoNome) elementoNome.textContent = produtoAtualizado.nome

                const elementoPreco = cardExistente.querySelector("#preco")
                if (elementoPreco) {
                    elementoPreco.textContent = `R$ ${Number(produtoAtualizado.preco).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                    })}`;

                }
            }

            modal.hide();

            alert("Produto atualizado com sucesso!");

        } catch(erro){
            console.error("Falha ao salvar produto:",erro);
            alert("Erro ao salvar as alterações. Tente novamente.");
        } finally{
            btnSalvar.disabled = false;
            spinner.classList.add("d-none");
        }

    })







