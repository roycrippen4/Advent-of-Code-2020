import { assertUnreachable, readFileToString } from "../../utilities";

const filepath = "src/data/day14/day14-data.txt";
const testFilepath = "src/data/day14/day14-dataTEST.txt";

const testing = false;

function getData() {
  return readFileToString(testing ? testFilepath : filepath).split("\r\n");
}

function parseMask(mask: string) {
  return mask.split(" = ")[1].split("");
}

function parseMem(mem: string) {
  const memSplit = mem.split(" = ");
  const memLoc = memSplit[0].match(/\d+/g);
  const memVal = parseInt(memSplit[1]).toString(2).padStart(36, "0");
  if (memLoc && memVal) {
    return [memLoc[0], memVal];
  }
  assertUnreachable("paresMem failed");
}

function applyMask(mask: string[], value: string) {
  const newValue = value.split("");
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] !== "X") {
      newValue[i] = mask[i];
    }
  }
  return newValue.join("");
}

function executeInstructions(data: string[]) {
  const memoryCache = new Map<string, string>();
  let mask: string[] = [];
  for (const line of data) {
    if (line.startsWith("mask")) {
      mask = parseMask(line);
    } else {
      const [memLoc, memVal] = parseMem(line);

      if (memoryCache.has(memLoc)) {
        const newMemVal = applyMask(mask, memVal);
        memoryCache.set(memLoc, newMemVal);
      } else {
        memoryCache.set(memLoc, applyMask(mask, memVal));
      }
    }
  }
  return memoryCache;
}

function sumCache(memoryCache: Map<string, string>) {
  let sum = 0;
  for (const [_, value] of memoryCache) {
    sum += parseInt(value, 2);
  }
  return sum;
}

export function solveD14P2() {
  const data: string[] = getData();
  const memoryCache = executeInstructions(data);
  const answer = sumCache(memoryCache);
  console.log(answer);
  return answer;
}

solveD14P2();
