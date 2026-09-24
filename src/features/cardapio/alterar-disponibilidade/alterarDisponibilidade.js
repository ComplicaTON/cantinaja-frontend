import { CONFIG_API } from "/lib/config.js";

export async function alterarDisponibilidade(produto){

    try {
    const novoStatus = !produto.disponibilidade;
    const url = `${CONFIG_API.cardapio.baseUrl}/api/items/${currentItem.id}`;

    const resposta = await fetch (url,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            disponibilidade : novoStatus
        })
    });

    } catch (error) {
        console.error("Erro ao alterar disponibilidade:", error);
    }
};