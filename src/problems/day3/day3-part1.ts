import { readFileToString } from "../../utilities";

const filepath = "src/data/day3/day3-data.txt";
const testFilepath = "src/data/day3/day3-dataTEST.txt";

const xVel = 3;
const yVel = 1;

export function solveD3P1() {
  const map = buildMap(getData(filepath));
  const answer = countTrees(map);
  console.log(answer);
  return answer;
}

function getData(filepath: string) {
  return readFileToString(filepath)
    .replaceAll(".", "0")
    .replaceAll("#", "1")
    .split("\r\n")
    .map((s) => s.split("").map((c) => parseInt(c)));
}

function calculateTileAmount(xVelocity: number, tile: number[][]): number {
  return xVelocity * tile[0].length;
}

function addTiles(totalTiles: number, tile: number[][]): number[][] {
  let map: number[][] = structuredClone(tile);
  totalTiles--;
  while (totalTiles !== 0) {
    map = map.map((array, idx) => array.concat(tile[idx]));
    totalTiles--;
  }
  return map;
}

function buildMap(data: number[][]): number[][] {
  const numberOfTiles = calculateTileAmount(xVel, data);
  return addTiles(numberOfTiles, data);
}

function countTrees(map: number[][]): number {
  let count = 0;
  let y = 0;
  let x = 0;
  while (y < map.length) {
    if (map[y][x] == 1) count++;
    y += yVel;
    x += xVel;
  }
  return count;
}

function visualize(data: number[][]) {
  for (const line of data) {
    console.log(
      line.toString().replaceAll(",", "").replaceAll("0", ".").replaceAll("1", "#")
    );
  }
}
