import { binding, given, then, when } from "cucumber-tsflow";
import Maze from "../Maze";
import { assert, expect } from "chai";
import Random from "../Random";
import getDefaultMazeConfig from "./MazeTestHelper";
import { MazeConfig } from "../MazeConfig";
import FakeRand from "../FakeRand";

@binding()
export class CreateGridSteps {
  private size: number = 0;
  private config: MazeConfig = getDefaultMazeConfig();
  private random: Random = new FakeRand();

  private maze: Maze;

  constructor() {
    this.maze = new Maze(this.config, this.random);
  }

  @given(/I want to create a grid of isolate cell of size (\d*)/)
  createAGridOfIsolateCell(size: string) {
    this.config.size = Number(size);

    this.maze = new Maze(this.config, this.random);
  }

  @given(/a size of (\d*)/)
  givenASizeOf(size: string) {
    this.config.size = Number(size);
  }

  @when(/i run createGrid/)
  whenIRunCreateGrid() {
    this.maze.createGrid();
  }

  @when(/i want to create maze/)
  @then(/it should throw an error/)
  whenIWantToCreateMaze() {
    expect(() => new Maze(this.config, this.random)).to.throw();
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

    assert.deepEqual(actual, expected.get(size));
  }
}
