import { assertUnreachable, readFileToString } from "../../utilities";
const filepath = "src/data/day4/day4-data.txt";
const testFilepath = "src/data/day4/day4-dataTEST.txt";

const byrReg = /byr:19[2-9][0-9]|200[0-9]/g;
const eclReg = /ecl:(amb|blu|brn|gry|grn|hzl|oth)/g;
const eyrReg = /eyr:202[0-9]|2030/g;
const hclReg = /hcl:#[0-9|a-f]{6}/g;
const hgtReg = /hgt:(59in|6[0-9]in|7[0-6]in)|(1[5-8][0-9]cm|19[0-3]cm)/g;
const iyrReg = /iyr:201[0-9]|2020/g;
const pidReg = /pid:[0-9]{9}/g;

const DEBUG = false;

export function solveD4P2() {
  const batchFile = getData(filepath);
  const answer = parse(batchFile);
  console.log(answer);
  return 224;
}

function getData(filepath: string) {
  return readFileToString(filepath)
    .split("\r\n\r\n")
    .map((s) => s.replaceAll("\r\n", " ").replaceAll("  ", " "));
}

function parse(batchFile: string[]) {
  let count = 0;
  for (const passport of batchFile) {
    if (validate(passport)) count++;
  }
  return count - 1;
}

interface Check {
  field: string;
  bool: boolean;
}

function validate(passport: string): boolean {
  const split = passport.split(" ").filter((s) => s.length !== 0);
  const check: Check[] = [];

  for (const field of split) {
    const start = field.slice(0, 3);
    switch (start) {
      case "byr":
        if (field.match(byrReg) === null) {
          if (DEBUG) {
            console.log("FAILED");
            console.log("\tstring: ", `${passport}`);
            console.log("\tbyr check: ", `${field}`, "\n");
          }
          return false;
        }
        check.push({ field: field, bool: true });
        break;
      case "iyr":
        if (field.match(iyrReg) === null) {
          if (DEBUG) {
            console.log("FAILED");
            console.log("\tstring: ", `${passport}`);
            console.log("\tiyr check: ", `${field}`, "\n");
          }
          return false;
        }
        check.push({ field: field, bool: true });
        break;
      case "eyr":
        if (field.match(eyrReg) === null) {
          if (DEBUG) {
            console.log("FAILED");
            console.log("\tstring: ", `${passport}`);
            console.log("\teyr check: ", `${field}`, "\n");
          }
          return false;
        }
        check.push({ field: field, bool: true });
        break;
      case "hgt":
        if (field.match(hgtReg) === null) {
          if (DEBUG) {
            console.log("FAILED");
            console.log("\tstring: ", `${passport}`);
            console.log("\thgt check: ", `${field}`, "\n");
          }
          return false;
        }
        check.push({ field: field, bool: true });
        break;
      case "hcl":
        if (field.match(hclReg) === null) {
          if (DEBUG) {
            console.log("FAILED");
            console.log("\tstring: ", `${passport}`);
            console.log("\thcl check: ", `${field}`, "\n");
          }
          return false;
        }
        check.push({ field: field, bool: true });
        break;
      case "ecl":
        if (field.match(eclReg) === null) {
          if (DEBUG) {
            console.log("FAILED");
            console.log("\tstring: ", `${passport}`);
            console.log("\tecl check: ", `${field}`, "\n");
          }
          return false;
        }
        check.push({ field: field, bool: true });
        break;
      case "pid":
        if (field.match(pidReg) === null) {
          if (DEBUG) {
            console.log("FAILED");
            console.log("\tstring: ", `${passport}`);
            console.log("\tpid check: ", `${field}`, "\n");
          }
          return false;
        }
        check.push({ field: field, bool: true });
        break;
      case "cid":
        break;
      default:
        if (DEBUG) {
          console.log("fallthrough on switch", split);
        }
        return false;
    }
  }
  if (DEBUG) {
    console.log(check);
  }
  return check.length === 7;
}
