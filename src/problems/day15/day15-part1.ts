import { Pair, readFileToString } from "../../utilities";

const filepath = "src/data/day15/day15-data.txt";
const testFilepath = "src/data/day15/day15-dataTEST.txt";

const testing = false;

function getData() {
  return readFileToString(testing ? testFilepath : filepath)
    .split(",")
    .map((x) => parseInt(x));
}

interface IDictionary<TValue> {
  [id: number]: TValue;
}

function compute(numbers: number[], turns: number): number {
  const prevSeen: IDictionary<number[]> = {};
  let n = 0;

  for (let turn = 0; turn < turns; turn++) {
    if (turn < numbers.length) {
      n = numbers[turn];
    } else if (prevSeen[n].length == 1) {
      n = 0;
    } else {
      n = prevSeen[n].at(-1)! - prevSeen[n].at(-2)!;
    }
    prevSeen[n] ? prevSeen[n].push(turn) : (prevSeen[n] = [turn]);
  }
  return n;
}

export function solveD15P1() {
  const data: number[] = getData();
  const answer = compute(data, 2020);
  console.log(answer);
  return answer;
}

solveD15P1();
