import { binding, given, then, when } from "cucumber-tsflow";
import Maze from "../Maze";
import { assert } from "chai";
import Random from "../Random";
import {
  MazeConfig,
  shapeOfTheMaze,
  typeOfCell,
  typeOfSolution,
} from "../MazeConfig";
import Rand from "../Rand";

@binding()
export class MazeSteps {
  private maze: Maze;

  constructor() {
    const config = this.getDefaultMazeConfig();
    const rand: Random = new Rand(); // To fake after
    this.maze = new Maze(config, rand);
  }

  private getDefaultMazeConfig(): MazeConfig {
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

  /**
   * @dead_code
   */
  private checkMazeExist() {
    if (!this.maze) {
      throw new Error("Maze is Not create");
    }
  }

  @given(/I want to create a grid of isolate cell/)
  createAGridOfIsolateCell() {
    // const config = this.getDefaultMazeConfig();
    // const rand: Random = new Rand(); // To fake after
    // this.maze = new Maze(config, rand);
    /**
     * All Of This Is Already done in constructor
     */
  }

  @when(/when i run createGrid/)
  whenIRunCreateGrid() {
    this.maze.createGrid();
  }

  @then(/It should return a array with isolate cell of 0 by -1/)
  itSouldBeAnArrayOfIsolateCell() {
    const expected = [
      [-1, -1, -1],
      [-1, 0, -1],
      [-1, -1, -1],
    ];
    const actual = this.maze.getMaze();
    assert.deepEqual(actual, expected);
  }
}
