import { assertUnreachable, readFileToString } from "../../utilities";

const filepath = "src/data/day12/day12-data.txt";
const testFilepath = "src/data/day12/day12-dataTEST.txt";

const testing = false;

export function solveD12P1() {
  const instructions = getInstructions(getData());
  const ship = new Ship();
  moveShip(ship, instructions);
  const answer = ship.getManhattanDistance();
  console.log(answer);
  return answer;
}

function getData() {
  return readFileToString(testing ? testFilepath : filepath).split("\r\n");
}

class Ship {
  // 0 -> North, 90 -> east, 180 -> south, 270 -> west
  heading: number;
  // positive northSouthPos = north, negative = south.
  northSouthPos: number;
  // positive eastWestPos = east, negative = west.
  eastWestPos: number;

  constructor() {
    this.heading = 90;
    this.northSouthPos = 0;
    this.eastWestPos = 0;
  }

  move(instruction: Instruction): void {
    switch (instruction.type) {
      case "GoNorth":
        this.northSouthPos += instruction.value;
        break;
      case "GoSouth":
        this.northSouthPos -= instruction.value;
        break;
      case "GoEast":
        this.eastWestPos += instruction.value;
        break;
      case "GoWest":
        this.eastWestPos -= instruction.value;
        break;
      case "TurnLeft":
        this.#turnLeft(instruction.value);
        break;
      case "TurnRight":
        this.#turnRight(instruction.value);
        break;
      case "GoForward":
        this.#goForward(instruction.value);
        break;
      default:
        assertUnreachable("hit fallthrough in move method.");
    }
  }

  #goForward(instructionValue: number): void {
    switch (this.heading) {
      case 0:
        this.northSouthPos += instructionValue;
        break;
      case 90:
        this.eastWestPos += instructionValue;
        break;
      case 180:
        this.northSouthPos -= instructionValue;
        break;
      case 270:
        this.eastWestPos -= instructionValue;
        break;
      default:
        assertUnreachable("something went wrong in goForward. Hit the fallthrough.");
    }
  }

  #turnLeft(instructionValue: number): void {
    switch (instructionValue) {
      case 90:
        if (this.heading - 90 < 0) this.heading = 270;
        else this.heading -= 90;
        break;
      case 180:
        if (this.heading - 180 == -90) this.heading = 270;
        else this.heading = Math.abs(this.heading - 180);
        break;
      case 270:
        this.#turnRight(90);
        break;
    }
  }
  #turnRight(instructionValue: number): void {
    switch (instructionValue) {
      case 90:
        if (this.heading + 90 == 360) this.heading = 0;
        else this.heading += 90;
        break;
      case 180:
        switch (this.heading) {
          case 180:
            this.heading = 0;
            break;
          case 270:
            this.heading = 90;
            break;
          default:
            this.heading += 180;
        }
        break;
      case 270:
        this.#turnLeft(90);
        break;
    }
  }

  getManhattanDistance(): number {
    return Math.abs(this.northSouthPos) + Math.abs(this.eastWestPos);
  }
}

/*
Directions are clockwise:
0 = North
90 = East
180 = South
270 = West
 */

enum EInstructionType {
  GoNorth,
  GoSouth,
  GoEast,
  GoWest,
  TurnLeft,
  TurnRight,
  GoForward
}

type InstructionType = keyof typeof EInstructionType;

class Instruction {
  type: InstructionType;
  readonly value: number;

  constructor(string: string) {
    const [type, value] = [string.slice(0, 1), parseInt(string.slice(1))];
    this.type = this.#getInstructionType(type);
    this.value = value;
  }
  #getInstructionType(type: string): InstructionType {
    switch (type) {
      case "N":
        return "GoNorth";
      case "S":
        return "GoSouth";
      case "E":
        return "GoEast";
      case "W":
        return "GoWest";
      case "L":
        return "TurnLeft";
      case "R":
        return "TurnRight";
      case "F":
        return "GoForward";
      default:
        assertUnreachable();
    }
  }
}

function getInstructions(data: string[]): Instruction[] {
  const instructions: Instruction[] = [];
  for (const string of data) {
    instructions.push(new Instruction(string));
  }
  return instructions;
}

function moveShip(ship: Ship, instructions: Instruction[]): void {
  for (const instruction of instructions) {
    ship.move(instruction);
  }
}

solveD12P1();
