import { readFileToString } from "../../utilities";

const filepath = "src/data/day7/day7-data.txt";
const testFilepath = "src/data/day7/day7-dataTEST.txt";

function getData(filepath: string) {
  return readFileToString(filepath);
}

export function solveD7P2() {
  const answer = goThroughBags();
  console.log(answer);
  return answer;
}

function parse(text: string) {
  const bagRules = {};
  const textByLine = text.split("\n").map((x) => {
    x = x.split("bags").join("");
    x = x.split("bag").join("");

    const split = x.split("contain");
    const containSplit = split[0];
    const bagsSplit = split[1].replace(".", "").split(",");
    const bagContents: string[] = [];

    bagsSplit.forEach((x) => {
      const howMany = parseInt(x.trim().substring(0, 1));
      for (let i = 0; i < howMany; i++) {
        bagContents.push(x.trim().substring(2, x.length));
      }
    });
    bagRules[containSplit.trim()] = bagContents;
  });
  return bagRules;
}

function getNextLevel(currentLevel: string[], bagRules: object) {
  let nextLevel: string[] = [];

  currentLevel.forEach((bag) => {
    nextLevel = nextLevel.concat(bagRules[bag]);
  });

  return nextLevel;
}

function goThroughBags() {
  const bagRules = parse(getData(filepath));
  let currentLevel: string[] = bagRules["shiny gold"];
  let numberInside = currentLevel.length;

  let flag = true;
  while (flag) {
    if (currentLevel.length > 0) {
      currentLevel = getNextLevel(currentLevel, bagRules);
      numberInside += currentLevel.length;
    } else break;
  }
  return numberInside;
}
