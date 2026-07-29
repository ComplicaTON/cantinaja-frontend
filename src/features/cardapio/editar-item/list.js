import { botaoEditar } from "./editar.js";
import { CONFIG_API } from "../../../../lib/config.js";


export async function listar() {
  const containerLista = document.getElementById('cardapio');

  const url = `${CONFIG_API.cardapio.baseUrl}/api/items`

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erro ao carregar produtos: ${response.status}`);
    }

    const produtos = await response.json();

    containerLista.innerHTML = '';

    const fragmento = document.createDocumentFragment();

    produtos.forEach(produto => {
      const card = document.createElement('div');
      const title = document.createElement('h4');
      const rowInfo = document.createElement('div');
      const priceLabel = document.createElement('p');
      const priceValue = document.createElement('p');

      const id = document.getElementById('inputId');

      id.value = produto.id
      console.log(id.value)

      card.className = 'card-body mb-3 border pb-2';
      title.className = 'fw-semibold card-title text-center';
      priceLabel.className = 'col col-lg-2 fw-bold';
      priceValue.className = 'col col-lg-5';
      
      rowInfo.className = 'row align-items-center';

      const precoFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(produto.preco);

      title.textContent = produto.nome;
      priceLabel.textContent = 'Preço:';
      priceValue.textContent = precoFormatado;
      
      card.appendChild(title);
      card.appendChild(priceLabel);
      card.appendChild(priceValue);
      card.appendChild(botaoEditar(produto));

      fragmento.appendChild(card);
    });

    containerLista.appendChild(fragmento);


  } catch (erro) {
    console.error('Falha ao listar produtos:', erro);
    containerLista.innerHTML = '<p class="text-danger">Erro ao carregar a lista de produtos.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
   listar();

})

 