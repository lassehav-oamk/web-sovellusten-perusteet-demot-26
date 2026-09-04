// nimetty funktio, klassinen kirjoitustapa
function describe(name, age = 0) {
    return `Hei! Olen ${name} ja olen ${age}-vuotias`;
}

// function expression, funktio sijoitettuna muuttujaan ilman annettua nimeä
const describe2 = function(name, age = 0) {
    return `Hei! Olen ${name} ja olen ${age}-vuotias`;
}

// nuolifunktiosyntaksi
const describe3 = (name, age) => `Hei! Olen ${name} ja olen ${age}-vuotias`

// funktiokutsut
console.log(describe('Jaakko', 55))
console.log(describe2('Liisa'));
console.log(describe3('Clark Kent', 30));


