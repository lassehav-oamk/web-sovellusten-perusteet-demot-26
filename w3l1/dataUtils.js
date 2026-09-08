// W2L3: Taulukkometodit ja JSON
// Täydennä funktiot. Kaikkien funktioiden pitää olla puhtaita:
// älä muuta parametrina saatua alkuperäistä taulukkoa.

export function getBySensor(cameras, sensor) {
  // TODO: palauta vain kamerat, joiden sensor-kenttä vastaa parametria.
  return [];
}

export function getInStock(cameras) {
  // TODO: palauta vain varastossa olevat kamerat.
  return [];
}

export function sortByPrice(cameras, order = "asc") {
  // TODO: palauta uusi taulukko hinnan mukaan järjestettynä.
  // order voi olla "asc" tai "desc".
  return [];
}

export function getAveragePrice(cameras) {
  // TODO: laske kameroiden keskihinta. Tyhjälle taulukolle palauta 0.
  return 0;
}

export function toDisplayObjects(cameras) {
  // TODO: muunna kamerat muotoon:
  // { id, title: "Brand Model", details: "Sensor, video, €price", rating }
  return [];
}

export function getBestAffordable(cameras, maxPrice) {
  // TODO: etsi paras kamera annetun enimmäishinnan alle.
  // Paras tarkoittaa suurinta rating-arvoa. Jos ei löydy, palauta undefined.
  return undefined;
}
