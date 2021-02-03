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
  size: 51,
  typeOfSolution: typeOfSolution.shortest,
  crossing: false,
  manualSolvingSystem: false,
};

const rand = new Rand();

const form = document.querySelector("#maze-generation-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const maze = new Maze(mazeConfig, rand);
    maze.build();
  });
}
