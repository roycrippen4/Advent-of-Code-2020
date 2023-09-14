import { assertUnreachable, readFileToString } from "../../utilities";

const filepath = "src/data/day12/day12-data.txt";
const testFilepath = "src/data/day12/day12-dataTEST.txt";

const testing = false;

export function solveD12P2() {
  const instructions = getInstructions(getData());
  const ship = new Ship();
  moveShip(ship, instructions);
  const answer = ship.getManhattanDistance();
  console.log(answer);
  return 0;
}

function getData() {
  return readFileToString(testing ? testFilepath : filepath).split("\r\n");
}

class Ship {
  // positive northSouthPos = north, negative = south.
  shipX: number;
  // positive eastWestPos = east, negative = west.
  shipY: number;
  // need a waypoint to travel towards now.
  waypointX: number;
  waypointY: number;

  constructor() {
    this.shipX = 0;
    this.shipY = 0;
    this.waypointX = 10;
    this.waypointY = 1;
  }

  move(instruction: Instruction): void {
    switch (instruction.type) {
      case "GoNorth":
        this.waypointY += instruction.value;
        break;
      case "GoSouth":
        this.waypointY -= instruction.value;
        break;
      case "GoEast":
        this.waypointX += instruction.value;
        break;
      case "GoWest":
        this.waypointX -= instruction.value;
        break;
      case "TurnLeft":
        this.#rotate(instruction);
        break;
      case "TurnRight":
        this.#rotate(instruction);
        break;
      case "GoToWaypoint":
        this.#goForward(instruction.value);
        break;
      default:
        assertUnreachable("hit fallthrough in move method.");
    }
  }

  #goForward(instructionValue: number): void {
    while (instructionValue > 0) {
        this.shipX += this.waypointX;
      this.shipY += this.waypointY;
      instructionValue--;
    }
  }

  /*
example:
waypoint at 1 northSouth, 10 eastWest

rotateLeft(90) -> -1, 10?
 */

  #rotate(instruction: Instruction): void {
    switch (instruction.type) {
      case "TurnLeft":
        switch (instruction.value) {
          case 90:
            [this.waypointX, this.waypointY] = [-this.waypointY, this.waypointX];
            break;
          case 180:
            [this.waypointX, this.waypointY] = [-this.waypointX, -this.waypointY];
            break;
          case 270:
            [this.waypointX, this.waypointY] = [this.waypointY, -this.waypointX];
            break;
          default:
            assertUnreachable("fail. fallthrough in rotate -> turnLeft branch");
        }
        break;

      case "TurnRight":
        switch (instruction.value) {
          case 90:
            [this.waypointX, this.waypointY] = [this.waypointY, -this.waypointX];
            break;
          case 180:
            [this.waypointX, this.waypointY] = [-this.waypointX, -this.waypointY];
            break;
          case 270:
            [this.waypointX, this.waypointY] = [-this.waypointY, this.waypointX];
            break;
          default:
            assertUnreachable("fail. fallthrough in rotate -> turnRight branch");
        }

        break;
    }
  }

  getManhattanDistance(): number {
    return Math.abs(this.shipX) + Math.abs(this.shipY);
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
  GoToWaypoint
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
        return "GoToWaypoint";
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
