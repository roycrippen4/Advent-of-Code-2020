import { Pair, readFileToString } from "../../utilities";

const filepath = "src/data/day16/day16-data.txt";
const testFilepath = "src/data/day16/day16-dataTEST.txt";

const testing = false;

function getData() {
  return readFileToString(testing ? testFilepath : filepath)
    .split("\r\n\r\n")
    .map((x) => x.split("\r\n"));
}

interface Range {
  name: string;
  minRange: [number, number];
  maxRange: [number, number];
}

function getRanges(data: string[]) {
  const ranges: Range[] = [];
  for (const line of data) {
    switch (line.split(":")[0]) {
      case "departure location":
        const departureLocationMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const departureLocationMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({
          name: "departure location",
          minRange: departureLocationMinRange,
          maxRange: departureLocationMaxRange
        });
        break;
      case "departure station":
        const departureStationMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const departureStationMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({
          name: "departure station",
          minRange: departureStationMinRange,
          maxRange: departureStationMaxRange
        });
        break;
      case "departure platform":
        const departurePlatformMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const departurePlatformMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({
          name: "departure platform",
          minRange: departurePlatformMinRange,
          maxRange: departurePlatformMaxRange
        });
        break;
      case "departure track":
        const departureTrackMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const departureTrackMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({
          name: "departure track",
          minRange: departureTrackMinRange,
          maxRange: departureTrackMaxRange
        });
        break;
      case "departure date":
        const departureDateMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const departureDateMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({
          name: "departure date",
          minRange: departureDateMinRange,
          maxRange: departureDateMaxRange
        });
        break;
      case "departure time":
        const departureTimeMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const departureTimeMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({
          name: "departure time",
          minRange: departureTimeMinRange,
          maxRange: departureTimeMaxRange
        });
        break;
      case "arrival location":
        const arrivalLocationMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const arrivalLocationMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({
          name: "arrival location",
          minRange: arrivalLocationMinRange,
          maxRange: arrivalLocationMaxRange
        });
        break;
      case "arrival station":
        const arrivalStationMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const arrivalStationMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({
          name: "arrival station",
          minRange: arrivalStationMinRange,
          maxRange: arrivalStationMaxRange
        });
        break;
      case "arrival platform":
        const arrivalPlatformMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const arrivalPlatformMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({
          name: "arrival platform",
          minRange: arrivalPlatformMinRange,
          maxRange: arrivalPlatformMaxRange
        });
        break;
      case "arrival track":
        const arrivalTrackMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const arrivalTrackMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({
          name: "arrival track",
          minRange: arrivalTrackMinRange,
          maxRange: arrivalTrackMaxRange
        });
        break;
      case "class":
        const classMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const classMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({ name: "class", minRange: classMinRange, maxRange: classMaxRange });
        break;
      case "duration":
        const durationMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const durationMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({
          name: "duration",
          minRange: durationMinRange,
          maxRange: durationMaxRange
        });
        break;
      case "price":
        const priceMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const priceMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({ name: "price", minRange: priceMinRange, maxRange: priceMaxRange });
        break;
      case "route":
        const routeMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const routeMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({ name: "route", minRange: routeMinRange, maxRange: routeMaxRange });
        break;
      case "row":
        const rowMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const rowMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({ name: "row", minRange: rowMinRange, maxRange: rowMaxRange });
        break;
      case "seat":
        const seatMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const seatMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({ name: "seat", minRange: seatMinRange, maxRange: seatMaxRange });
        break;
      case "train":
        const trainMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const trainMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({ name: "train", minRange: trainMinRange, maxRange: trainMaxRange });
        break;
      case "type":
        const typeMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const typeMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({ name: "type", minRange: typeMinRange, maxRange: typeMaxRange });
        break;
      case "wagon":
        const wagonMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const wagonMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({ name: "wagon", minRange: wagonMinRange, maxRange: wagonMaxRange });
        break;
      case "zone":
        const zoneMinRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[0]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        const zoneMaxRange: [number, number] = line
          .split(":")[1]
          .split(" or ")[1]
          .split("-")
          .map((x) => parseInt(x)) as [number, number];
        ranges.push({ name: "zone", minRange: zoneMinRange, maxRange: zoneMaxRange });
        break;
      default:
        throw new Error("Invalid field name");
    }
  }
  return ranges;
}

function getNearbyTickets(data: string[]) {
  return data
    .filter((x) => x.includes(","))
    .map((x) => x.split(",").map((y) => parseInt(y)));
}

function getTicketValuesByColumn(nearbyTickets: number[][]): number[][] {
  const ticketValues: number[][] = [];
  for (let i = 0; i < nearbyTickets.length; i++) {
    for (let j = 0; j < nearbyTickets[i].length; j++) {
      if (!ticketValues[j]) {
        ticketValues[j] = [];
      }
      ticketValues[j].push(nearbyTickets[i][j]);
    }
  }
  return ticketValues;
}

function isInvalid(nearbyTicket: number[], ranges: Range[]): boolean {
  for (const number of nearbyTicket) {
    const state = ranges.every((field) => {
      return !inRange(number, field.minRange) && !inRange(number, field.maxRange);
    });
    if (state) {
      return state;
    }
  }
  return false;
}

function inRange(n: number, minMax: [number, number]): boolean {
  return n >= minMax[0] && n <= minMax[1];
}

function filterInvalidTickets(nearbyTickets: number[][], ranges: Range[]): number[][] {
  return nearbyTickets.filter((ticket) => !isInvalid(ticket, ranges));
}

function collectFieldValues(nearbyTickets: number[][]): number[][] {
  const allFieldValues: number[][] = [];
  for (let i = 0; i < nearbyTickets[0].length; i++) {
    const fieldValues: number[] = [];
    for (let j = 0; j < nearbyTickets.length; j++) {
      fieldValues.push(nearbyTickets[j][i]);
    }
    allFieldValues.push(fieldValues);
  }
  return allFieldValues;
}

function findPossibleFields(
  nearbyTickets: number[][],
  ranges: Range[]
): Pair<string[], number[]>[] {
  const possibleFields: Pair<string[], number[]>[] = [];
  const ticketValues = collectFieldValues(nearbyTickets);

  for (let i = 0; i < ticketValues.length; i++) {
    for (const range of ranges) {
      if (
        ticketValues[i].every((number) => {
          return inRange(number, range.minRange) || inRange(number, range.maxRange);
        })
      ) {
        if (possibleFields[i]) {
          possibleFields[i].first.push(range.name);
        } else {
          possibleFields[i] = new Pair([range.name], ticketValues[i]);
        }
      }
    }
  }
  return possibleFields;
}

function determineFieldOrder(possibleFields: Pair<string[], number[]>[]): string[] {
  const fieldOrder: string[] = Array(20).fill("");

  while (fieldOrder.includes("")) {
    const possible = possibleFields.find((x) => x.first.length === 1);
    const possibleIdx = possibleFields.findIndex((x) => x.first.length === 1);
    if (possible) {
      fieldOrder[possibleIdx] = possible.first[0];
      possibleFields.forEach((x) => {
        if (x.first.includes(fieldOrder[possibleIdx])) {
          x.first = x.first.filter((y) => y !== fieldOrder[possibleIdx]);
        }
      });
    }
  }
  return fieldOrder;
}

interface Field {
  label: string;
  value: number;
}

function getMyTicket(data: string[], fieldOrder: string[]): Field[] {
  const ticketData = data
    .filter((x) => x.includes(","))
    .map((x) => x.split(",").map((y) => parseInt(y)))[0];
  const myTicket: Field[] = [];
  for (let i = 0; i < ticketData.length; i++) {
    myTicket.push({ label: fieldOrder[i], value: ticketData[i] });
  }
  return myTicket;
}

function findAnswer(myTicket: Field[]): number {
  let answer = 1;
  for (const field of myTicket) {
    if (field.label.includes("departure")) {
      answer *= field.value;
    }
  }
  return answer;
}

export function solveD16P2() {
  const data = getData();
  const ranges = getRanges(data[0]);
  const nearbyTickets = filterInvalidTickets(getNearbyTickets(data[2]), ranges);
  const fieldOrder = determineFieldOrder(findPossibleFields(nearbyTickets, ranges));
  const myTicket = getMyTicket(data[1], fieldOrder);
  const answer = findAnswer(myTicket);
  console.log(answer);
}

solveD16P2();
