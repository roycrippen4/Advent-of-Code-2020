import { readFileToString } from "../../utilities";

const filepath = "src/data/day6/day6-data.txt";
const testFilepath = "src/data/day6/day6-dataTEST.txt";

export function solveD6P1() {
  const data = getData(filepath);
  const answer = accumulate(data);
  console.log(answer);
  return answer;
}

function getData(filename: string) {
  return readFileToString(filename)
    .split("\r\n\r\n")
    .map((s) => s.replaceAll("\r\n", ""));
}

function countUnique(string: string): number {
  return [...string].reduce((acc, curr) => {
    return acc.includes(curr) ? acc : acc + curr;
  }, "").length;
}

function accumulate(groups: string[]): number {
  let count = 0;
  groups.forEach((s) => (count += countUnique(s)));
  return count;
}
