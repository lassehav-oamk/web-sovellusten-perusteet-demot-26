// W2L3: Taulukkometodit ja JSON
// Täydennä funktiot. Kaikkien funktioiden pitää olla puhtaita:
// älä muuta parametrina saatua alkuperäistä taulukkoa.

export function getBySensor(cameras, sensor) {
  // TODO: palauta vain kamerat, joiden sensor-kenttä vastaa parametria.

  // haetaan kaikki kamerat joiden sensori on APS-C (sensor parametrin arvo esimerkissä)
  let searchResults = [];

  // for(let i = 0; i < cameras.length; i++)
  // {
  //   const sensorType = cameras[i].sensor;
  //   if(sensorType === "APS-C")
  //   {
  //     // löytyi
  //     searchResults.push(cameras[i]);
  //   }
  // }
  searchResults = cameras.filter(camera => camera.sensor === sensor);

  return searchResults;
}

export function getInStock(cameras) {
  return cameras.filter(camera => camera.inStock);
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
  return cameras.map(
    kamera => {
      return {
        id: kamera.id,
        title: kamera.brand + " " + kamera.model,
        details: kamera.sensor + ", " + kamera.video + ", €" + kamera.price,
        rating: kamera.rating
      }
    }
  );
}

export function getBestAffordable(cameras, maxPrice) {
  // TODO: etsi paras kamera annetun enimmäishinnan alle.
  // Paras tarkoittaa suurinta rating-arvoa. Jos ei löydy, palauta undefined.
  return undefined;
}
