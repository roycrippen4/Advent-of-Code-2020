import { readFileToString } from "../../utilities";

const filepath = "src/data/day11/day11-data.txt";
const testFilepath = "src/data/day11/day11-dataTEST.txt";

const testing = false;

const grid = getData();

export function solveD11P1() {
  const seats = getSeats();
  iterateSeats(seats);
  visualize(grid);
  const answer = countSeats(seats);
  console.log(answer);
  return answer;
}

function getData() {
  return readFileToString(testing ? testFilepath : filepath)
    .replaceAll(".", "9")
    .replaceAll("L", "0")
    .split("\r\n")
    .map((s) => s.split("").map((x) => parseInt(x)));
}

function visualize(data: number[][]) {
  for (const line of data) {
    console.log(
      line
        .toString()
        .replaceAll(",", "")
        .replaceAll("9", ".")
        .replaceAll("0", "L")
        .replaceAll("1", "#")
    );
  }
}

class Seat {
  x: number;
  y: number;
  filled: 0 | 1;
  protected tooManyNeighbors: boolean;
  protected noSeatedNeighbors: boolean;
  neighbors: Seat[];

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.filled = 1;
    this.neighbors = [];
    this.tooManyNeighbors = true;
    this.noSeatedNeighbors = false;
  }

  getNeighborCoordinates(): number[][] {
    if (this.x == 0 && this.y == 0) {
      return [
        [0, 1],
        [1, 0],
        [1, 1]
      ];
    }
    if (this.x == 0 && this.y == grid.length - 1) {
      return [
        [0, grid.length - 2],
        [1, grid.length - 1],
        [1, grid.length - 2]
      ];
    }
    if (this.x == grid[0].length - 1 && this.y == 0) {
      return [
        [grid.length - 2, 0],
        [grid.length - 1, 1],
        [grid.length - 2, 1]
      ];
    }
    if (this.x == grid[0].length - 1 && this.y == grid.length - 1) {
      return [
        [grid[0].length - 2, grid.length - 1],
        [grid[0].length - 1, grid.length - 2],
        [grid[0].length - 2, grid.length - 2]
      ];
    }
    if (this.x == 0) {
      return [
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x + 1, this.y],
        [this.x + 1, this.y + 1],
        [this.x, this.y + 1]
      ];
    }
    if (this.x == grid[0].length - 1) {
      return [
        [this.x - 1, this.y],
        [this.x, this.y + 1],
        [this.x, this.y - 1],
        [this.x - 1, this.y - 1],
        [this.x - 1, this.y + 1]
      ];
    }
    if (this.y == 0) {
      return [
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x, this.y + 1],
        [this.x - 1, this.y + 1],
        [this.x + 1, this.y + 1]
      ];
    }
    if (this.y == grid.length - 1) {
      return [
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y - 1]
      ];
    } else {
      return [
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x, this.y + 1],
        [this.x, this.y - 1],
        [this.x - 1, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y + 1],
        [this.x + 1, this.y + 1]
      ];
    }
  }

  #checkNeighbors(): void {
    let count = 0;
    this.neighbors.forEach((neighbor) => (neighbor.filled ? count++ : 0));
    count >= 4 ? (this.tooManyNeighbors = true) : (this.tooManyNeighbors = false);
    this.neighbors.every((neighbor) =>
      neighbor.filled == 0
        ? (this.noSeatedNeighbors = true)
        : (this.noSeatedNeighbors = false)
    );
  }

  #changeSeat(): void {
    if (this.tooManyNeighbors) {
      this.filled = 0;
    } else if (this.noSeatedNeighbors) {
      this.filled = 1;
    }
  }

  public static moveSeats(seats: Seat[]): void {
    seats.forEach((seat) => seat.#checkNeighbors());
    seats.forEach((seat) => seat.#changeSeat());
    seats.forEach((seat) => seat.#updateGrid(seats));
  }

  #updateGrid(seats: Seat[]) {
    seats.forEach((seat) => (grid[seat.y][seat.x] = seat.filled));
  }
}

function getSeats(): Seat[] {
  const seats: Seat[] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] == 0) {
        seats.push(new Seat(j, i));
      }
    }
  }
  getNeighbors(seats);
  return seats;
}

function filterCoordinates(coordinates: number[][]) {
  const newCoordinates: number[][] = [];
  for (const coordinate of coordinates) {
    const [x, y] = coordinate;
    if (grid[y][x] == 9) continue;
    newCoordinates.push(coordinate);
  }
  return newCoordinates;
}

function getNeighbors(seats: Seat[]): void {
  for (const seat of seats) {
    const coordinates = filterCoordinates(seat.getNeighborCoordinates());
    for (const coordinate of coordinates) {
      const neighbor = seats.find(
        (seat) => seat.x == coordinate[0] && seat.y == coordinate[1]
      );
      if (neighbor) {
        seat.neighbors.push(neighbor);
      }
    }
  }
}

function iterateSeats(seats: Seat[]): void {
  let previousState = JSON.stringify(grid);
  Seat.moveSeats(seats);
  let currentState = JSON.stringify(grid);
  while (previousState != currentState) {
    previousState = currentState;
    Seat.moveSeats(seats);
    currentState = JSON.stringify(grid);
  }
}

function countSeats(seats: Seat[]): number {
  let count = 0;
  seats.forEach((seat) => (seat.filled ? count++ : 0));
  return count;
}
