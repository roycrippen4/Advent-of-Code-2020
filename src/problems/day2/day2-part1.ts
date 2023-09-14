import { readFileToString } from "../../utilities";

export function solveD2P1() {
  const data = parseData(getData("src/data/day2/day2-data.txt"));
  let count = 0;
  data.forEach((p) => {
    if (isValid(p.char, p.pass, p.min, p.max)) {
      count++;
    }
  });
  console.log(count);
  return count;
}

function getData(filepath: string) {
  return readFileToString(filepath).split("\r\n");
}

interface Password {
  char: string;
  pass: string;
  min: number;
  max: number;
}

function parseData(data: string[]) {
  const raw = data.map((s) =>
    s.split(" ").map((s) => {
      return s.replaceAll(":", "").split("-");
    })
  );
  const result: Password[] = [];

  for (const array of raw) {
    result.push({
      char: array[1][0],
      pass: array[2][0],
      min: parseInt(array[0][0]),
      max: parseInt(array[0][1])
    });
  }

  return result;
}

function isValid(char: string, string: string, min: number, max: number): boolean {
  if (string.includes(char)) {
    let count = 0;
    string.split("").forEach((c) => (c === char ? count++ : 0));
    return min <= count && count <= max;
  }
  return false;
}
