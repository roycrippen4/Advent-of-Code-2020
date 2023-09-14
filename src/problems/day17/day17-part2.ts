import { readFileToString } from "../../utilities";

const filepath = "src/data/day17/day17-data.txt";
const testFilepath = "src/data/day17/day17-dataTEST.txt";

const testing = false;

// rules:
// - If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active.
//  Otherwise, the cube becomes inactive.
// - If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active.

function getData() {
  return readFileToString(testing ? testFilepath : filepath)
    .split("\r\n")
    .map((row) => row.replaceAll(".", "0").replaceAll("#", "1").split(""))
    .map((row) => row.map((col) => parseInt(col)));
}

class Cube {
  x: number;
  y: number;
  z: number;
  w: number;
  active: boolean;
  neighbors: { x: number; y: number; z: number; w: number }[]; // 26 neighbors

  constructor(x: number, y: number, z: number, w: number, active: boolean) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.active = active;
    this.neighbors = this.getNeighbors();
  }

  getNeighbors() {
    const neighbors: { x: number; y: number; z: number; w: number }[] = [];
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        for (let k = -1; k < 2; k++) {
          for (let l = -1; l < 2; l++) {
            if (i === 0 && j === 0 && k === 0 && l === 0) continue;
            neighbors.push({
              x: this.x + i,
              y: this.y + j,
              z: this.z + k,
              w: this.w + l
            });
          }
        }
      }
    }
    return neighbors;
  }
}

class Cubes {
  cubes: Cube[];
  constructor(center: number[][]) {
    this.cubes = [];
    this.#convertCenter(center);
  }

  #convertCenter(center: number[][]): void {
    const off = Math.floor(center.length / 2);

    for (let i = 0; i < center.length; i++) {
      for (let j = 0; j < center[i].length; j++) {
        this.addCube(new Cube(j - off, off - i, 0, 0, center[i][j] === 1));
      }
    }
    this.#neighborsToCubes();
  }

  addCube(cube: Cube): void {
    this.cubes.push(cube);
  }

  #neighborsToCubes(): void {
    const neighbors: { x: number; y: number; z: number; w: number }[] = [];
    this.cubes.forEach((cube: Cube) => {
      cube.neighbors.forEach(
        (neighbor: { x: number; y: number; z: number; w: number }) => {
          if (
            !neighbors.some(
              (n) =>
                n.x === neighbor.x &&
                n.y === neighbor.y &&
                n.z === neighbor.z &&
                n.w === neighbor.w
            )
          ) {
            neighbors.push(neighbor);
          }
        }
      );
    });
    neighbors.forEach((neighbor: { x: number; y: number; z: number; w: number }) => {
      if (!this.getCube(neighbor.x, neighbor.y, neighbor.z, neighbor.w)) {
        this.addCube(new Cube(neighbor.x, neighbor.y, neighbor.z, neighbor.w, false));
      }
    });
  }

  cycle(totalCycles: number): void {
    for (let i = 0; i < totalCycles; i++) {
      this.#removeInactiveCubes();
      this.#neighborsToCubes();
      this.#calculateNextState();
    }
  }

  #removeInactiveCubes() {
    this.cubes = this.cubes.filter((cube: Cube) => cube.active);
  }

  #calculateNextState() {
    const cubesThatChange: Cube[] = this.cubes.filter((cube: Cube) =>
      this.#doesCubeStateChange(cube)
    );

    // for (const cube of this.cubes) {
    //   if (this.#doesCubeStateChange(cube)) {
    //     cubesThatChange.push(cube);
    //   }
    // }
    for (const cube of cubesThatChange) {
      cube.active = !cube.active;
    }
  }

  #doesCubeStateChange(cube: Cube) {
    const activeNeighbors = this.#findActiveNeighbors(cube);
    switch (cube.active) {
      case true:
        return !(activeNeighbors.length === 2 || activeNeighbors.length === 3);
      case false:
        return activeNeighbors.length === 3;
    }
  }

  count(): number {
    return this.cubes.filter((cube: Cube) => cube.active).length;
  }

  #findActiveNeighbors(cube: Cube) {
    const neighbors: Cube[] = [];
    for (const neighbor of cube.neighbors) {
      const n = this.getCube(neighbor.x, neighbor.y, neighbor.z, neighbor.w);
      if (n) neighbors.push(n);
    }
    return neighbors.filter((cube: Cube) => cube.active);
  }

  getCube(x: number, y: number, z: number, w: number): Cube | undefined {
    return this.cubes.find(
      (cube: Cube) => cube.x === x && cube.y === y && cube.z === z && cube.w === w
    );
  }

  printCubes(): void {
    const xMin = Math.min(...cubes.cubes.map((cube: Cube) => cube.x));
    const xMax = Math.max(...cubes.cubes.map((cube: Cube) => cube.x));
    const yMin = Math.min(...cubes.cubes.map((cube: Cube) => cube.y));
    const yMax = Math.max(...cubes.cubes.map((cube: Cube) => cube.y));
    const zMin = Math.min(...cubes.cubes.map((cube: Cube) => cube.z));
    const zMax = Math.max(...cubes.cubes.map((cube: Cube) => cube.z));
    const wMin = Math.min(...cubes.cubes.map((cube: Cube) => cube.w));
    const wMax = Math.max(...cubes.cubes.map((cube: Cube) => cube.w));

    for (let w = wMin; w <= wMax; w++) {
      for (let z = zMin; z <= zMax; z++) {
        if (
          this.cubes
            .filter((cube: Cube) => cube.z === z)
            .every((cube: Cube) => !cube.active)
        ) {
          continue;
        }
        let plane: string[] = [];
        console.log(`z=${z}`, `w=${w}`);
        for (let y = yMin; y <= yMax; y++) {
          let row = "";
          for (let x = xMin; x <= xMax; x++) {
            const cube = this.getCube(x, y, z, w);
            row += cube?.active ? "#" : ".";
          }
          plane.unshift(row);
        }
        console.log(plane.join("\n"));
        console.log();
      }
    }
  }
}

const cubes: Cubes = new Cubes(getData());

function solveD17P1() {
  cubes.cycle(6);
  // cubes.printCubes();
  console.log(cubes.count());
}

solveD17P1();
