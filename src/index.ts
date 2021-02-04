import {
  shapeOfTheMaze,
  typeOfCell,
  MazeConfig,
  typeOfSolution,
} from "./MazeConfig";

import Maze from "./Maze";
import Rand from "./Rand";
import Solver from "./Solver";

const mazeConfig: MazeConfig = {
  typeOfCell: typeOfCell.square,
  shapeOfTheMaze: shapeOfTheMaze.rectangular,
  whereToStart: "top-left",
  color: "#003021",
  size: 15,
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
    const solver = new Solver(
      maze.getMaze(),
      [0, 1],
      [mazeConfig.size - 2, mazeConfig.size - 1]
    );
    solver.rankCell();
    maze.draw();
  });
}
