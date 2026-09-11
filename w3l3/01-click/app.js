const button = document.querySelector("#button");
const message = document.querySelector("#message");

// TUNNILLA:
// 1. Lisää button-elementille click-event listener.
// 2. Tulosta ensin konsoliin "Nappia painettiin".
// 3. Muuta sen jälkeen message-elementin textContent.

button.addEventListener('click', (event) => {
    console.log('Nappia painettiin');
    message.textContent = "Nappia painettu"
});
