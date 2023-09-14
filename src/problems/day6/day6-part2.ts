import { readFileToString } from "../../utilities";

const filepath = "src/data/day6/day6-data.txt";
const testFilepath = "src/data/day6/day6-dataTEST.txt";

export function solveD6P2() {
  const data = getData(filepath);
  const answer = accumulate(data);
  console.log(answer);
  return answer;
}

function getData(filename: string) {
  return readFileToString(filename)
    .split("\r\n\r\n")
    .map((s) => s.split("\r\n"));
}

function accumulate(array: string[][]): number {
  let answer = 0;
  for (const strArray of array) {
    answer += groupAnswers(strArray);
  }
  return answer;
}

function groupAnswers(array: string[]) {
  if (array.length == 1) return array[0].length;

  const newGroup: string[] = [];
  let j = 1;
  for (let i = 0; j < array.length; i++) {
    newGroup.push(getLikeItems(collectUnique(array[i]), collectUnique(array[j])));
    j++;
  }
  return groupAnswers(newGroup);
}

function collectUnique(string: string): string {
  return [...string].reduce((acc, curr) => {
    return acc.includes(curr) ? acc : acc + curr;
  }, "");
}

function getLikeItems(x: string, y: string) {
  const xSplit = x.split("");
  const ySplit = y.split("");
  let common = "";

  for (const s1 of xSplit) {
    for (const s2 of ySplit) {
      if (s1 == s2) {
        common = common.concat(s1);
      }
    }
  }
  return common;
}
