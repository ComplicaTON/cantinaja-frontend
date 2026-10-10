import { abrirModal } from "./editModal.js";

export function botaoEditar(produto) {

  const btnEdit = document.createElement('button');

  btnEdit.className = 'btn btn-primary mb-0 ms-auto';
  btnEdit.textContent = 'Editar';

  btnEdit.addEventListener("click", () => {
    abrirModal(produto);
  })

    return btnEdit;
}