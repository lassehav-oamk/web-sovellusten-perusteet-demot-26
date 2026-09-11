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
const filterInput = document.querySelector("#filter");

function render(productsToRender) {
  // Tyhjennetään vanhat kortit ennen uuden listan näyttämistä.
  productsElement.textContent = "";

  for (const product of productsToRender) {
    const container = document.createElement("div");
    container.className = "product";

    const title = document.createElement("h2");
    title.textContent = product.title;

    const price = document.createElement("div");
    price.textContent = product.price + " €";

    container.append(title);
    container.append(price);
    productsElement.append(container);
  }
}

filterInput.addEventListener("input", (event) => {
  const searchText = event.target.value;

  console.log('Input event');
  console.log(searchText);

  // TEHTÄVÄ:
  // 1. Suodata products-taulukosta tuotteet, joiden title sisältää searchTextin.
  // 2. Huomioi isot ja pienet kirjaimet sekä hakutekstissä että tuotteen nimessä.
  // 3. Kutsu render-funktiota suodatetulla taulukolla.
  const suodatetutTuotteet = products.filter(p => p.title.includes(searchText));
  render(suodatetutTuotteet);
});

render(products);
