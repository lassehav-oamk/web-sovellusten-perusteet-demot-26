const product = {
  title: "Laptop",
  price: 999.99
};

const productsElement = document.querySelector("#products");

// Edellisen tunnin DOM-rakenne on valmiina.
const container = document.createElement("div");
container.className = "product";

const title = document.createElement("div");
title.textContent = product.title;

const price = document.createElement("div");
price.textContent = product.price + " €";

container.append(title);
container.append(price);
productsElement.append(container);

// TUNNILLA:
// 1. Luo button createElementillä.
// 2. Aseta sen tekstiksi "Suosikki".
// 3. Liitä button container-elementtiin.
// 4. Lisää buttonille click-event listener.
// 5. Muuta napin tekstiä tai käytä container.classList.toggle("favorite").


const elementButton = document.createElement('button');
elementButton.textContent = "Suosikki"
container.append(elementButton);

// 4
elementButton.addEventListener('click', () => {
  console.log('click');
  container.classList.toggle("favorite");
});