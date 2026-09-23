/**insere uma variavel com codigo html para um ID de um elemento html no inicio do elemento*/
export function renderizarHtml (html, idPrincipal){
    const container = document.getElementById(idPrincipal)

    if (!container) {
    console.warn(` O elemento com o ID "${idPrincipal}" não foi encontrado na página.`);
    return; 
    }

    container.insertAdjacentHTML("afterbegin", html)
}