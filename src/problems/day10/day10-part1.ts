import { assertUnreachable, readFileToString } from "../../utilities";

import { Queue as q } from "datastructures-js";

const filepath = "src/data/day10/day10-data.txt";
const testFilepath = "src/data/day10/day10-dataTEST.txt";

const testing = false;

function getData() {
  const _filepath = testing ? testFilepath : filepath;
  return readFileToString(_filepath)
    .split("\r\n")
    .map((x) => parseInt(x))
    .sort((a, b) => (a == b ? 0 : a < b ? -1 : 1));
}

export function solveD10P1() {
  const adapters = q.fromArray<number>(getData());
  const answer = tryAllAdapters(adapters);
  console.log(answer);
  return answer;
}

const cache = { ones: 0, threes: 0 };

function nextAdapter(currentJolts: number, adapters: q<number>): number {
  const next = adapters.pop();
  switch (next - currentJolts) {
    case 1:
      cache.ones++;
      currentJolts++;
      return currentJolts;
    case 3:
      cache.threes++;
      currentJolts += 3;
      return currentJolts;
  }
  assertUnreachable();
}

function tryAllAdapters(adapters: q<number>): number {
  let currentJolts = 0;
  while (adapters.size() > 0) {
    currentJolts = nextAdapter(currentJolts, adapters);
  }
  cache.threes++;
  return cache.ones * cache.threes;
}
