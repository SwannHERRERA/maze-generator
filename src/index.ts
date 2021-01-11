import {
  shapeOfTheMaze,
  typeOfCell,
  MazeConfig,
  typeOfSolution,
} from "./MazeConfig";

import Maze from "./Maze";
import Rand from "./Rand";

const mazeConfig: MazeConfig = {
  typeOfCell: typeOfCell.square,
  shapeOfTheMaze: shapeOfTheMaze.rectangular,
  whereToStart: "top-left",
  color: "#003021",
  size: 40,
  typeOfSolution: typeOfSolution.shortest,
  crossing: false,
  manualSolvingSystem: false,
};

const rand = new Rand();

const maze = new Maze(mazeConfig, rand);

maze.build();
// function add(a: number, b: number): number {
//   return a + b;
// }
// export default add;
