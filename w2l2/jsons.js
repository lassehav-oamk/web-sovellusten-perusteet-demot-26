let henkilo = {
    ika: 4,
    nimi: "Teppo"
 };

let henkilo2 = {
    ika: 3, 
    nimi: "Liisa"
}

let ryhma = {
    nimi: "Harsoset",
    lapset: [
        henkilo, henkilo2
    ]
}

let ryhma2 = {
    nimi: "Nappaset",
    lapset: [
        {
            nimi: 'Matti',
            ika: 6
        },
        {
            nimi: "Lasse",
            ika: 5
        },
        {
            nimi: "Anna",
            ika: 4
        }
    ]
}

// Tehdään funktio joka tulostaa ryhmän lasten nimet
// bonus: tee funktio, joka laskee ryhmän lasten ikien keskiarvon

function lastenNimet(ryhma) {
    // luetaan vaikka ryhmän 2 lapsen nimi ja tulostetaan se
    //console.log(ryhma.lapset[1].nimi)

    for(let i = 0; i < ryhma.lapset.length; i++) {
        console.log(ryhma.lapset[i].nimi)
    }
}

// funktio laskee ryhmän lasten ikäkeskiarvon ja palauttaa sen
function ikaAvg(ryhma) {
    let ikaSum = 0;
    for(let i = 0; i < ryhma.lapset.length; i++) {
        ikaSum += ryhma.lapset[i].ika;
    }
    return ikaSum / ryhma.lapset.length;
}


lastenNimet(ryhma);
lastenNimet(ryhma2);



/*
 console.log(henkilo.ika);

 console.log(henkilo)

 henkilo.ika = 10;
 henkilo.osoite = "Testi";
*/




