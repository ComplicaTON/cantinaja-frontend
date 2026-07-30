import { CONFIG_API } from "../../../../lib/config.js";

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
        corpoDoCard.classList.add('card-body', 'd-flex', 'flex-column', 'flex-grow-1');

        const headerDoCard = document.createElement('header');
        headerDoCard.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2');

        const badgeDeDisponibilidade = document.createElement('span');
        if (produto.badge === true) {

            badgeDeDisponibilidade.classList.add('badge', 'badge-disponivel');
            badgeDeDisponibilidade.textContent = 'Disponível';

        } else {

            badgeDeDisponibilidade.classList.add('badge', 'badge-indisponivel');
            badgeDeDisponibilidade.textContent = 'Indisponível';
            corpoDoCard.classList.add('card-body-disabled')
        }

        const cardHover = document.createElement('a');
        cardHover.classList.add('card-link');
        cardHover.setAttribute('href', '#');
        cardHover.setAttribute('role', 'button');
        cardHover.setAttribute('data-bs-toggle', 'modal');
        cardHover.setAttribute('data-bs-target', `#Modal-${produto.id}`);

        const nomeDoPrato = document.createElement('h4');
        nomeDoPrato.classList.add('card-title', 'mb-0');
        nomeDoPrato.textContent = produto.titulo;

        const descricaoDoPrato = document.createElement('p');
        descricaoDoPrato.classList.add('card-text', 'text-truncate');
        descricaoDoPrato.textContent = produto.descricao;

        const cardFooter = document.createElement('footer');
        cardFooter.classList.add('mt-auto');

        const precoFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(produto.preco);

        const preco = document.createElement('p');
        preco.classList.add('card-text', 'mb-0');
        preco.textContent = precoFormatado;

        const modal = document.createElement('li');
        modal.classList.add('modal', 'fade');
        modal.setAttribute('id', `Modal-${produto.id}`);
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-hidden', 'true');

        const tipoDeModal = document.createElement('article');
        tipoDeModal.classList.add('modal-dialog', 'modal-dialog-centered', 'modal-fullscreen-lg-down');

        const conteudoDoModal = document.createElement('div');
        conteudoDoModal.classList.add('modal-content');

        const modalHeader = document.createElement('header');
        modalHeader.classList.add('modal-header');

        const tituloModal = document.createElement('h4');
        tituloModal.classList.add('modal-title', 'fs-5');
        tituloModal.textContent = produto.titulo;

        const botaoDeFechar = document.createElement('button');
        botaoDeFechar.classList.add('btn-close');
        botaoDeFechar.setAttribute('type', 'button');
        botaoDeFechar.setAttribute('data-bs-dismiss', 'modal');
        botaoDeFechar.setAttribute('aria-label', 'Close');

        const corpoDoModal = document.createElement('div');
        corpoDoModal.classList.add('modal-body');

        const descricaoModal = document.createElement('p');
        descricaoModal.textContent = produto.descricao;

        const modalFooter = document.createElement('footer');
        modalFooter.classList.add('modal-footer', 'me-auto');

        const precoNoModal = document.createElement('p');
        precoNoModal.textContent = precoFormatado;

        cardFooter.appendChild(preco);

        if (produto.badge === true) {
            cardHover.appendChild(nomeDoPrato);
            headerDoCard.appendChild(cardHover);

        } else {
            headerDoCard.appendChild(nomeDoPrato);
        }

        headerDoCard.appendChild(badgeDeDisponibilidade);

        corpoDoCard.appendChild(headerDoCard);
        corpoDoCard.appendChild(descricaoDoPrato);
        corpoDoCard.appendChild(cardFooter);

        itemDaLista.appendChild(corpoDoCard);
        colunaDoCard.appendChild(itemDaLista);
        itensDoCardapio.appendChild(colunaDoCard);

        modalFooter.appendChild(precoNoModal);
        corpoDoModal.appendChild(descricaoModal);
        modalHeader.appendChild(tituloModal);
        modalHeader.appendChild(botaoDeFechar);

        conteudoDoModal.appendChild(modalHeader);
        conteudoDoModal.appendChild(corpoDoModal);
        conteudoDoModal.appendChild(modalFooter);

        tipoDeModal.appendChild(conteudoDoModal);
        modal.appendChild(tipoDeModal);
        listaDeModais.appendChild(modal);

        

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


