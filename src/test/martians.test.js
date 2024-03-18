/**
 * More unit tests would be added in theory
 */

import { runMarsSimulation } from "../martians.js";

const input = `5 3

1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL;

0 3 W
LLFFFLFLFL`;

const output = `1 1 E
3 3 N lost
2 3 S`;

describe("The run mars simulation", () => {
  it("should output the example data", () => {
    const response = runMarsSimulation(input);
    expect(response).toBe(output);
  });
});
