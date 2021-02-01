import { binding, given, then, when } from "cucumber-tsflow";
import Maze from "../Maze";
import { assert, expect } from "chai";
import Random from "../Random";
import getDefaultMazeConfig from "./MazeTestHelper";
import { MazeConfig } from "../MazeConfig";
import FakeRand from "../FakeRand";

@binding()
export class BuildIsFinishSteps {
  private config: MazeConfig = getDefaultMazeConfig();
  private random: Random = new FakeRand();

  private maze: Maze | undefined;

  @given("A maze with only wall and 1 color")
  givenAMazeWithOneColor() {
    const value = [
      [-1, -1, -1, -1, -1],
      [0, 0, -1, 0, -1],
      [-1, 0, -1, 0, -1],
      [-1, 0, 0, 0, -1],
      [-1, -1, -1, 0, -1],
    ];
    this.maze = new Maze(this.config, this.random).setMaze(value);
  }

  @when("When I run build is finish")
  whenIRunBuildIsFinish() {
    this.maze.buildIsFinish();
  }
}
