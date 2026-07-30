import { abrirModal } from "./editModal.js";

export function botaoEditar(produto) {

  const btnEdit = document.createElement('button');

  btnEdit.className = 'btn btn-primary';
  btnEdit.textContent = 'Editar';

  btnEdit.addEventListener("click", () => {
    abrirModal(produto);
  })

    return btnEdit;
}