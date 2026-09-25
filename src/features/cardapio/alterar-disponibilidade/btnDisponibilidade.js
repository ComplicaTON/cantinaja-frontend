import { alterarDisponibilidade } from "./alterarDisponibilidade";

export function botaoDisponibilidade(produto, corpoDoCard){

    const btnDisponibilidade = document.createElement('button');
    
    if(produto.disponibilidade){
        btnDisponibilidade.className = 'btn btn-primary mb-0 ms-auto';
        btnDisponibilidade.textContent = 'Marcar Indisponível';

    } else {
        btnDisponibilidade.className = 'btn btn-secondary mb-0 ms-auto';
        btnDisponibilidade.textContent = 'Marcar Disponível';
    }

    btnDisponibilidade.addEventListener("click", () => {
        alterarDisponibilidade(produto, corpoDoCard, btnDisponibilidade)
    })

    return btnDisponibilidade;
}