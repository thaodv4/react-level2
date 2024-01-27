export const getTypeByCorrectAnswer = (correctTotal) => {
  return correctTotal > 3 ? "green" : correctTotal > 1 ? "yellow" : "red";
};
