import { cameras } from "./cameras.js";
import {
  getBySensor,
  getInStock,
  sortByPrice,
  getAveragePrice,
  toDisplayObjects,
  getBestAffordable
} from "./dataUtils.js";

//console.log("Alkuperäinen kameradata", cameras);

// 1. Kokeile funktioita yksi kerrallaan konsolissa.
// const apscCameras = getBySensor(cameras, "APS-C");
// console.log("APS-C-kamerat", apscCameras);

// const available = getInStock(cameras);
// console.log("Varastossa", available);

// const cheapFirst = sortByPrice(cameras, "asc");
// console.log("Halvimmat ensin", cheapFirst);

// const averagePrice = getAveragePrice(cameras);
// console.log("Keskihinta", averagePrice);

const displayObjects = toDisplayObjects(cameras);
console.log("Näyttöobjektit", displayObjects);

// const bestUnder1000 = getBestAffordable(cameras, 1000);
// console.log("Paras kamera alle 1000 €", bestUnder1000);


// map esimerkki
// const esim = [1, 2, 3, 4];
// const result = esim.map(elementti => elementti * 10);
// console.log(result);

// const esim2 = ["teppo", "matti", "jaana"];
// //const result2 = esim2.map(elementti => elementti.toUpperCase())
// const result2 = esim2.map(elementti => {
//   let uusiArvo = [...elementti];
//   uusiArvo[0] = uusiArvo[0].toUpperCase();
//   return uusiArvo.join("");
// })
// console.log(result2);


// sort esimerkki
let lukuja = [4, 5, 1, -4, 1000, 99, 64, -5324, 45645876465];

lukuja.sort((a, b) => b - a)
console.log(lukuja);


