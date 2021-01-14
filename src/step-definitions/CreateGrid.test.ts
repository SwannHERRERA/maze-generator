import { binding, given, then, when } from "cucumber-tsflow";
import Maze from "../Maze";
import { assert } from "chai";
import Random from "../Random";
import getDefaultMazeConfig from "./MazeTestHelper";
import {
  MazeConfig,
  shapeOfTheMaze,
  typeOfCell,
  typeOfSolution,
} from "../MazeConfig";
import Rand from "../Rand";

@binding()
export class CreateGridSteps {
  private maze: Maze;

  constructor() {
    // i do this just for have maze of type Maze
    const config = getDefaultMazeConfig();
    const rand: Random = new Rand();
    this.maze = new Maze(config, rand);
  }

  @given(/I want to create a grid of isolate cell of size (\d*)/)
  createAGridOfIsolateCell(size: string) {
    const config = getDefaultMazeConfig();
    config.size = Number(size);
    const rand: Random = new Rand(); // To fake after
    this.maze = new Maze(config, rand);
  }

  @when(/when i run createGrid/)
  whenIRunCreateGrid() {
    this.maze.createGrid();
  }

  @then(/It should return a array with isolate cell of 0 by -1 of size (\w+)/)
  itSouldBeAnArrayOfIsolateCell(sizeStr: string) {
    const size = Number(sizeStr);
    const expected = new Map();
    expected.set(3, [
      [-1, -1, -1],
      [-1, 0, -1],
      [-1, -1, -1],
    ]);
    expected.set(4, [
      [-1, -1, -1, -1],
      [-1, 0, -1, -1],
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
    ]);
    expected.set(5, [
      [-1, -1, -1, -1, -1],
      [-1, 0, -1, 0, -1],
      [-1, -1, -1, -1, -1],
      [-1, 0, -1, 0, -1],
      [-1, -1, -1, -1, -1],
    ]);
    expected.set(7, [
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, 0, -1, 0, -1, 0, -1],
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, 0, -1, 0, -1, 0, -1],
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, 0, -1, 0, -1, 0, -1],
      [-1, -1, -1, -1, -1, -1, -1],
    ]);
    const actual = this.maze.getMaze();

    // console.log(actual, expected);

    assert.deepEqual(actual, expected.get(size));
  }
}
