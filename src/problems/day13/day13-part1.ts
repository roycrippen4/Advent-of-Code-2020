import { assertUnreachable, readFileToString } from "../../utilities";

const filepath = "src/data/day13/day13-data.txt";
const testFilepath = "src/data/day13/day13-dataTEST.txt";

const testing = false;

export function solveD13P1() {
  const data = separateData(getData());
  const timestamp = data[0];
  const busses = [...data.slice(1)];
  const answer = getResults(busses, timestamp);
  console.log(answer);
  return answer;
}

function getData() {
  return readFileToString(testing ? testFilepath : filepath).split("\r\n");
}

function separateData(stringArr: string[]): number[] {
  const result: string[] = [];
  const [timestamp, rest] = [stringArr[0], stringArr[1]];
  result.push(timestamp);
  rest
    .replaceAll("x", "")
    .split(",")
    .filter((s) => s.length !== 0)
    .forEach((s) => result.push(s));
  return result.map((x) => parseInt(x));
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
