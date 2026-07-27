const cardsDados = [
    { id: 1, titulo: "Card Alpha", texto: "Conteúdo detalhado do primeiro card.", preco: 'R$ 10,00' },
    { id: 2, titulo: "Card Beta", texto: "Informações importantes do segundo card.", preco: 'R$ 20,00' },
    { id: 3, titulo: "Card Gamma", texto: "Dados e métricas do terceiro card.", preco: 'R$ 30,00' }
];

function renderizarInterface() {
    const listaDeItens = document.getElementById("lista-de-itens");

    cardsDados.forEach(item => {

        const colunaDoCard = document.createElement('li');
        colunaDoCard.classList.add('col');


        const itemDaLista = document.createElement("article");
        itemDaLista.classList.add("card", "mb-3", "g-3");

        const corpoDoCard = document.createElement('div');
        corpoDoCard.classList.add('card-body', 'd-flex', 'flex-column', 'flex-grow-1');

        const headerDoCard = document.createElement('header');
        headerDoCard.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2');

        const cardHover = document.createElement('a');
        cardHover.classList.add('card-link');

        const nomeDoPrato = document.createElement('h4');
        nomeDoPrato.classList.add('card-title', 'mb-0');
        nomeDoPrato.textContent = item.titulo;

        const badgeDeDisponibilidade = document.createElement('span');
        badgeDeDisponibilidade.classList.add('badge', 'badge-disponivel');
        badgeDeDisponibilidade.textContent = item.titulo;

        const descricaoDoPrato = document.createElement('p');
        descricaoDoPrato.classList.add('card-text', 'text-truncate');
        descricaoDoPrato.textContent = item.texto;

        const cardFooter = document.createElement('footer')
        cardFooter.classList.add('mt-auto');

        const preco = document.createElement('p');
        preco.classList.add('card-text', 'mb-0');
        preco.textContent = item.preco;
        

        cardFooter.appendChild(preco);
        cardHover.appendChild(nomeDoPrato);
        headerDoCard.appendChild(cardHover);
        headerDoCard.appendChild(badgeDeDisponibilidade);
        
        corpoDoCard.appendChild(headerDoCard);
        corpoDoCard.appendChild(descricaoDoPrato);
        corpoDoCard.appendChild(cardFooter);

        itemDaLista.appendChild(corpoDoCard);
        colunaDoCard.appendChild(itemDaLista);
        listaDeItens.appendChild(colunaDoCard);
    });
}

renderizarInterface();