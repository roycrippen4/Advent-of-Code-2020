import { readFileToString } from "../../utilities";

const filepath = "src/data/day8/day8-data.txt";
const testFilepath = "src/data/day8/day8-dataTEST.txt";

function getData(filepath: string) {
  return readFileToString(filepath)
    .split("\r\n")
    .map((s) => {
      const split = s.split(" ");
      return [split[0], parseInt(split[1]), 0];
    });
}

export function solveD8P1() {
  const instructions = getInstructions(getData(filepath));
  const answer = runInstructions(instructions);
  console.log(answer);
  return answer;
}

function runInstructions(instructions: Instruction[]): number {
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
    }
  }
  return accumulator;
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
  return instructions;
}
