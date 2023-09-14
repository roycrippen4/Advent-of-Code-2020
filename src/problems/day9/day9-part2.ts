import { assertUnreachable, readFileToString } from "../../utilities";

const filepath = "src/data/day9/day9-data.txt";
const testFilepath = "src/data/day9/day9-dataTEST.txt";

const WINDOW_SIZE = 25;

function getData(filepath: string) {
  return readFileToString(filepath)
    .split("\r\n")
    .map((x) => parseInt(x));
}

export function solveD9P2() {
  const data = getData(filepath);
  const answer = findRange(data);
  console.log(answer);
  return answer;
}

// checks if a number in a given slice complies with the given ruleset. if it does not, return the invalid number.
function checkNumber(dataSlice: number[]): number | true {
  const currentNumber = <number>dataSlice.pop();
  for (let i = 0; i < dataSlice.length; i++) {
    for (let j = i + 1; j < dataSlice.length; j++) {
      if (dataSlice[i] + dataSlice[j] == currentNumber) return true;
    }
  }
  return currentNumber;
}

// iterates through all numbers and finds the first invalid number.
function findInvalid(data: number[]): [number, number] {
  for (let i = 0; i < data.length; i++) {
    const result = checkNumber(data.slice(i, i + WINDOW_SIZE + 1));
    if (typeof result == "number") {
      return [result, i + WINDOW_SIZE];
    }
  }
  assertUnreachable("unable to find error.");
}

// find the range of continuous values that sum to the invalid number.
// return the min + max values in that range.
function findRange(data: number[]) {
  // compute invalid number and its idx.
  const [invalidNumber, idx] = findInvalid(data);
  // setSize defines the size of the range of values to check. [1, 2] -> setSize++ -> [1, 2, 3]
  let setSize = 2;
  // dataSlice is the set of numbers up to, but not including, the invalid number.
  const dataSlice = data.slice(0, idx);

  //stupid flag hack because ESLint doesn't allow constant conditions for while loops..
  let flag = true;
  while (flag) {
    // iterate through all possible ranges in the dataset and compute whether sum of the range equals the invalid number.
    for (let i = 0; i < dataSlice.length - setSize + 1; i++) {
      // get range. e.g [1, 2] -> [2, 3] -> [..,..]...
      const range = dataSlice.slice(i, i + setSize);
      // check the sum of the range against the invalid number;
      if (range.reduce((a, b) => a + b, 0) === invalidNumber) {
        const min = range.reduce((a, b) => Math.min(a, b));
        const max = range.reduce((a, b) => Math.max(a, b));
        return min + max;
      }
    }
    setSize++;
  }
  assertUnreachable();
}
