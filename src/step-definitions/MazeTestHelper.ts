import {
  MazeConfig,
  shapeOfTheMaze,
  typeOfCell,
  typeOfSolution,
} from "../MazeConfig";

function getDefaultMazeConfig(): MazeConfig {
  const mazeConfig: MazeConfig = {
    typeOfCell: typeOfCell.square,
    shapeOfTheMaze: shapeOfTheMaze.rectangular,
    whereToStart: "top-left",
    color: "#003021",
    size: 3,
    typeOfSolution: typeOfSolution.shortest,
    crossing: false,
    manualSolvingSystem: false,
  };

  return mazeConfig;
}
export default getDefaultMazeConfig;
