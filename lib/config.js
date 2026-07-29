const URL_API_CARDAPIO = "http://localhost:8081";
const URL_MOCK_CARDAPIO = "http://localhost:3081";

export const USE_MOCKS = true;

export const CONFIG_API = Object.freeze({
  cardapio: Object.freeze({
    baseUrl: USE_MOCKS ? URL_MOCK_CARDAPIO : URL_API_CARDAPIO,
    alunoId: 1,
  }),
});