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
  size: 5,
  typeOfSolution: typeOfSolution.shortest,
  crossing: false,
  manualSolvingSystem: false,
};

const rand = new Rand();

const form = document.querySelector("#maze-generation-form");
const resolveBtn = document.querySelector("#reslove");
let maze: Maze | null = null;
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    maze = new Maze(mazeConfig, rand);

    maze.build();
    maze.draw(false);

    const resolveBox = document.querySelector(".bottom-box");
    resolveBox?.classList.remove("hidden");
  });
}

resolveBtn?.addEventListener("click", () => {
  if (typeof maze === "undefined") {
    throw new Error("Maze should be define for resolve");
  }
  const solver = new Solver(
    maze.getMaze(),
    [0, 1],
    [mazeConfig.size - 2, mazeConfig.size - 1]
  );
  solver.rankCell();
  solver.drawResult();
  maze?.draw(true);
});
