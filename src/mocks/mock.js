window.mockData = {
  custo: 150.50,       // Total gasto pré-calculado no back
  recarga: 500.00,     // Total recarregado pré-calculado no back
  transacoes: [
    { tipo: "RECARGA", valor: 500.00, data: "2023-10-01" },
    { tipo: "DEBITO", valor: 150.50, data: "2023-10-05" }
    // ...
  ]
};