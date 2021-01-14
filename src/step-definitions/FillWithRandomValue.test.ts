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
  private expectedMazeForSize6 = [
    [7, 6, 9, 7, 6, 9],
    [0, 9, 4, 8, 9, 7],
    [6, 5, 8, 8, 7, 0],
    [3, 1, 0, 1, 5, 3],
    [1, 3, 3, 6, 9, 1],
    [1, 5, 2, 0, 3, 8],
  ];

  @given(/a Maze of size (\d*)/)
  givenAMazeOfSize(size: string) {
    this.mazeSize = Number(size);
    const rand: Random = new FakeRand();
    const mazeConfig: MazeConfig = getDefaultMazeConfig();

    mazeConfig.size = this.mazeSize;

    this.maze = new Maze(mazeConfig, rand);
  }

  @when(/I call fillWithRandomValue/)
  whenICallFillWithRandomValue() {
    this.maze?.fillWithRandomValue();
  }

  @then(/the value should be as expected/)
  ThenTheValueShouldBe() {
    const actual = this.maze?.getMaze();
    assert.deepEqual(actual, this.expectedMazeForSize6);
  }
}
