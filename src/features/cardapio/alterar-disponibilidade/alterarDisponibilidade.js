import { CONFIG_API } from "/lib/config.js";

export async function alterarDisponibilidade(produto, corpoDoCard, elementoBotao){

    try {
    const novoStatus = !produto.disponibilidade;
    const url = `${CONFIG_API.cardapio.baseUrl}/api/items/${produto.id}`;


    const resposta = await fetch (url,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            disponibilidade : novoStatus
        })
    });

    if (resposta.status === 409){
        const respostaGet = await fetch(url);
        if (!respostaGet.ok) throw new Error('Não foi possivel sincronizar.');

        const produtoAtualizado = await respostaGet.json();
        produto.disponibilidade = produtoAtualizado.disponibilidade;
        atualizarInterface(produto, corpoDoCard, elementoBotao);

        alert('Este item já foi modificado. O produto foi sincronizado');
        return;
    }

    if (!resposta.ok){
        throw new Error(`Erro ao alterar disponibilidade ${resposta.status}`);
    }

    produto.disponibilidade = novoStatus;
    atualizarInterface(produto, corpoDoCard, elementoBotao);
    
    } catch (error) {
        console.error("Erro ao alterar disponibilidade:", error);
        throw error;
    }
}

function atualizarInterface(produto, corpoDoCard, elementoBotao) {
    if (!corpoDoCard) {
        return;
    }

    const elementoBadge = corpoDoCard.querySelector("#badge");

    if (produto.disponibilidade) {
        
        if (elementoBadge) {
            elementoBadge.textContent = 'Disponível';
            elementoBadge.classList.remove('badge-indisponivel');
            elementoBadge.classList.add('badge-disponivel');
        }

        if (elementoBotao) {
            elementoBotao.textContent = 'Marcar Indisponível';
            elementoBotao.className = 'btn btn-primary mb-0 ms-auto';
        }
        corpoDoCard.classList.remove('card-body-disabled');


    } else if (!produto.disponibilidade){

        if (elementoBadge) {
            elementoBadge.textContent = 'Indisponível'
            elementoBadge.classList.remove('badge-disponivel')
            elementoBadge.classList.add('badge-indisponivel')
        }

        if (elementoBotao) {
            elementoBotao.textContent = 'Marcar Disponível';
            elementoBotao.className = 'btn btn-secondary mb-0 ms-auto';
        }
        corpoDoCard.classList.add('card-body-disabled');
    }
}