import { readFileToString } from "../../utilities";

const filepath = "src/data/day11/day11-data.txt";
const testFilepath = "src/data/day11/day11-dataTEST.txt";

const testing = false;

const grid = getData();

export function solveD11P2() {
  const seats = getSeats();
  iterateSeats(seats);
  const answer = countSeats(seats);
  console.log(answer);
  return 0;
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

type State = {
  x: number;
  y: number;
  filled: 0 | 1;
};

class Seat {
  state: State;
  protected tooManyNeighbors: boolean;
  protected noSeatedNeighbors: boolean;
  neighbors: Seat[];

  constructor(x: number, y: number) {
    this.state = { x: x, y: y, filled: 1 };
    this.neighbors = [];
    this.tooManyNeighbors = true;
    this.noSeatedNeighbors = false;
  }

  getNeighborCoordinates(): number[][] {
    const neighborCoordinates: number[][] = [];

    const up = this.#findUpperNeighbor();
    const down = this.#findLowerNeighbor();
    const left = this.#findLeftNeighbor();
    const right = this.#findRightNeighbor();
    const upLeft = this.#findUpperLeftNeighbor();
    const upRight = this.#findUpperRightNeighbor();
    const downLeft = this.#findLowerLeftNeighbor();
    const downRight = this.#findLowerRightNeighbor();

    if (up) neighborCoordinates.push(up);
    if (down) neighborCoordinates.push(down);
    if (left) neighborCoordinates.push(left);
    if (right) neighborCoordinates.push(right);
    if (upLeft) neighborCoordinates.push(upLeft);
    if (upRight) neighborCoordinates.push(upRight);
    if (downLeft) neighborCoordinates.push(downLeft);
    if (downRight) neighborCoordinates.push(downRight);

    return neighborCoordinates;
  }

  #findLowerLeftNeighbor(): number[] | false {
    if (this.state.x !== 0 && this.state.y !== grid.length - 1) {
      let i = this.state.x - 1;
      let j = this.state.y + 1;
      while (i >= 0 && j <= grid.length - 1) {
        if (grid[j][i] == 0) return [i, j];
        i--;
        j++;
      }
    }
    return false;
  }

  #findLowerRightNeighbor(): number[] | false {
    if (this.state.x !== grid.length - 1 && this.state.y !== grid.length - 1) {
      let i = this.state.x + 1;
      let j = this.state.y + 1;
      while (i <= grid.length - 1 && j <= grid.length - 1) {
        if (grid[j][i] == 0) return [i, j];
        i++;
        j++;
      }
    }
    return false;
  }

  #findUpperLeftNeighbor(): number[] | false {
    if (this.state.x !== 0 && this.state.y !== 0) {
      let i = this.state.x - 1;
      let j = this.state.y - 1;
      while (i >= 0 && j >= 0) {
        if (grid[j][i] == 0) return [i, j];
        i--;
        j--;
      }
    }
    return false;
  }

  #findUpperRightNeighbor(): number[] | false {
    if (this.state.x !== grid.length - 1 && this.state.y !== 0) {
      let i = this.state.x + 1;
      let j = this.state.y - 1;
      while (i <= grid.length - 1 && j >= 0) {
        if (grid[j][i] == 0) return [i, j];
        i++;
        j--;
      }
    }
    return false;
  }

  #findLowerNeighbor(): number[] | false {
    if (this.state.y !== grid.length - 1) {
      let j = this.state.y + 1;
      while (j <= grid.length - 1) {
        if (grid[j][this.state.x] == 0) return [this.state.x, j];
        j++;
      }
    }
    return false;
  }

  #findUpperNeighbor(): number[] | false {
    if (this.state.y !== 0) {
      let j = this.state.y - 1;
      while (j >= 0) {
        if (grid[j][this.state.x] == 0) return [this.state.x, j];
        j--;
      }
    }
    return false;
  }

  #findRightNeighbor(): number[] | false {
    if (this.state.x !== grid.length - 1) {
      let j = this.state.x + 1;
      while (j <= grid.length - 1) {
        if (grid[this.state.y][j] == 0) return [j, this.state.y];
        j++;
      }
    }
    return false;
  }

  #findLeftNeighbor(): number[] | false {
    if (this.state.x !== 0) {
      let j = this.state.x - 1;
      while (j >= 0) {
        if (grid[this.state.y][j] == 0) return [j, this.state.y];
        j--;
      }
    }
    return false;
  }

  #checkNeighbors(): void {
    let count = 0;
    this.neighbors.forEach((neighbor) => (neighbor.state.filled ? count++ : 0));
    count >= 5 ? (this.tooManyNeighbors = true) : (this.tooManyNeighbors = false);
    this.neighbors.every((neighbor) =>
      neighbor.state.filled == 0
        ? (this.noSeatedNeighbors = true)
        : (this.noSeatedNeighbors = false)
    );
  }

  #changeSeat(): void {
    if (this.tooManyNeighbors) {
      this.state.filled = 0;
    } else if (this.noSeatedNeighbors) {
      this.state.filled = 1;
    }
  }

  public static moveSeats(seats: Seat[]): void {
    seats.forEach((seat) => seat.#checkNeighbors());
    seats.forEach((seat) => seat.#changeSeat());
    // seats.forEach((seat) => seat.#updateGrid(seats));
  }

  #updateGrid(seats: Seat[]) {
    seats.forEach((seat) => (grid[seat.state.y][seat.state.x] = seat.state.filled));
  }

  showNeighbors(): void {
    const clone = structuredClone(grid);
    this.neighbors.forEach((n) => (clone[n.state.y][n.state.x] = 5));
    clone[this.state.y][this.state.x] = 1;

    for (const line of clone) {
      console.log(
        line
          .toString()
          .replaceAll(",", "")
          .replaceAll("9", ".")
          .replaceAll("0", "L")
          .replaceAll("1", "#")
          .replaceAll("5", "X")
      );
    }
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

function getNeighbors(seats: Seat[]): void {
  for (const seat of seats) {
    const coordinates = seat.getNeighborCoordinates();
    for (const coordinate of coordinates) {
      const neighbor = seats.find(
        (seat) => seat.state.x == coordinate[0] && seat.state.y == coordinate[1]
      );
      if (neighbor) {
        seat.neighbors.push(neighbor);
      }
    }
  }
}

function getState(seats: Seat[]): string {
  let state = "";
  seats.forEach((seat) => (state = state.concat(JSON.stringify(seat.state))));
  return state;
}

function iterateSeats(seats: Seat[]): void {
  let previousState = getState(seats);
  Seat.moveSeats(seats);
  let currentState = getState(seats);
  while (previousState != currentState) {
    previousState = currentState;
    Seat.moveSeats(seats);
    currentState = getState(seats);
  }
}

function countSeats(seats: Seat[]): number {
  let count = 0;
  seats.forEach((seat) => (seat.state.filled ? count++ : 0));
  return count;
}
