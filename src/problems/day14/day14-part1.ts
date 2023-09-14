import { assertUnreachable, readFileToString } from "../../utilities";

const filepath = "src/data/day14/day14-data.txt";
const testFilepath = "src/data/day14/day14-dataTEST.txt";

const testing = false;

function getData() {
  return readFileToString(testing ? testFilepath : filepath).split("\r\n");
}

function parseMask(string: string): string {
  return string.split(" = ")[1];
}

function getAllAddresses(addresses: string[]): string[] {
  const newAddresses: string[] = [];
  const done = addresses.every((mask) => !mask.includes("X"));
  if (done) {
    return addresses;
  }
  for (const mask of addresses) {
    const split = mask.split("");
    const xIdx = split.indexOf("X");
    if (xIdx !== -1) {
      const newAddress1 = structuredClone(mask).split("");
      const newAddress2 = structuredClone(mask).split("");
      newAddress1[xIdx] = "1";
      newAddress2[xIdx] = "0";
      newAddresses.push(newAddress1.join(""));
      newAddresses.push(newAddress2.join(""));
    }
  }
  return getAllAddresses(newAddresses);
}

function parseMem(string: string) {
  const memSplit = string.split(" = ");
  const match = memSplit[0].match(/\d+/g)![0];
  if (match) {
    const memLoc = parseInt(match).toString(2).padStart(36, "0");
    const memVal = parseInt(memSplit[1]).toString();
    if (memLoc && memVal) {
      return [memLoc, memVal];
    }
  }
  assertUnreachable("paresMem failed");
}

function applyMask(masks: string, memoryLocation: string): string[] {
  const newAddress = memoryLocation.split("");
  const maskSplit = masks.split("");

  for (let i = 0; i < maskSplit.length; i++) {
    if (maskSplit[i] === "0") continue;
    if (maskSplit[i] === "1") newAddress[i] = "1";
    if (maskSplit[i] === "X") newAddress[i] = "X";
  }
  return getAllAddresses([newAddress.join("")]);
}

function executeInstructions(data: string[]) {
  const cache: Map<string, number> = new Map<string, number>();
  let mask = "";
  for (const line of data) {
    if (line.includes("mask")) {
      mask = parseMask(line);
    }
    if (line.includes("mem")) {
      const [address, value] = parseMem(line);
      const maskedAddresses = applyMask(mask, address);
      maskedAddresses.forEach((address) => {
        cache.set(address, parseInt(value));
      });
    }
  }
  return cache;
}

function sumCache(memoryCache: Map<string, number>) {
  let sum = 0;
  for (const [_, value] of memoryCache) {
    sum += value;
  }
  return sum;
}

export function solveD14P1() {
  const data: string[] = getData();
  const cache = executeInstructions(data);
  const answer = sumCache(cache);
  console.log(answer);
  return answer;
}

solveD14P1();
