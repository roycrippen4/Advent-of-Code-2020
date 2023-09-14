import { readFileToString } from "../../utilities";

const filepath = "src/data/day18/day18-data.txt";
const testFilepath = "src/data/day18/day18-dataTEST.txt";

const testing = true;

function getData() {
  return readFileToString(testing ? testFilepath : filepath);
}

function solveD18P2() {
  const data = getData();
  console.log(data);
}

solveD18P2();
