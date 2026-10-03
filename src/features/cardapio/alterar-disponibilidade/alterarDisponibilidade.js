import { CONFIG_API } from "/lib/config.js";

export async function alterarDisponibilidade(produto, corpoDoCard, elementoBotao, elementoBadge){

    elementoBotao.disabled = true;

    try {
    const novoStatus = !produto.disponivel;
    const url = `${CONFIG_API.cardapio.baseUrl}/api/items/${produto.id}`;
    

    const resposta = await fetch (url,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            disponivel : novoStatus
        })
    });

    if (resposta.status === 409){
        const respostaGet = await fetch(url);
        if (!respostaGet.ok) throw new Error('Não foi possivel sincronizar.');

        const produtoAtualizado = await respostaGet.json();
        produto.disponivel = produtoAtualizado.disponivel;
        atualizarInterface(produto, corpoDoCard, elementoBotao, elementoBadge);

        alert('Este item já foi modificado. O produto foi sincronizado');
        return;
    }

    if (!resposta.ok){
        throw new Error(`Erro ao alterar disponibilidade ${resposta.status}`);
    }

    produto.disponivel = novoStatus;
    atualizarInterface(produto, corpoDoCard, elementoBotao, elementoBadge);
    
    } catch (error) {
        console.error("Erro ao alterar disponibilidade:", error);
        throw error;
    } finally {
        elementoBotao.disabled = false;
    }
}

function atualizarInterface(produto, corpoDoCard, elementoBotao, elementoBadge) {
    if (!corpoDoCard) {
        return;
    }

    if (produto.disponivel) {
        
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


    } else {

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