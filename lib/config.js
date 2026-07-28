const URL_API_CARDAPIO = "http://localhost:8081";
const URL_MOCK_CARDAPIO = "http://localhost:3081";

const URL_API_CARTEIRA = "http://localhost:8082";
const URL_MOCK_CARTEIRA = "http://localhost:3082";

export const USE_MOCKS = true;

export const CONFIG_API = Object.freeze({
  carteira: Object.freeze({
    baseUrl: USE_MOCKS ? URL_MOCK_CARTEIRA : URL_API_CARTEIRA,
    alunoId: 1,
  }),cardapio: Object.freeze({
    baseUrl: USE_MOCKS ? URL_MOCK_CARDAPIO : URL_API_CARDAPIO,
  }),
});
