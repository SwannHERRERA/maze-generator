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
    [-1, 7, -1, 6, -1],
    [-1, -1, -1, -1, -1],
    [-1, 9, -1, 7, -1],
    [-1, -1, -1, -1, -1],
  ];

  private expectedMazeForSize5WithStartAndEnd = [
    [-1, -1, -1, -1, -1],
    [0, 7, -1, 6, -1],
    [-1, -1, -1, -1, -1],
    [-1, 9, -1, 7, -1],
    [-1, -1, -1, 0, -1],
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
    this.maze?.fillWithRandomValue();
  }

  @when(/i try to create the start and the end/)
  whenIcreateStartAndEnd() {
    this.maze?.createStartAndEnd();
  }

  @then(/the value should be as expected/)
  ThenTheValueShouldBe() {
    const actual = this.maze?.getMaze();

    assert.deepEqual(actual, this.expectedMazeForSize5);
  }
}
