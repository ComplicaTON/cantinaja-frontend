export const APIMock = {
    cardapio: "http://localhost:3081",
    carteira: "http://localhost:3082"
}

export const API = {
    cardapio: "http://localhost:8081",
    carteira: "http://localhost:8082"
}

const URL_API_CARTEIRA = "http://localhost:8082";
const URL_MOCK_CARTEIRA = "http://localhost:3082";

export const USE_MOCKS = true;

export const CONFIG_API = Object.freeze({
  carteira: Object.freeze({
    baseUrl: USE_MOCKS ? APIMock.carteira : API.carteira,
    alunoId: 1,
  }),
});
