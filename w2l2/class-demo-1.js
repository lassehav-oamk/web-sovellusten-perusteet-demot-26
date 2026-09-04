class Henkilo {

    #osoite;

    constructor(nimi, ika) {
        this.nimi = nimi;
        this.ika = ika;
        this.#osoite = "Esimerkkitie 1, 00000 Helsinki"
    }

    esittele() {
        return "Henkilön nimi: " + this.nimi + "\nikä:" + this.ika
    }

    get osoite() {
        return this.#osoite;
    }

    set osoite(uusiOsoite) {

        // tähän voisi laittaa jotain validointia, mitä tarvitaan...

        this.#osoite = uusiOsoite;
    }

    setOsoite(uusiOsoite) {
        // tänne toteutus...
    }

}

const henkilo1 = new Henkilo("John Doe", 30);
const henkilo2 = new Henkilo("Jamppa Eemeli", 15);

//console.log(henkilo1.esittele());
//console.log(henkilo2.esittele());
console.log(henkilo1.nimi)

henkilo1.nimi = "Testi";
console.log(henkilo1.nimi)

// Luku ei onnistu, koska # private
// console.log("Osoite: " + henkilo1.#osoite);

// Kiroitus privateen?
// henkilo1.#osoite = "Testi"; // ei toimi

// Luku getterin kautta
console.log("Osoite: " + henkilo1.osoite);

// Kirjoitus setterin kautta
henkilo1.osoite = "Osoite muuttui";
console.log("Osoite: " + henkilo1.osoite);

// tavallisen metodin kautta
henkilo1.setOsoite("Osoite muuttui");
