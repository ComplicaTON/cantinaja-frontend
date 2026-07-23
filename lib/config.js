const URL_API_CARTEIRA = "http://localhost:8082";
const URL_MOCK_CARTEIRA = "http://localhost:3082";

export const USE_MOCKS = true;

export const CONFIG_API = Object.freeze({
  carteira: Object.freeze({
    baseUrl: USE_MOCKS ? URL_MOCK_CARTEIRA : URL_API_CARTEIRA,
    alunoId: 1,
  }),
});
