import { range, readFileToString } from "../../utilities";

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
  active: boolean;
  neighbors: { x: number; y: number; z: number }[]; // 26 neighbors

  constructor(x: number, y: number, z: number, active: boolean) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.active = active;
    this.neighbors = this.getNeighbors();
  }

  getNeighbors() {
    const neighbors: { x: number; y: number; z: number }[] = [];
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        for (let k = -1; k < 2; k++) {
          if (i === 0 && j === 0 && k === 0) continue;
          neighbors.push({ x: this.x + i, y: this.y + j, z: this.z + k });
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
        this.addCube(new Cube(j - off, off - i, 0, center[i][j] === 1));
      }
    }
    this.#neighborsToCubes();
    this.cubes.sort((a, b) => a.z - b.z);
  }

  #addPlanes(): void {
    const newCubes: Cube[] = [];
    for (const cube of this.cubes) {
      newCubes.push(new Cube(cube.x, cube.y, cube.z + 1, false));
      newCubes.push(new Cube(cube.x, cube.y, cube.z - 1, false));
    }
    this.cubes = [...this.cubes, ...newCubes].sort((a, b) => a.z - b.z);
  }

  addCube(cube: Cube): void {
    this.cubes.push(cube);
  }

  #neighborsToCubes(): void {
    const neighbors: { x: number; y: number; z: number }[] = [];
    this.cubes.forEach((cube: Cube) => {
      cube.neighbors.forEach((neighbor: { x: number; y: number; z: number }) => {
        if (
          !neighbors.some(
            (n) => n.x === neighbor.x && n.y === neighbor.y && n.z === neighbor.z
          )
        ) {
          neighbors.push(neighbor);
        }
      });
    });
    neighbors.forEach((neighbor: { x: number; y: number; z: number }) => {
      if (!this.getCube(neighbor.x, neighbor.y, neighbor.z)) {
        this.addCube(new Cube(neighbor.x, neighbor.y, neighbor.z, false));
      }
    });
  }

  #activePointBounds() {
    const activeCubes = this.cubes.filter((cube: Cube) => cube.active);
    const xMin = Math.min(...activeCubes.map((cube: Cube) => cube.x));
    const xMax = Math.max(...activeCubes.map((cube: Cube) => cube.x));
    const yMin = Math.min(...activeCubes.map((cube: Cube) => cube.y));
    const yMax = Math.max(...activeCubes.map((cube: Cube) => cube.y));
    const zMin = Math.min(...activeCubes.map((cube: Cube) => cube.z));
    const zMax = Math.max(...activeCubes.map((cube: Cube) => cube.z));
    return [
      [xMin, xMax],
      [yMin, yMax],
      [zMin, zMax]
    ];
  }

  #getGridBounds() {
    const xMin = Math.min(...this.cubes.map((cube: Cube) => cube.x));
    const xMax = Math.max(...this.cubes.map((cube: Cube) => cube.x));
    const yMin = Math.min(...this.cubes.map((cube: Cube) => cube.y));
    const yMax = Math.max(...this.cubes.map((cube: Cube) => cube.y));
    const zMin = Math.min(...this.cubes.map((cube: Cube) => cube.z));
    const zMax = Math.max(...this.cubes.map((cube: Cube) => cube.z));
    return [
      [xMin, xMax],
      [yMin, yMax],
      [zMin, zMax]
    ];
  }

  #activePointsAtEdges(): boolean {
    const activeBounds = this.#activePointBounds();
    const bounds = this.#getGridBounds();
    return bounds.every((bound, i) => {
      return bound[0] > activeBounds[i][0] || bound[1] < activeBounds[i][1];
    });
  }

  cycle(totalCycles: number): void {
    for (let i = 0; i < totalCycles; i++) {
      this.#neighborsToCubes();
      this.#calculateNextState();
    }
  }

  #calculateNextState() {
    const cubesThatChange: Cube[] = [];

    for (const cube of this.cubes) {
      if (this.#doesCubeStateChange(cube)) {
        cubesThatChange.push(cube);
      }
    }
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
      const n = this.getCube(neighbor.x, neighbor.y, neighbor.z);
      if (n) neighbors.push(n);
    }
    return neighbors.filter((cube: Cube) => cube.active);
  }

  getCube(x: number, y: number, z: number): Cube | undefined {
    return this.cubes.find((cube: Cube) => cube.x === x && cube.y === y && cube.z === z);
  }

  printCubes(): void {
    const xMin = Math.min(...cubes.cubes.map((cube: Cube) => cube.x));
    const xMax = Math.max(...cubes.cubes.map((cube: Cube) => cube.x));
    const yMin = Math.min(...cubes.cubes.map((cube: Cube) => cube.y));
    const yMax = Math.max(...cubes.cubes.map((cube: Cube) => cube.y));
    const zMin = Math.min(...cubes.cubes.map((cube: Cube) => cube.z));
    const zMax = Math.max(...cubes.cubes.map((cube: Cube) => cube.z));

    for (let z = zMin; z <= zMax; z++) {
      if (
        this.cubes
          .filter((cube: Cube) => cube.z === z)
          .every((cube: Cube) => !cube.active)
      ) {
        continue;
      }
      let plane: string[] = [];
      console.log(`z=${z}`);
      for (let y = yMin; y <= yMax; y++) {
        let row = "";
        for (let x = xMin; x <= xMax; x++) {
          const cube = this.getCube(x, y, z);
          row += cube?.active ? "#" : ".";
        }
        plane.unshift(row);
      }
      console.log(plane.join("\n"));
      console.log();
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
