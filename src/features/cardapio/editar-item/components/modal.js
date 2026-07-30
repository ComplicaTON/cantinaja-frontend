import { renderizarHtml } from "../../../../shared/utils.js";

const modal =
`<div class="modal fade" id="modalEditar" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
   aria-labelledby="tituloModal" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      
      <form id="formEditarProduto" novalidate>

        <input type="hidden" id="inputId" name="id">
        <div class="modal-header">
          <h2 class="modal-title fs-5" id="tituloModal">Editar Produto</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
        </div>
        
        <div class="modal-body">
          <div class="mb-3">
            <label for="inputProduto" class="form-label">Nome do Produto <span class="text-danger">*</span></label>
            <input 
              type="text" 
              class="form-control" 
              id="inputProduto" 
              name="nome"
              placeholder="Ex: Camiseta Algodão Premium" 
              required
            >
            <div class="invalid-feedback">
              Por favor, informe o nome do produto.
            </div>
          </div>
          
          <div class="mb-3">
            <label for="inputPreco" class="form-label">Preço <span class="text-danger">*</span></label>
            <div class="input-group">
              <span class="input-group-text">R$</span>
              <input 
                type="text" 
                class="form-control" 
                id="inputPreco" 
                name="preco"
                placeholder="0,00" 
                inputmode="decimal" 
                required
              >
              <div class="invalid-feedback">
                Por favor, informe um preço válido.
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>

          <button type="submit" class="btn btn-primary" id="btnSalvar">
            <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
            Salvar alterações
          </button>
        </div>

      </form>

    </div>
  </div>
</div>`

renderizarHtml(modal, 'renderizarModal')