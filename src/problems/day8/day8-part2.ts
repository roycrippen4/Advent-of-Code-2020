import { assertUnreachable, readFileToString } from "../../utilities";

const filepath = "src/data/day8/day8-data.txt";
const testFilepath = "src/data/day8/day8-dataTEST.txt";

const SWAPS: Map<number, Instruction> = new Map();

function getData(filepath: string) {
  return readFileToString(filepath)
    .split("\r\n")
    .map((s) => {
      const split = s.split(" ");
      return [split[0], parseInt(split[1]), 0];
    });
}

export function solveD8P2() {
  const instructions = getInstructions(getData(filepath));
  const answer = correctError(instructions);
  console.log(answer);
  return answer;
}

interface Instruction {
  type: string;
  value: number;
  runs: number;
}

function getInstructions(data: (string | number)[][]): Instruction[] {
  const instructions: Instruction[] = [];
  for (const code of data) {
    switch (code[0]) {
      case "nop":
        instructions.push({ type: "nop", value: <number>code[1], runs: <number>code[2] });
        break;
      case "acc":
        instructions.push({ type: "acc", value: <number>code[1], runs: <number>code[2] });
        break;
      case "jmp":
        instructions.push({ type: "jmp", value: <number>code[1], runs: <number>code[2] });
        break;
    }
  }
  instructions.push({ type: "end", value: 0, runs: 0 });
  return instructions;
}

function runInstructions(instructions: Instruction[]): number | false {
  let accumulator = 0;
  let idx = 0;

  while (instructions.every((instruction) => instruction.runs !== 2)) {
    switch (instructions[idx].type) {
      case "nop":
        idx++;
        instructions[idx].runs++;
        break;
      case "acc":
        accumulator += instructions[idx].value;
        idx++;
        instructions[idx].runs++;
        break;
      case "jmp":
        idx += instructions[idx].value;
        instructions[idx].runs++;
        break;
      case "end":
        return accumulator;
    }
  }
  return false;
}

function swap(original: Instruction[], swapIdx: number) {
  if (SWAPS.has(swapIdx)) {
    assertUnreachable("duplicate swapIdx");
  }

  const newInstructions = structuredClone(original);

  switch (newInstructions[swapIdx].type) {
    case "jmp":
      SWAPS.set(swapIdx, newInstructions[swapIdx]);
      newInstructions[swapIdx].type = "nop";
      return newInstructions;
    case "nop":
      SWAPS.set(swapIdx, newInstructions[swapIdx]);
      newInstructions[swapIdx].type = "nop";
      return newInstructions;
  }

  assertUnreachable("Swap function did not return properly.");
}

function findAllNops(instructions: Instruction[]): number[] {
  const nops: number[] = [];
  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i].type == "nop") {
      nops.push(i);
    }
  }
  return nops;
}

function findAllJmps(instructions: Instruction[]): number[] {
  const jmps: number[] = [];
  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i].type == "jmp") {
      jmps.push(i);
    }
  }
  return jmps;
}

function trySwapNops(instructions: Instruction[]): number | false {
  const nops = findAllNops(instructions);

  for (const nop of nops) {
    const newInstructions = swap(instructions, nop);
    const result = runInstructions(newInstructions);
    if (result) {
      return result;
    }
  }
  return false;
}

function trySwapJmps(instructions: Instruction[]): number | false {
  const jmps = findAllJmps(instructions);

  for (const jmp of jmps) {
    const newInstructions = swap(instructions, jmp);
    const result = runInstructions(newInstructions);
    if (result) {
      return result;
    }
  }
  return false;
}

function correctError(instructions: Instruction[]): number {
  const swapJmpResult = trySwapJmps(instructions);
  if (swapJmpResult) {
    return swapJmpResult;
  }
  const swapNopResult = trySwapNops(instructions);
  if (swapNopResult) {
    return swapNopResult;
  }

  assertUnreachable("could not correct error.");
}
