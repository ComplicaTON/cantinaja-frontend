const API_REAL = Object.freeze({
  carteira: "http://localhost:8082",
  cardapio: "http://localhost:8081",
});

const API_MOCK = Object.freeze({
  carteira: "http://localhost:3082",
  cardapio: "http://localhost:3081",
});

export const USE_MOCKS = true;

export const CONFIG_API = Object.freeze({
  carteira: Object.freeze({
    baseUrl: USE_MOCKS ? API_MOCK.carteira : API_REAL.carteira,
    alunoId: 1,
  }),

  cardapio: Object.freeze({
    baseUrl: USE_MOCKS ? API_MOCK.cardapio : API_REAL.cardapio,
  }),
});