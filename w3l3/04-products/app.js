const products = [
  { id: 1, title: "Laptop", price: 999.99 },
  { id: 2, title: "Phone", price: 499.99 },
  { id: 3, title: "Tablet", price: 699.99 },
  { id: 4, title: "Headphones", price: 199.99 },
  { id: 5, title: "Smartwatch", price: 299.99 },
  { id: 6, title: "Camera", price: 899.99 },
  { id: 7, title: "Printer", price: 149.99 },
  { id: 8, title: "Monitor", price: 249.99 },
  { id: 9, title: "Keyboard", price: 79.99 },
  { id: 10, title: "Mouse", price: 49.99 }
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
