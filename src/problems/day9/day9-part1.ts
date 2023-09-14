import { assertUnreachable, readFileToString } from "../../utilities";

const filepath = "src/data/day9/day9-data.txt";
const testFilepath = "src/data/day9/day9-dataTEST.txt";

const WINDOW_SIZE = 25;

function getData(filepath: string) {
  return readFileToString(filepath)
    .split("\r\n")
    .map((x) => parseInt(x));
}

export function solveD9P1() {
  const data = getData(filepath);
  const answer = findInvalid(data);
  console.log(answer);
  return answer;
}

function findInvalid(data: number[]) {
  for (let i = 0; i < data.length; i++) {
    const result = checkNumber(data.slice(i, i + WINDOW_SIZE + 1));
    if (typeof result == "number") {
      return result;
    }
  }
  assertUnreachable("unable to find error.");
}

function checkNumber(dataSlice: number[]): number | true {
  const currentNumber = <number>dataSlice.pop();
  for (let i = 0; i < dataSlice.length; i++) {
    for (let j = i + 1; j < dataSlice.length; j++) {
      if (dataSlice[i] + dataSlice[j] == currentNumber) return true;
    }
  }
  return currentNumber;
}
