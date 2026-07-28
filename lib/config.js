export const USE_MOCKS = true;
const API_REAL = { cardapio: "http://localhost:8081", carteira: "http://localhost:8082" };
const API_MOCK = { cardapio: "http://localhost:3081", carteira: "http://localhost:3082" };

export const CONFIG_API = Object.freeze({
  carteira: Object.freeze({
    baseUrl: USE_MOCKS ? API_MOCK.carteira : API_REAL.carteira,
    alunoId: 1,
  }),cardapio: Object.freeze({
    baseUrl: USE_MOCKS ? URL_MOCK_CARDAPIO : URL_API_CARDAPIO,
  }),
});