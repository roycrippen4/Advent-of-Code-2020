import { assertUnreachable, readFileToString } from "../../utilities";

const filepath = "src/data/day18/day18-data.txt";
const testFilepath = "src/data/day18/day18-dataTEST.txt";

const testing = true;

function getData() {
  return readFileToString(testing ? testFilepath : filepath);
}

enum operationType {
  ADD = "+",
  MULTIPLY = "*",
  UNKNOWN = "UNKNOWN"
}

interface Operation {
  arg1: number | Operation;
  type: operationType;
  arg2: number | Operation;
}

function parseParenGroups(line: string[]): string[][] {
  let clone = [...line];
  const groups: string[][] = [];
  let group: string[] = [];
  for (let i = 0; i < clone.length; i++) {
    const char = clone[i];
    switch (char) {
      case "(":
        clone.shift();
        i--;
        break;
      case ")":
        groups.push(group);
        const nextChar = clone[i + 1];
        if (nextChar && isOperator(nextChar)) {
          groups.push([nextChar]);
          clone = clone.slice(i + 2);
          i = -1;
        }

        group = [];
        break;
      default:
        group.push(char);
    }
  }
  groups.push(group);
  return groups;
}

function isOperator(char: string): boolean {
  return char === "+" || char === "*";
}

function isOperation(arg: number | Operation): boolean {
  return typeof arg === "object";
}

function getOperatorType(char: string): operationType {
  switch (char) {
    case "+":
      return operationType.ADD;
    case "*":
      return operationType.MULTIPLY;
    default:
      throw new Error("Invalid operator type");
  }
}

function evaluateOperation(arg1: number, operator: operationType, arg2: number) {
  switch (operator) {
    case operationType.ADD:
      return arg1 + arg2;
    case operationType.MULTIPLY:
      return arg1 * arg2;
    default:
      throw new Error("Invalid operator type");
  }
}

function evaluateGroup(group: string[], result?: number): number {
  if (group.length === 0) {
    if (result === undefined) {
      throw new Error("Invalid group");
    }
    return result;
  }
  if (result && isOperator(group[0])) {
    const operator = getOperatorType(group[0]);
    const arg2 = parseInt(group[1]);
    const newGroup = group.slice(2);
    return evaluateGroup(newGroup, evaluateOperation(result, operator, arg2));
  } else {
    const arg1 = parseInt(group[0]);
    const newGroup = group.slice(1);
    return evaluateGroup(newGroup, arg1);
  }
}

function evaluate(groups: string[][]) {
  const newGroup: string[] = [];
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    if (group.length === 1) {
      newGroup.push(group[0]);
    } else {
      const result = evaluateGroup(group);
      newGroup.push(result.toString());
    }
  }
  return evaluateGroup(newGroup);
}

function solveD18P1() {
  const data = getData();
  const parsed = parseParenGroups(
    data.split("").filter((char) => {
      return char.length !== 0 && char !== " ";
    })
  );
  console.log(evaluate(parsed));
  // console.log(JSON.stringify(parseGroups(parsed)));
}

solveD18P1();
