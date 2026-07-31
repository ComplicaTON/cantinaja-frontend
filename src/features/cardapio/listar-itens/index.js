import { CONFIG_API } from "../../../../lib/config.js";
import { botaoEditar } from "../editar-item/editar.js";

const url = `${CONFIG_API.cardapio.baseUrl}/api/items`;

async function buscarItens() {

    const filtroDeDisponiveis = document.getElementById('filtro-de-disponiveis').value;
    const URL_API = filtroDeDisponiveis === 'disponiveis' ? `${url}?disponivel=true` : url;
    console.log(URL_API)
    console.log(filtroDeDisponiveis);
    try {
        const response = await fetch(URL_API);

        if (!response.ok) {
            throw new Error(`Erro ao carregar produtos: ${response.status}`);
        }

        const produtos = await response.json();

        produtos.sort((a, b) => (b.badge === true) - (a.badge === true));

        itensDoCardapio.innerHTML = '';
        listaDeModais.innerHTML = '';

        renderizarInterface(produtos);

    } catch (erro) {
        console.error(erro);
    }

}

const itensDoCardapio = document.getElementById("itens-do-cardapio");
const headerDoCardapio = document.getElementById('header-do-cardapio');
const listaDeModais = document.getElementById('lista-de-modais');

function renderizarInterface(produtos) {

    if (!produtos || produtos.length === 0) {
        verificarListaVazia();
        return;
    }

    produtos.forEach(produto => {

        const colunaDoCard = document.createElement('li');
        colunaDoCard.classList.add('col');

        const itemDaLista = document.createElement("article");
        itemDaLista.classList.add("card", "mb-4", "g-3", 'shadow');

        const corpoDoCard = document.createElement('div');
        corpoDoCard.classList.add('card-body', 'card-body-listar-itens', 'd-flex', 'flex-column', 'flex-grow-1');
        corpoDoCard.setAttribute('id', `card-${produto.id}`);

        const headerDoCard = document.createElement('header');
        headerDoCard.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-3');

        const badgeDeDisponibilidade = document.createElement('span');
        if (produto.badge === true) {

            badgeDeDisponibilidade.classList.add('badge', 'badge-disponivel');
            badgeDeDisponibilidade.textContent = 'Disponível';

        } else {

            badgeDeDisponibilidade.classList.add('badge', 'badge-indisponivel');
            badgeDeDisponibilidade.textContent = 'Indisponível';
            corpoDoCard.classList.add('card-body-disabled')
        }

        const nomeDoPrato = document.createElement('h4');
        nomeDoPrato.classList.add('card-title', 'mb-0');
        nomeDoPrato.textContent = produto.titulo;
        nomeDoPrato.setAttribute('id', 'nome-do-prato');

        const cardFooter = document.createElement('footer');
        cardFooter.classList.add('d-flex', 'justfy-content-between', 'align-items-center', 'mt-3');

        const precoFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(produto.preco);

        const preco = document.createElement('p');
        preco.classList.add('card-text', 'mb-0', 'flex-grow-1');
        preco.textContent = precoFormatado;
        preco.setAttribute('id', 'preco');

        const botaoEditar = document.createElement('button');
        botaoEditar.classList.add('btn', 'btn-primary', 'card_secondary_action', 'mb-0', 'ms-auto');
        botaoEditar.setAttribute('type', 'button');
        botaoEditar.textContent = 'Editar';

        const botaoDisponibilidade = document.createElement('button');
        botaoDisponibilidade.classList.add('btn', 'btn-primary', 'card_secondary_action', 'mb-0', 'ms-auto', 'me-1');
        botaoDisponibilidade.setAttribute('type', 'button');
        botaoDisponibilidade.textContent = 'Disponibilidade';

        
        cardFooter.appendChild(preco);
        cardFooter.appendChild(botaoEditar(produto));

        headerDoCard.appendChild(nomeDoPrato);
        headerDoCard.appendChild(badgeDeDisponibilidade);

        corpoDoCard.appendChild(headerDoCard);
        corpoDoCard.appendChild(cardFooter);

        itemDaLista.appendChild(corpoDoCard);
        colunaDoCard.appendChild(itemDaLista);
        itensDoCardapio.appendChild(colunaDoCard);
 

    });

    verificarListaVazia();

}


const avisoListaVazia = document.querySelector('.mensagem-lista-vazia');
console.log(avisoListaVazia);

function verificarListaVazia() {
    const listaDeItens = itensDoCardapio.querySelectorAll('li');
    if (listaDeItens.length === 0) {
        avisoListaVazia.style.display = 'block';
    } else {
        avisoListaVazia.style.display = 'none';
    }
}

document.getElementById('filtro-de-disponiveis').addEventListener('change', buscarItens);

document.addEventListener('DOMContentLoaded', () => {
    buscarItens();
})


