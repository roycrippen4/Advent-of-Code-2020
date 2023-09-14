import { readFileToString } from "../../utilities";

const filepath = "src/data/day10/day10-data.txt";
const testFilepath = "src/data/day10/day10-dataTEST.txt";

const testing = false;

const CACHE: Map<number, number> = new Map();
CACHE.set(1, 2).set(2, 4);

export function solveD10P2() {
  const adapters = fixData(getData());
  console.log(adapters.length);
  const chunks = getChunks(adapters);
  console.log(chunks);
  const answer = findValidCombos(chunks);
  console.log(answer);
  return 0;
}

function getData() {
  const _filepath = testing ? testFilepath : filepath;
  return readFileToString(_filepath)
    .split("\r\n")
    .map((x) => parseInt(x))
    .sort((a, b) => (a == b ? 0 : a < b ? -1 : 1));
}

function fixData(data: number[]) {
  const result = data.reverse();
  result[result.length] = 0;
  result.reverse();
  result[result.length] = result[result.length - 1] + 3;
  return result;
}

function getChunks(adapters: number[]) {
  const chunks: number[][] = [];
  for (let i = 0; i < adapters.length; i++) {
    const chunk: number[] = [];
    let j = i;
    while (adapters[j + 2] - adapters[j] <= 2) {
      chunk.push(adapters[j + 1]);
      j++;
    }
    if (chunk.length >= 1) {
      chunks.push(chunk);
      i = j;
    }
  }
  return chunks;
}

function generatePowerSet(set: number[]) {
  const min = (set[0] - 1).toString();
  const max = (set[set.length - 1] + 1).toString();
  const setSize = set.length;
  const pow_set_size = Math.pow(2, setSize);
  const powerSet: number[][] = [];
  let newSet: number[] = [];

  for (let counter = 0; counter < pow_set_size; counter++) {
    newSet = [];
    for (let i = 0; i < setSize; i++) {
      if ((counter & (1 << i)) > 0) newSet.push(set[i]);
    }
    powerSet.push(newSet);
  }
  return filterPowerSets(
    powerSet.map((x) =>
      `${min},`
        .concat(x.toString())
        .concat("," + max)
        .split(",")
        .filter((s) => s.length !== 0)
        .map((x) => parseInt(x))
    )
  );
}

function validPowerSet(powerSet: number[]) {
  for (let i = 1; i < powerSet.length; i++) {
    if (powerSet[i] - powerSet[i - 1] > 3) return false;
  }
  return true;
}

function filterPowerSets(powerSet: number[][]): number[][] {
  return powerSet.filter((set) => validPowerSet(set));
}

function findValidCombos(chunks: number[][]) {
  let combinations = 1;
  for (const chunk of chunks) {
    if (CACHE.has(chunk.length)) {
      combinations *= <number>CACHE.get(chunk.length);
    } else {
      const set = generatePowerSet(chunk);
      CACHE.set(chunk.length, set.length);
      combinations *= set.length;
    }
  }
  return combinations;
}

/*
IT'S FUCKING POWER SETS!!! The way to solve this is to generate a power set P(S), where the elements e of P(S) comply with the gap rule.

the rules become more complicated when the length of the chunk is greater than the gap size

total = 2
(0) 1, (2)
(0) x, (2)

total = 4
(0) 1, 2, (3)
(0) x, 2, (3)
(0) x, x, (3)
(0) 1, x, (3)

total = 7
(0), 1, x, x, (4) 1
(0), 1, x, 3, (4) 1
(0), 1, 2, x, (4) 1
(0), 1, 2, 3, (4) 1
(0), x, 2, x, (4) 1
(0), x, 2, 3, (4) 1
(0), x, x, 3, (4) 1



total = 13
(0), 1, 2, 3, 4, (5) 1

(0), 1, x, x, 4, (5) 1
(0), 1, x, 3, x, (5) 1
(0), 1, x, 3, 4, (5) 1

(0), 1, 2, x, x, (5) 1
(0), 1, 2, x, 4, (5) 1
(0), 1, 2, 3, x, (5) 1

(0), x, 2, 3, 4, (5) 1
(0), x, 2, 3, x, (5) 1
(0), x, 2, x, 4, (5) 1
(0), x, 2, x, x, (5) 1

(0), x, x, 3, 4, (5) 1
(0), x, x, 3, x, (5) 1


(0), x, x, x, 4, (5) invalid
(0), 1, x, x, x, (5) invalid
(0), x, x, x, x, (5) invalid


total = 23
5 choose 5 = 1
(0), 1, 2, 3, 4, 5, (6)

5 choose 1 = 5
(0), x, 2, 3, 4, 5, (6)
(0), 1, x, 3, 4, 5, (6)
(0), 1, 2, x, 4, 5, (6)
(0), 1, 2, 3, x, 5, (6)
(0), 1, 2, 3, 4, x, (6)

5 choose 2 = 10
(0), x, x, 3, 4, 5, (6)
(0), 1, x, x, 4, 5, (6)
(0), 1, 2, x, x, 5, (6)
(0), 1, 2, 3, x, x, (6)
(0), x, 2, x, 4, 5, (6)
(0), 1, x, 3, x, 5, (6)
(0), 1, 2, x, 4, x, (6)
(0), x, 2, 3, x, 5, (6)
(0), 1, x, 3, 4, x, (6)
(0), x, 2, 3, 4, x, (6)



(0), 1, x, 3, x, x, (6)
(0), 1, x, x, 4, x, (6)
(0), 1, x, 3, x, 5, (6)
(0), x, 2, x, 4, x, (6)
(0), x, 2, x, x, 5, (6)
(0), x, 2, 3, x, x, (6)
(0), x, x, 3, x, 5, (6)
(0), x, x, 3, 4, x, (6)

(0), x, x, x, 4, 5, (7)
(0), 1, x, x, x, 5, (7)
(0), 1, 2, x, x, x, (7)


5 (choose 4)
(0), x, x, 3, x, x, (6)


remove 2:
(0), x, x, 3, 4, 5, 6, (7)
(0), 1, x, x, 4, 5, 6, (7)
(0), 1, 2, x, x, 5, 6, (7)
(0), 1, 2, 3, x, x, 6, (7)
(0), 1, 2, 3, 4, x, x, (7)
(0), x, 2, x, 4, 5, 6, (7)
(0), 1, x, 3, x, 5, 6, (7)
(0), 1, 2, x, 4, x, 6, (7)
(0), 1, 2, 3, x, 5, x, (7)
(0), x, 2, 3, x, 5, 6, (7)
(0), 1, x, 3, 4, x, 6, (7)
(0), 1, 2, x, 4, 5, x, (7)
(0), x, 2, 3, 4, x, 6, (7)
(0), 1, x, 3, 4, 5, x, (7)
(0), x, 2, 3, 4, 5, x, (7)


remove 3:
(0), 1, x, x, 4, 5, x, (7)
(0), 1, x, x, 4, x, 6, (7)

(0), 1, x, 3, 4, x, x, (7)
(0), 1, x, 3, x, 5, x, (7)
(0), 1, x, 3, x, x, 6, (7)

(0), 1, 2, x, 4, x, x, (7)
(0), 1, 2, x, x, 5, x, (7)

(0), x, 2, 3, 4, x, x, (7)
(0), x, 2, 3, x, 5, x, (7)
(0), x, 2, 3, x, x, 6, (7)

(0), x, 2, x, x, 5, 6, (7)
(0), x, 2, x, 4, x, 6, (7)
(0), x, 2, x, 4, 5, x, (7)

(0), x, x, 3, x, 5, 6, (7)
(0), x, x, 3, 4, x, 6, (7)
(0), x, x, 3, 4, 5, x, (7)

(0), x, x, x, 4, 5, 6, (7) - invalid
(0), 1, x, x, x, 5, 6, (7) - invalid
(0), 1, 2, x, x, x, 6, (7) - invalid
(0), 1, 2, 3, x, x, x, (7) - invalid

n choose 3 = (n choose 3) - length / 2?


7 choose 3 =
(0), 1, 2, 3, 4, 5, 6, 7, (8)
(0), 1, 2, 3, 4, 5, 6, 7, (8)
(0), 1, 2, 3, 4, 5, 6, 7, (8)
(0), 1, 2, 3, 4, 5, 6, 7, (8)
(0), 1, 2, 3, 4, 5, 6, 7, (8)
(0), 1, 2, 3, 4, 5, 6, 7, (8)



 */
