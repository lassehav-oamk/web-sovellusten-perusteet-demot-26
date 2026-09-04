let x = 5;

console.log('X arvo on '+ x);

function hello() {
    console.log("Hello world");
}

hello();
/*
x = function() {
    console.log("hello unnamed function");
}
x();

let y = hello;
y();

function funktionSuorittaja(suoritettava)
{
    suoritettava();
}

funktionSuorittaja(x);
funktionSuorittaja(y);
*/

// arrow function

function summa(a, b, c) {
    return a + b + c;
}

// palauttaa laskennan tuloksen, vaikka return puuttuu
const summaArrow = (a,b,c) => a+b+c;

const summaArrow2 = (a,b,c) => {
    return a + b + c;
}

// jos on vain yksi parametri, ei tarvita sulkumerkkejä parameterille
const yhdenParamArrow = x => x*5;


// ---- Template literal
// perinteinen tapa sijoittaa muuttuja merkkijonoon esim näin
let age = 20;
let tervehdys = "Hei, olen Teppo ja ikäni on " + age + " ja tykkään urheilusta";
console.log(tervehdys)

// template literal tapa
let tervehdys2 = `Hei, olen Jaakko, ikäni on ${age} ja tykkään oluesta`;  
console.log(tervehdys2)