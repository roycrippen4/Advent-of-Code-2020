import { readFileToString } from "../../utilities";

const filepath = "src/data/day1/day1-data.txt";

function getData(filepath: string): number[] {
  return readFileToString("src/data/day1/day1-data.txt")
    .split("\r\n")
    .map((x) => parseInt(x));
}

export function solveD1P2() {
  const data = getData(filepath);
  for (let i = 0; i < data.length; i++) {
    for (let j = i; j < data.length; j++) {
      if (data[i] + data[j] > 2020) continue;
      for (let k = j; k < data.length; k++) {
        if (data[i] + data[j] + data[k] === 2020) {
          const answer = data[i] * data[j] * data[k];
          console.log(answer);
          return answer;
        }
      }
    }
  }
}
