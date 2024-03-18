import { moveForward, turnLeft, turnRight } from "./instructions.js";

/**
 * Processes all robots in the simulation object
 */
export const processRobots = (marsModel, robots) => {
  const finalPositions = [];
  robots.forEach((robot, index) => {
    const {
      initialPosition: [x, y, orientation],
      instructions,
    } = robot;

    try {
      const finalPosition = processRobot(
        parseInt(x),
        parseInt(y),
        orientation,
        instructions,
        marsModel
      );

      finalPositions.push(finalPosition);
    } catch (error) {
      throw new Error(`Error processing robot: ${error.message}`);
    }
  });

  return {
    finalMarsModel: marsModel,
    finalRobotPostions: finalPositions,
  };
};

/**
 * Process Individual Robot
 *
 * Probably would refactor this at some stage, too many params for my liking
 */
const processRobot = (x, y, orientation, instructions, marsModel) => {
  if (instructions.length === 0) {
    return [x, y, orientation];
  }
  const [newX, newY, newOrientation] = processInstruction(
    x,
    y,
    orientation,
    instructions[0]
  );

  const isOnScentedPoint = marsModel[y][x] === "scent";

  if (isOnScentedPoint && isRobotOutOfBounds(newX, newY, marsModel)) {
    return processRobot(x, y, orientation, instructions.slice(1), marsModel);
  }

  if (isRobotOutOfBounds(newX, newY, marsModel)) {
    marsModel[y][x] = "scent";
    return [x, y, newOrientation, "lost"];
  }

  return processRobot(
    newX,
    newY,
    newOrientation,
    instructions.slice(1),
    marsModel
  );
};

/**
 * Check if robot out of bounds
 */
const isRobotOutOfBounds = (newX, newY, marsModel) =>
  newX < 0 ||
  newX >= marsModel[0].length ||
  newY < 0 ||
  newY >= marsModel.length;

/**
 * Processes each individual character in an instruction
 */
const processInstruction = (x, y, orientation, instruction) => {
  switch (instruction) {
    case "R":
      return [x, y, turnRight(orientation)];
    case "L":
      return [x, y, turnLeft(orientation)];
    case "F":
      return [...moveForward(x, y, orientation), orientation];
    default:
      throw new Error(`Invalid instruction: ${instruction}`);
  }
};

/**
 * Creates boundaries for mars
 */
export const createMarsModel = (x, y) =>
  Array(y + 1)
    .fill()
    .map(() => Array(x + 1).fill(null));

/**
 * Reads and cleans the input from Earth
 *
 *
 * NOTE: In a production system, we would normalize and validate the input.
 * Essentially transforming/ensuring the input is in a consistent format
 * which we could reliably parse into instructions, however we are assuming
 * the input is validated and clean for now.
 */
export const readEarthlingInstructions = (input) => {
  let lines = input.trim().split("\n");
  const boundary = lines.shift().split(" ").map(Number);
  const robots = [];

  lines = lines.filter((line) => line.trim() !== "");

  for (let i = 0; i < lines.length; i += 2) {
    const position = lines[i].split(" ");
    const instructions = lines[i + 1].trim();
    robots.push({ initialPosition: position, instructions });
  }

  return { boundary, robots };
};

/**
 * Outputs in desired format
 */
export const showFinalPositions = (positions) => {
  return positions.map((position) => position.join(" ")).join("\n");
};

/**
 * Things to consider:
 * Snapshot of final grid in case we want to send more instructions
 * Tracking the history of robot positions? Perhaps a database
 * How to handle multiple robots in the same position?
 * How we would move the robots asynchronously, what this means for the scent?
 * Should realistically have updated the marsModel with the robot positions rather than just the scents
 */
