import { assertUnreachable, readFileToString } from "../../utilities";

const filepath = "src/data/day13/day13-data.txt";
const testFilepath = "src/data/day13/day13-dataTEST.txt";

const testing = false;

function getData() {
  return readFileToString(testing ? testFilepath : filepath).split("\r\n");
}

function separateData(stringArr: string[]): number[] {
  const result: string[] = [];
  const [timestamp, rest] = [stringArr[0], stringArr[1]];
  result.push(timestamp);
  rest
    .replaceAll("x", "0")
    .split(",")
    .filter((s) => s.length !== 0)
    .forEach((s) => result.push(s));
  return result.map((x) => parseInt(x)).slice(1);
}

function getResults(busses: number[], timestamp: number): number {
  let closest = 500;
  let best = [0, 0];
  for (const buss of busses) {
    const result = simulateBuss(buss, timestamp);
    if (result - timestamp < closest) {
      closest = result - timestamp;
      best = [buss, closest];
    }
  }
  return best.reduce((a, b) => a * b, 1);
}

function simulateBuss(buss: number, timestamp: number): number {
  let result = buss;
  while (result < timestamp) {
    result += buss;
  }
  return result;
}

// function that finds some time t where the first bus leaves at t, the second bus leaves at t + 1, the third bus leaves at t + 2, etc. 
// If a buss is 0, it can leave at any time, and the next non-zero buss leaves t + 1 after the 0 buss.
function findTime(busses: number[]): number {
  let t = 0;
  let step = 1;
  for (let i = 0; i < busses.length; i++) {
    if (busses[i] === 0) continue;
    while ((t + i) % busses[i] !== 0) {
      t += step;
    }
    step *= busses[i];
  }
  return t;
}

export function solveD13P2() {
  const data = separateData(getData());
  console.log(findTime(data));
  return 0;
}

solveD13P2();
