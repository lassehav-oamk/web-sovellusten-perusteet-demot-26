const products = [
  { id: 1, title: "Laptop", price: 999.99 },
  { id: 2, title: "Phone", price: 499.99 },
  { id: 3, title: "Tablet", price: 699.99 }
];

const productsElement = document.querySelector("#products");

// TUNNILLA:
// Käy products-taulukko läpi esimerkiksi for...of-silmukalla.
//
// Luo jokaiselle tuotteelle:
// - div.product
// - otsikko
// - hinta
// - Suosikki-nappi
//
// Lisää napille click-event listener.
// Napin painaminen saa vaikuttaa vain kyseiseen tuotekorttiin.
