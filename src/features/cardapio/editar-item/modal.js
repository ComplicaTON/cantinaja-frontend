import { CONFIG_API } from "../../../../lib/config.js";
import { listar } from "./list.js";

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

        
        const dadosAtualizados = {
            nome: nameImput.value,
            preco: priceImput.value
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
                    'content-Type': 'application/json'
                },
                body: JSON.stringify(dadosAtualizados)
            })

            if(!resposta.ok){
                throw new Error(`Erro ao atualizar:${resposta.status}`)
            }

            const resultado = await resposta.json();
            console.log("produto atualizado na API:", resultado);
            console.log(dadosAtualizados);

            modal.hide();

            alert("Produto atualizado com sucesso!");

            listar();

        } catch(erro){
            console.error("Falha ao salvar produto:",erro);
            alert("Erro ao salvar as alterações. Tente novamente.");
        } finally{
            btnSalvar.disabled = false;
            spinner.classList.add("d-none");
        }

    })







