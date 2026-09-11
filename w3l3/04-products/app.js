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

function createProduct(product) {
  const container = document.createElement("div");
  container.className = "product";

  const title = document.createElement("div");
  title.textContent = product.title;

  const price = document.createElement("div");
  price.textContent = product.price + " €";

  container.append(title);
  container.append(price);
  productsElement.append(container);

  const elementButton = document.createElement('button');
  elementButton.textContent = "Suosikki"
  container.append(elementButton);

  elementButton.addEventListener('click', () => {
    console.log('click');
    container.classList.toggle("favorite");
  });
}

// silmukka jolla kelataan products taulukko läpi ja jokaiselle
// kutsutaan yo funktio
for(const product of products) {
  //console.log(product)
  createProduct(product)
}