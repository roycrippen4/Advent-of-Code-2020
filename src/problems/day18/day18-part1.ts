import { assertUnreachable, readFileToString } from "../../utilities";

const filepath = "src/data/day18/day18-data.txt";
const testFilepath = "src/data/day18/day18-dataTEST.txt";

const testing = false;

function getData() {
  return readFileToString(testing ? testFilepath : filepath).split("\r\n");
}

const reg = /\(([^()]+)\)/gm;

function applyOperation(total: number, split: string[]): number {
  const operand = split[0];
  const arg = parseInt(split[1], 10);

  switch (operand) {
    case "+":
      return total + arg;
    case "*":
      return total * arg;
    default:
      assertUnreachable(operand);
  }
}

function compute(string: string) {
  let result = 0;
  const reg = /(\d+|\*|\+|\S+)/g;
  const split = string.split(reg).filter((x) => x !== "" && x !== " ");

  if (split.length === 1) {
    return split[0];
  }

  while (split.length > 0) {
    if (result === 0) {
      result = parseInt(split[0], 10);
      split.shift();
    }
    const slice = split.slice(0, 2);
    result = applyOperation(result, slice);
    split.splice(0, 2);
  }
  return result.toString();
}

function computeLine(line: string) {
  while (line.includes("(")) {
    line = line.replace(reg, (_, p1) => {
      return compute(p1);
    });
  }
  return compute(line);
}

function computeAnswer(data: string[]) {
  let total = 0;
  for (const line of data) {
    const result = parseInt(computeLine(line), 10);
    // console.log(result);
    total += result;
  }
  return total;
}

function solveD18P1() {
  const data = getData();
  const answer = computeAnswer(data);
  console.log(`Day 18 Part 1 Answer: ${answer}`);
}

solveD18P1();
