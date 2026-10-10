import { alterarDisponibilidade } from "./alterarDisponibilidade.js";

export function botaoDisponibilidade(produto, corpoDoCard, elementoBadge){

    const btnDisponibilidade = document.createElement('button');
    
    if(produto.disponivel){
        btnDisponibilidade.className = 'btn btn-primary mb-0 ms-auto';
        btnDisponibilidade.textContent = 'Marcar Indisponível';

    } else {
        btnDisponibilidade.className = 'btn btn-secondary mb-0 ms-auto';
        btnDisponibilidade.textContent = 'Marcar Disponível';
    }

    btnDisponibilidade.addEventListener("click", async () => {
        try {
        await alterarDisponibilidade(produto, corpoDoCard, btnDisponibilidade, elementoBadge);
        } catch (error) {
            alert('Não foi possivel alterar a disponibilidade');
        }
    })

    return btnDisponibilidade;
}