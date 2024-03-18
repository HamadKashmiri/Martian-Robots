import {
  createMarsModel,
  processRobots,
  readEarthlingInstructions,
  showFinalPositions,
} from "./helpers/martian.js";
const input = `5 3

1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL;

0 3 W
LLFFFLFLFL`;

export const runMarsSimulation = (input) => {
  const { boundary, robots } = readEarthlingInstructions(input);
  const marsModel = createMarsModel(boundary[0], boundary[1]);
  const { finalMarsModel, finalRobotPostions } = processRobots(
    marsModel,
    robots
  );

  // Uncomment & run npm start in console to show output
  // console.log("Final Grid with Scents... \n\n", finalMarsModel);
  // console.log(showFinalPositions(finalRobotPostions));

  return showFinalPositions(finalRobotPostions);
};

runMarsSimulation(input);
