import { alterarDisponibilidade } from "./alterarDisponibilidade";

export function botaoDisponibilidade(produto){

    const btnDisponibilidade = document.createElement('button');
    
    if(produto.disponibilidade){
        btnDisponibilidade.className = 'btn btn-primary mb-0 ms-auto';
        btnDisponibilidade.textContent = 'Marcar Indisponivel';

    } else {
        btnDisponibilidade.className = 'btn btn-secondary mb-0 ms-auto';
        btnDisponibilidade.textContent = 'Marcar Disponivel';
    }

    btnDisponibilidade.addEventListener("click", () => {
        alterarDisponibilidade(produto);
    })

    return btnDisponibilidade;
}