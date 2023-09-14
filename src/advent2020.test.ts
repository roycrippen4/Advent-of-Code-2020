import { solveD1P1 } from "./problems/day1/day1-part1";
import { solveD1P2 } from "./problems/day1/day1-part2";
import { solveD10P1 } from "./problems/day10/day10-part1";
import { solveD10P2 } from "./problems/day10/day10-part2";
import { solveD11P1 } from "./problems/day11/day11-part1";
import { solveD11P2 } from "./problems/day11/day11-part2";
import { solveD12P1 } from "./problems/day12/day12-part1";
import { solveD12P2 } from "./problems/day12/day12-part2";
import { solveD13P1 } from "./problems/day13/day13-part1";
import { solveD13P2 } from "./problems/day13/day13-part2";
import { solveD14P1 } from "./problems/day14/day14-part1";
import { solveD14P2 } from "./problems/day14/day14-part2";
import { solveD15P1 } from "./problems/day15/day15-part1";
import { solveD15P2 } from "./problems/day15/day15-part2";
import { solveD16P1 } from "./problems/day16/day16-part1";
import { solveD16P2 } from "./problems/day16/day16-part2";
// import { solveD17P1 } from "./src/problems/day17/day17-part1";
// import { solveD17P2 } from "./src/problems/day17/day17-part2";
// import { solveD18P1 } from "./src/problems/day18/day18-part1";
// import { solveD18P2 } from "./src/problems/day18/day18-part2";
// import { solveD19P1 } from "./src/problems/day19/day19-problem1";
// import { solveD19P2 } from "./src/problems/day19/day19-problem2";
// import { solveD20P1 } from "./src/problems/day20/day20-problem1";
// import { solveD21P1 } from "./src/problems/day21/day21-part1";
// import { solveD21P2 } from "./src/problems/day21/day21-part2";
// import { solveD22P1 } from "./src/problems/day22/day22-part1";
// import { solveD22P2 } from "./src/problems/day22/day22-part2";
import { solveD2P1 } from "./problems/day2/day2-part1";
import { solveD2P2 } from "./problems/day2/day2-part2";
import { solveD3P1 } from "./problems/day3/day3-part1";
import { solveD3P2 } from "./problems/day3/day3-part2";
import { solveD4P1 } from "./problems/day4/day4-part1";
import { solveD4P2 } from "./problems/day4/day4-part2";
import { solveD5P1 } from "./problems/day5/day5-part1";
import { solveD5P2 } from "./problems/day5/day5-part2";
import { solveD6P1 } from "./problems/day6/day6-part1";
import { solveD6P2 } from "./problems/day6/day6-part2";
import { solveD7P1 } from "./problems/day7/day7-part1";
import { solveD7P2 } from "./problems/day7/day7-part2";
import { solveD8P1 } from "./problems/day8/day8-part1";
import { solveD8P2 } from "./problems/day8/day8-part2";
import { solveD9P1 } from "./problems/day9/day9-part1";
import { solveD9P2 } from "./problems/day9/day9-part2";
// import { solveD23 } from "./src/problems/day23/day23-part1";
import { describe, it, expect, assert } from "vitest";
// import { solveD24 } from "./src/problems/day24/advent2020-day24";
// import { solveD25 } from "./src/problems/day25/advent2020-day25-part1";
it("day 1 part 1", () => {
  expect(solveD1P1()).toBe(41979);
});

it("day 1 part 2", () => {
  expect(solveD1P2()).toBe(193416912);
});
// write the remaining tests from the comments below

it("day 2 part 1", () => {
  expect(solveD2P1()).toBe(556);
});

it("day 2 part 2", () => {
  expect(solveD2P2()).toBe(605);
});

it("day 3 part 1", () => {
  expect(solveD3P1()).toBe(299);
});

it("day 3 part 2", () => {
  expect(solveD3P2()).toBe(3621285278);
});

it("day 4 part 1", () => {
  expect(solveD4P1()).toBe(264);
});

it("day 4 part 2", () => {
  expect(solveD4P2()).toBe(224);
});

it("day 5 part 1", () => {
  expect(solveD5P1()).toBe(947);
});

it("day 5 part 2", () => {
  expect(solveD5P2()).toBe(636);
});

it("day 6 part 1", () => {
  expect(solveD6P1()).toBe(7283);
});

it("day 6 part 2", () => {
  expect(solveD6P2()).toBe(3520);
});

it("day 7 part 1", () => {
  expect(solveD7P1()).toBe(155);
});

it("day 7 part 2", () => {
  expect(solveD7P2()).toBe(54803);
});

it("day 8 part 1", () => {
  expect(solveD8P1()).toBe(2058);
});

it("day 8 part 2", () => {
  expect(solveD8P2()).toBe(1000);
});

it("day 9 part 1", () => {
  expect(solveD9P1()).toBe(217430975);
});

it("day 9 part 2", () => {
  expect(solveD9P2()).toBe(28509180);
});

it("day 10 part 1", () => {
  expect(solveD10P1()).toBe(1885);
});

it("day 10 part 2", () => {
  expect(solveD10P2()).toBe(0);
});

it("day 11 part 1", () => {
  expect(solveD11P1()).toBe(2275);
});

it("day 11 part 2", () => {
  expect(solveD11P2()).toBe(2121);
});

it("day 12 part 1", () => {
  expect(solveD12P1()).toBe(590);
});

it("day 12 part 2", () => {
  expect(solveD12P2()).toBe(0);
});

it("day 13 part 1", () => {
  expect(solveD13P1()).toBe(4808);
});

it("day 13 part 2", () => {
  expect(solveD13P2()).toBe(0);
});

it("day 14 part 1", () => {
  expect(solveD14P1()).toBe(4463708436768);
});

it("day 14 part 2", () => {
  expect(solveD14P2()).toBe(13476250121721);
});

it("day 15 part 1", () => {
  expect(solveD15P1()).toBe(249);
});

it.skip("day 15 part 2", () => {
  expect(solveD15P2()).toBe(41687);
});

it("day 16 part 1", () => {
  expect(solveD16P1()).toBe(0);
});

it("day 16 part 2", () => {
  expect(solveD16P2()).toBe(0);
});

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 1 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 193416912
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD1P2()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 2 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 556
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD2P1()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 2 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 605
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD2P2()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 3 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 299
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD3P1()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 3 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 3621285278
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD3P2()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 4 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 264
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD4P1()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 4 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 224
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD4P2()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 5 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 947
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD5P1()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 5 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 636
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD5P2()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 6 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 7283
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD6P1()).toBe(output);
//   });
// });
// describe("day 6 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 3520
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD6P2()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 7 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 155
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD7P1()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 7 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 54803
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD7P2()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 8 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 2058
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD8P1()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 8 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 1000
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD8P2()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 9 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 217430975
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD9P1()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 9 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 28509180
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD9P2()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 10 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 1885
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD10P1()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 10 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 0
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD10P2()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 11 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 2275
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD11P1()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 11 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 2121
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD11P2()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 12 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 590
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD12P1()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 12 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 0
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD12P2()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 13 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 4808
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD13P1()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 13 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 0
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD13P2()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 14 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 4463708436768
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD14P1()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 14 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 13476250121721
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD14P2()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 15 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 249
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD15P1()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 15 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 41687
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD15P2()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 16 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 0
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD16P1()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 16 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 0
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD16P2()).toBe(output);
//   });
// });
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 17 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 5151
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD17P1()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 17 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 0
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD17P2()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 18 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 4033
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD18P1()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 18 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 4864
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD18P2()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 19 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 440
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD19P1()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 19 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 13382
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD19P2()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 20 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 0
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD20P1()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 21 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 916083
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD21P1()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 21 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 49982165861983
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD21P2()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 22 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 612714
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD22P1()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 22 part 2", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 1311612259117092
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD22P2()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 23", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 0
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD23()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 24", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 0
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD24()).toBe(output);
//   });
// });
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// describe("day 25 part 1", () => {
//   const successCases = [
//     {
//       id: 0,
//       output: 0
//     }
//   ];
//   it.each(successCases)("success case $id", ({ output }) => {
//     expect(solveD25()).toBe(output);
//   });
// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
