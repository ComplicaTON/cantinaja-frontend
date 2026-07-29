const cardsDados = [
    { id: 1, titulo: "Card Alpha", descricao: "Conteúdo detalhado do primeiro card.", preco: "R$ 10,00", badge: 'Disponível' },
    { id: 2, titulo: "Card Beta", descricao: "Informações importantes do segundo card.", preco: "R$ 20,00", badge: 'Indisponível' },
    { id: 3, titulo: "Card Gamma", descricao: "Dados e métricas do terceiro card.", preco: "R$ 30,00", badge: 'Disponível' },
    { id: 4, titulo: "Card Delta", descricao: "Descrição completa do quarto card.", preco: "R$ 40,00", badge: 'Disponível' },
    { id: 5, titulo: "Card Epsilon", descricao: "Resumo com informações relevantes do quinto card.", preco: "R$ 50,00", badge: 'Disponível' },
    { id: 6, titulo: "Card Zeta", descricao: "Conteúdo exclusivo do sexto card.", preco: "R$ 60,00", badge: 'Indisponível' },
    { id: 7, titulo: "Card Eta", descricao: "Detalhes adicionais sobre o sétimo card.", preco: "R$ 70,00", badge: 'Disponível' },
    { id: 8, titulo: "Card Theta", descricao: "Informações organizadas do oitavo card.", preco: "R$ 80,00", badge: 'Disponível' },
    { id: 9, titulo: "Card Iota", descricao: "Explicação detalhada do nono card.", preco: "R$ 90,00", badge: 'Disponível' },
    { id: 10, titulo: "Card Kappa", descricao: "Conteúdo completo do décimo card.", preco: "R$ 100,00", badge: 'Disponível' },
    { id: 11, titulo: "Card Lambda", descricao: "Descrição informativa do décimo primeiro card.", preco: "R$ 110,00", badge: 'Disponível' },
    { id: 12, titulo: "Card Mu", descricao: "Apresentação resumida do décimo segundo card.", preco: "R$ 120,00", badge: 'Disponível' },
    { id: 13, titulo: "Card Nu", descricao: "Conteúdo técnico do décimo terceiro card.", preco: "R$ 130,00", badge: 'Indisponível' },
    { id: 14, titulo: "Card Xi", descricao: "Dados relevantes do décimo quarto card.", preco: "R$ 140,00", badge: 'Indisponível' },
    { id: 15, titulo: "Card Omicron", descricao: "Informações detalhadas do décimo quinto card.", preco: "R$ 150,00", badge: 'Disponível' },
    { id: 16, titulo: "Card Pi", descricao: "Descrição objetiva do décimo sexto card.", preco: "R$ 160,00", badge: 'Disponível' },
    { id: 17, titulo: "Card Rho", descricao: "Conteúdo explicativo do décimo sétimo card.", preco: "R$ 170,00", badge: 'Disponível' },
    { id: 18, titulo: "Card Sigma", descricao: "Resumo completo do décimo oitavo card.", preco: "R$ 180,00", badge: 'Indisponível' },
    { id: 19, titulo: "Card Tau", descricao: "Detalhes importantes do décimo nono card.", preco: "R$ 190,00", badge: 'Disponível' },
    { id: 20, titulo: "Card Upsilon", descricao: "Conteúdo exclusivo do vigésimo card.", preco: "R$ 200,00", badge: 'Disponível' },
];

const itensDoCardapio = document.getElementById("itens-do-cardapio");
const headerDoCardapio = document.getElementById('header-do-cardapio');
const filtroDeDisponiveis = document.getElementById('filtro-de-disponiveis');
const listaDeModais = document.getElementById('lista-de-modais');

function renderizarInterface() {


    cardsDados.forEach(item => {



        const colunaDoCard = document.createElement('li');
        colunaDoCard.classList.add('col');

        const itemDaLista = document.createElement("article");
        itemDaLista.classList.add("card", "mb-4", "g-3", 'shadow-sm');

        const corpoDoCard = document.createElement('div');
        corpoDoCard.classList.add('card-body', 'd-flex', 'flex-column', 'flex-grow-1');

        const headerDoCard = document.createElement('header');
        headerDoCard.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2');

        const cardHover = document.createElement('a');
        cardHover.classList.add('card-link');
        // torna o card clicável e vincula ao modal correspondente (Bootstrap 5)
        cardHover.setAttribute('href', '#');
        cardHover.setAttribute('role', 'button');
        cardHover.setAttribute('data-bs-toggle', 'modal');
        cardHover.setAttribute('data-bs-target', `#Modal-${item.id}`);

        const nomeDoPrato = document.createElement('h4');
        nomeDoPrato.classList.add('card-title', 'mb-0');
        nomeDoPrato.textContent = item.titulo;

        const descricaoDoPrato = document.createElement('p');
        descricaoDoPrato.classList.add('card-text', 'text-truncate');
        descricaoDoPrato.textContent = item.descricao;

        const cardFooter = document.createElement('footer')
        cardFooter.classList.add('mt-auto');

        const preco = document.createElement('p');
        preco.classList.add('card-text', 'mb-0');
        preco.textContent = item.preco;

        const badgeDeDisponibilidade = document.createElement('span');
        badgeDeDisponibilidade.textContent = item.badge


        if (item.badge === 'Indisponível') {
            badgeDeDisponibilidade.classList.add('badge', 'badge-indisponivel');
        } else {
            badgeDeDisponibilidade.classList.add('badge', 'badge-disponivel');
        } 

        

        const modal = document.createElement('li');
        modal.classList.add('modal', 'fade');
        modal.setAttribute('id', `Modal-${item.id}`);
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
        tituloModal.textContent = item.titulo;

        const botaoDeFechar = document.createElement('button');
        botaoDeFechar.classList.add('btn-close');
        botaoDeFechar.setAttribute('type', 'button');
        botaoDeFechar.setAttribute('data-bs-dismiss', 'modal');
        botaoDeFechar.setAttribute('aria-label', 'Close');

        const corpoDoModal = document.createElement('div');
        corpoDoModal.classList.add('modal-body');

        const descricaoModal = document.createElement('p');
        descricaoModal.textContent = item.descricao;

        const modalFooter = document.createElement('footer');
        modalFooter.classList.add('modal-footer', 'me-auto');

        const precoNoModal = document.createElement('p');
        precoNoModal.textContent = item.preco;

        cardFooter.appendChild(preco);
        cardHover.appendChild(nomeDoPrato);
        headerDoCard.appendChild(cardHover);
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
}



const avisoListaVazia = document.querySelector('.mensagem-lista-vazia');

function verificarListaVazia() {
    const listaDeItens = itensDoCardapio.querySelectorAll('li');
    if (listaDeItens.length === 0) {
        avisoListaVazia.style.display = 'block';
    } else {
        avisoListaVazia.style.display = 'none';
    }
}




renderizarInterface();

verificarListaVazia();

