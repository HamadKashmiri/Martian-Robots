export const turnRight = (orientation) => {
  const orientations = ["N", "E", "S", "W"];
  const currentIndex = orientations.indexOf(orientation);
  const newIndex = (currentIndex + 1) % orientations.length;
  return orientations[newIndex];
};

export const turnLeft = (orientation) => {
  const orientations = ["N", "E", "S", "W"];
  const currentIndex = orientations.indexOf(orientation);
  // Note: modulus to prevent from going outside of array
  const newIndex =
    (currentIndex - 1 + orientations.length) % orientations.length;
  return orientations[newIndex];
};

export const moveForward = (x, y, orientation) => {
  const movements = {
    N: [0, 1],
    E: [1, 0],
    S: [0, -1],
    W: [-1, 0],
  };
  const [dx, dy] = movements[orientation];
  return [x + dx, y + dy];
};
