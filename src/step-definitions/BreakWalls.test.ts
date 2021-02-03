import { binding, given, then, when } from "cucumber-tsflow";
import Maze from "../Maze";
import { assert, expect } from "chai";
import Random from "../Random";
import getDefaultMazeConfig from "./MazeTestHelper";
import { MazeConfig } from "../MazeConfig";
import FakeRand from "../FakeRand";

@binding()
export class BreakWallsSteps {
  private config: MazeConfig = getDefaultMazeConfig();
  private random: Random = new FakeRand();

  constructor() {
    this.maze = new Maze(this.config, this.random);
  }

  private maze: Maze;
  @given(/a maze of (\d*) with cell filled/)
  given_a_maze_wth_cell_filled(size: string) {
    this.config.size = Number(size);

    this.maze = new Maze(this.config, this.random);
    this.maze.createGrid();
    this.maze.fillCells();
    this.maze.createStartAndEnd();
  }

  @when(/i break Walls/)
  when_i_break_wall() {
    this.maze.breakWalls();
  }

  @then(/The maze sould be as expected/)
  test_maze() {
    const expected = [
      [-1, 0, -1, -1, -1],
      [-1, 0, 0, 0, -1],
      [-1, -1, -1, 0, -1, 0],
      [-1, 0, 0, 0, 0, 0],
      [-1, -1, -1, -1, -1, 0],
    ];

    assert.deepEqual(this.maze.value, expected);
  }
}
