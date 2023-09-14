import { readFileToString } from "../../utilities";
const filepath = "src/data/day4/day4-data.txt";
const testFilepath = "src/data/day4/day4-dataTEST.txt";

const REQUIRED_FIELDS = ["byr", "ecl", "eyr", "hcl", "hgt", "iyr", "pid"];
const CHECK = "byrecleyrhclhgtiyrpid";

export function solveD4P1() {
  const batchFile = parseData(getData(filepath));
  console.log(batchFile.length);
  return batchFile.length;
}

function getData(filepath: string) {
  return readFileToString(filepath)
    .split("\r\n\r\n")
    .map((s) => s.replaceAll("\r\n", " "));
}

function parseData(data: string[]) {
  return data
    .map((s) =>
      s
        .split(":")
        .map((s) => s.split(" "))
        .flat()
        .filter((s) => REQUIRED_FIELDS.includes(s))
    )
    .map((array) => array.sort().reduce((prev, curr) => prev.concat(curr)))
    .filter((s) => s == CHECK);
}
