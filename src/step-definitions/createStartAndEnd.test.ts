import { binding, given, then, when } from "cucumber-tsflow";
import Maze from "../Maze";
import { assert } from "chai";
import getDefaultMazeConfig from "./MazeTestHelper";
import Random from "../Random";
import { MazeConfig } from "../MazeConfig";
import FakeRand from "../FakeRand";

@binding()
export class createStartAndEndSteps {
  private mazeSize: number = 0;
  private maze: Maze | undefined;
  private rand: Random = new FakeRand();
  private mazeConfig: MazeConfig = getDefaultMazeConfig();

  @given(/i want to create a Maze size (\d*) with start and stop/)
  givenAMazeOfSize(size: string) {
    this.mazeSize = Number(size);

    this.mazeConfig.size = this.mazeSize;

    this.maze = new Maze(this.mazeConfig, this.rand);
    this.maze.createGrid();
  }

  @when(/i try to create the start and the end/)
  whenIcreateStartAndEnd() {
    this.maze?.createStartAndEnd();
  }

  @then(/the maze should be as expected with start and end/)
  thenTheMazeShouldHaveStartAndEnd() {
    if (typeof this.maze === "undefined") {
      throw new Error("maze should not be undefined");
    }
    const maze = this.maze?.getMaze();
    const start = maze[0][1];
    const end = maze[this.mazeSize - 2][this.mazeSize - 1];

    assert.notEqual(-1, start);
    assert.notEqual(-1, end);
  }
}
