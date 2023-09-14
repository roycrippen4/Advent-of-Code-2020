import { readFileToString } from "../../utilities";

const filepath = "src/data/day16/day16-data.txt";
const testFilepath = "src/data/day16/day16-dataTEST.txt";

const testing = false;

function getData() {
  return readFileToString(testing ? testFilepath : filepath)
    .split("\r\n\r\n")
    .map((x) => x.split("\r\n"))
    .filter((array) => !array.toString().includes("your ticket"));
}

// function getRanges(data: string[]) {
//   const ranges: Map<string, Range> = new Map<string, Range>();
//   for (const line of data) {
//     switch (line.split(":")[0]) {
//       case "departure location":
//         const minLocation = parseInt(line.split(":")[1].split(" ")[1].split("-")[0]);
//         const maxLocation = parseInt(line.split(":")[1].split(" ")[1].split("-")[1]);
//         ranges.set("departure location", { min: minLocation, max: maxLocation });
//         break;
//       case "departure station":
//         const minStation = parseInt(line.split(":")[1].split(" ")[3].split("-")[0]);
//         const maxStation = parseInt(line.split(":")[1].split(" ")[3].split("-")[1]);
//         ranges.set("departure station", { min: minStation, max: maxStation });
//         break;
//       case "departure platform":
//         const minPlatform = parseInt(line.split(":")[1].split(" ")[3].split("-")[0]);
//         const maxPlatform = parseInt(line.split(":")[1].split(" ")[3].split("-")[1]);
//         ranges.set("departure platform", { min: minPlatform, max: maxPlatform })
//         break;
//       case "departure track":
//         const minTrack = parseInt(line.split(":")[1].split(" ")[3].split("-")[0]);
//         const maxTrack = parseInt(line.split(":")[1].split(" ")[3].split("-")[1]);
//         ranges.set("departure track", { min: minTrack, max: maxTrack });
//         break;
//       case "departure date":
//         const minDate = parseInt(line.split(":")[1].split(" ")[3].split("-")[0]);
//         const maxDate = parseInt(line.split(":")[1].split(" ")[3].split("-")[1]);
//         ranges.set("departure date", { min: minDate, max: maxDate });
//         break;
//       case "departure time":
//         const minTime = parseInt(line.split(":")[1].split(" ")[3].split("-")[0]);
//         const maxTime = parseInt(line.split(":")[1].split(" ")[3].split("-")[1]);
//         ranges.set("departure time", { min: minTime, max: maxTime });
//         break;
//       case "arrival location":
//         const minArrivalLocation = parseInt(
//           line.split(":")[1].split(" ")[1].split("-")[0]
//         );
//         const maxArrivalLocation = parseInt(
//           line.split(":")[1].split(" ")[1].split("-")[1]
//         );
//         ranges.set("arrival location", { min: minArrivalLocation, max: maxArrivalLocation });
//         break;
//       case "arrival station":
//         const minArrivalStation = parseInt(
//           line.split(":")[1].split(" ")[3].split("-")[0]
//         );
//         const maxArrivalStation = parseInt(
//           line.split(":")[1].split(" ")[3].split("-")[1]
//         );
//         ranges.set("arrival station", { min: minArrivalStation, max: maxArrivalStation });
//         break;
//       case "arrival platform":
//         const minArrivalPlatform = parseInt(
//           line.split(":")[1].split(" ")[3].split("-")[0]
//         );
//         const maxArrivalPlatform = parseInt(
//           line.split(":")[1].split(" ")[3].split("-")[1]
//         );
//         ranges.set("arrival platform", { min: minArrivalPlatform, max: maxArrivalPlatform });
//         break;
//       case "arrival track":
//         const minArrivalTrack = parseInt(line.split(":")[1].split(" ")[3].split("-")[0]);
//         const maxArrivalTrack = parseInt(line.split(":")[1].split(" ")[3].split("-")[1]);
//         ranges.set("arrival track", { min: minArrivalTrack, max: maxArrivalTrack });
//         break;
//       case "class":
//         const minClass = parseInt(line.split(":")[1].split(" ")[1].split("-")[0]);
//         const maxClass = parseInt(line.split(":")[1].split(" ")[1].split("-")[1]);
//         ranges.set("class", { min: minClass, max: maxClass });
//         break;
//       case "duration":
//         const minDuration = parseInt(line.split(":")[1].split(" ")[1].split("-")[0]);
//         const maxDuration = parseInt(line.split(":")[1].split(" ")[1].split("-")[1]);
//         ranges.set("duration", { min: minDuration, max: maxDuration });
//         break;
//       case "price":
//         const minPrice = parseInt(line.split(":")[1].split(" ")[1].split("-")[0]);
//         const maxPrice = parseInt(line.split(":")[1].split(" ")[1].split("-")[1]);
//         ranges.set("price", { min: minPrice, max: maxPrice });
//         break;
//       case "route":
//         const minRoute = parseInt(line.split(":")[1].split(" ")[1].split("-")[0]);
//         const maxRoute = parseInt(line.split(":")[1].split(" ")[1].split("-")[1]);
//         ranges.set("route", { min: minRoute, max: maxRoute });
//         break;
//       case "row":
//         const minRow = parseInt(line.split(":")[1].split(" ")[1].split("-")[0]);
//         const maxRow = parseInt(line.split(":")[1].split(" ")[1].split("-")[1]);
//         ranges.set("row", { min: minRow, max: maxRow });
//         break;
//       case "seat":
//         const minSeat = parseInt(line.split(":")[1].split(" ")[1].split("-")[0]);
//         const maxSeat = parseInt(line.split(":")[1].split(" ")[1].split("-")[1]);
//         ranges.set("seat", { min: minSeat, max: maxSeat });
//         break;
//       case "train":
//         const minTrain = parseInt(line.split(":")[1].split(" ")[1].split("-")[0]);
//         const maxTrain = parseInt(line.split(":")[1].split(" ")[1].split("-")[1]);
//         ranges.set("train", { min: minTrain, max: maxTrain });
//         break;
//       case "type":
//         const minType = parseInt(line.split(":")[1].split(" ")[1].split("-")[0]);
//         const maxType = parseInt(line.split(":")[1].split(" ")[1].split("-")[1]);
//         ranges.set("type", { min: minType, max: maxType });
//         break;
//       case "wagon":
//         const minWagon = parseInt(line.split(":")[1].split(" ")[1].split("-")[0]);
//         const maxWagon = parseInt(line.split(":")[1].split(" ")[1].split("-")[1]);
//         ranges.set("wagon", { min: minWagon, max: maxWagon });
//         break;
//       case "zone":
//         const minZone = parseInt(line.split(":")[1].split(" ")[1].split("-")[0]);
//         const maxZone = parseInt(line.split(":")[1].split(" ")[1].split("-")[1]);
//         ranges.set("zone", { min: minZone, max: maxZone });
//         break;
//       default:
//         break;
//     }
//   }
//   return ranges;
// }

function getRanges(data: string[]): number[][] {
  const ranges: number[][] = [];
  for (const line of data) {
    const min1 = parseInt(line.split(":")[1].split(" ")[1].split("-")[0]);
    const max1 = parseInt(line.split(":")[1].split(" ")[1].split("-")[1]);
    const min2 = parseInt(line.split(":")[1].split(" ")[3].split("-")[0]);
    const max2 = parseInt(line.split(":")[1].split(" ")[3].split("-")[1]);
    ranges.push([min1, max1]);
    ranges.push([min2, max2]);
  }
  return ranges;
}

function getNearbyTickets(data: string[]) {
  return data
    .filter((x) => x.includes(","))
    .map((x) => x.split(",").map((y) => parseInt(y)));
}

function findInvalid(nearbyTicket: number[], ranges: number[][]): number {
  const invalidValues: number[] = [];
  for (const number of nearbyTicket) {
    const state = ranges.every((range) => {
      return number < range[0] || number > range[1];
    });
    if (state) {
      invalidValues.push(number);
    }
  }
  return invalidValues.reduce((a, b) => a + b, 0);
}

function findAllInvalid(nearbyTickets: number[][], ranges: number[][]): number {
  let sum = 0;
  for (const nearbyTicket of nearbyTickets) {
    sum += findInvalid(nearbyTicket, ranges);
  }
  return sum;
}

export function solveD16P1() {
  const data = getData();
  const ranges = getRanges(data[0]);
  const nearbyTickets = getNearbyTickets(data[1]);
  const answer = findAllInvalid(nearbyTickets, ranges);
  console.log(answer);
  return answer;
}

solveD16P1();
