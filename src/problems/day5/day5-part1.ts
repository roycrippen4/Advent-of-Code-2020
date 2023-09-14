import { assertUnreachable, readFileToString } from "../../utilities";

const filepath = "src/data/day5/day5-data.txt";
const testFilepath = "src/data/day5/day5-dataTEST.txt";

const rowReg = /[F, B]{7}/g;
const colReg = /[L, R]{3}/g;

export function solveD5P1() {
  const data = getData(filepath);
  const answer = getMaxID(data);
  console.log(answer);
  return answer;
}

function getMaxID(boardingPasses: string[]): number {
  let maxID = 0;
  for (const boardingPass of boardingPasses) {
    maxID = Math.max(maxID, getID(boardingPass));
  }
  return maxID;
}

function getData(filename: string) {
  return readFileToString(filename).split("\r\n");
}

function getRow(boardingPass: string): number | false {
  const row = boardingPass.match(rowReg);
  if (row == null) return false;
  return parseInt(row.toString().replaceAll("F", "0").replaceAll("B", "1"), 2);
}

function getCol(boardingPass: string): number | false {
  const col = boardingPass.match(colReg);
  if (col == null) return false;
  return parseInt(col.toString().replaceAll("L", "0").replaceAll("R", "1"), 2);
}

function getID(boardingPass: string): number {
  const row = getRow(boardingPass);
  const col = getCol(boardingPass);
  if (row && col !== false) {
    return row * 8 + col;
  }
  assertUnreachable();
}
