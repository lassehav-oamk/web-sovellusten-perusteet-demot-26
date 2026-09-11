const button = document.querySelector("#button");
const counter = document.querySelector("#counter");

let count = 0;

// TUNNILLA:
// Lisää click-event listener.
// Kasvata count-muuttujaa yhdellä.
// Päivitä counter-elementin textContent.

button.addEventListener('click', () => {
    //console.log(count++);
    count++;
    counter.textContent = count;
});
