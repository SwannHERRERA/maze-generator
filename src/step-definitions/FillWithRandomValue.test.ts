import { binding, given, then, when } from "cucumber-tsflow";
import Maze from "../Maze";
import { assert } from "chai";
import getDefaultMazeConfig from "./MazeTestHelper";
import Random from "../Random";
import { MazeConfig } from "../MazeConfig";
import FakeRand from "../FakeRand";

@binding()
export class FillWithRandomValueSteps {
  private mazeSize: number = 0;
  private maze: Maze | undefined;

  private rand: Random = new FakeRand();
  private mazeConfig: MazeConfig = getDefaultMazeConfig();

  private expectedMazeForSize5 = [
    [-1, -1, -1, -1, -1],
    [-1, 0, -1, 1, -1],
    [-1, -1, -1, -1, -1],
    [-1, 2, -1, 3, -1],
    [-1, -1, -1, -1, -1],
  ];

  @given(/a Maze of size (\d*)/)
  givenAMazeOfSize(size: string) {
    this.mazeSize = Number(size);

    this.mazeConfig.size = this.mazeSize;

    this.maze = new Maze(this.mazeConfig, this.rand);
    this.maze.createGrid();
  }

  @when(/I call fillWithRandomValue/)
  whenICallFillWithRandomValue() {
    this.maze?.fillCell();
  }

  @then(/the value should be as expected/)
  ThenTheValueShouldBe() {
    const actual = this.maze?.getMaze();

    assert.deepEqual(actual, this.expectedMazeForSize5);
  }
}
