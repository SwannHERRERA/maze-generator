import { binding, given, then, when } from "cucumber-tsflow";
import { assert } from "chai";
import Solver from "../Solver";
import Maze from "../Maze";
import getDefaultMazeConfig from "./MazeTestHelper";
import { MazeConfig } from "../MazeConfig";
import FakeRand from "../FakeRand";
import Random from "../Random";

@binding()
export class SolverSteps {
  private mazeSize: number = 0;
  private maze: Maze | undefined;

  private rand: Random = new FakeRand();
  private mazeConfig: MazeConfig = getDefaultMazeConfig();
  private solvers: Solver[];
  private mazes: number[][][];
  private cursors: number[][];

  // FOR NO ERROR
  constructor() {
    this.maze = new Maze(this.mazeConfig, this.rand);
    this.mazeSize = this.maze.size;
    this.solvers = [];
    this.mazes = [];
    this.cursors = [];
  }

  @given(/Different mazes/)
  givenDifferentMaze() {
    const sizes = [5, 11, 15, 20, 25];
    for (let size of sizes) {
      this.mazeConfig.size = size;
      const maze = new Maze(this.mazeConfig, this.rand);
      maze.build();
      this.mazes.push(maze.getMaze());
    }
  }

  @when(/I want to solve them/)
  whenIWantToSolveThem() {
    for (const maze of this.mazes) {
      const solver = new Solver(
        maze,
        [0, 1],
        [maze.length - 2, maze.length - 1]
      );
      solver.rankCell();
      this.solvers.push(solver);
    }
  }

  @then(/the length is as expected/)
  thenTheLengthIsAsExpected() {
    const expectedResult = [6, 18, 30, -1, 46];

    for (let i = 0; i < this.solvers.length; i++) {
      const actual = this.solvers[i].getShortestPathLonger();
      assert.equal(actual, expectedResult[i]);
    }
  }

  @given(/mazes with solution/)
  givenMazeWithSolution() {
    this.mazes = [];
    const sizes = [5, 11, 15, 20, 25];
    for (let size of sizes) {
      this.mazeConfig.size = size;
      const maze = new Maze(this.mazeConfig, this.rand);
      maze.build();
      const solver = new Solver(
        maze.getMaze(),
        [0, 1],
        [maze.size - 2, maze.size - 1]
      );
      solver.rankCell();
      solver.drawResult();
      this.mazes.push(maze.getMaze());
    }
  }

  @when(/i follow the green line from start/)
  whenIFollowTheGreenLine() {
    let x = 0;
    let y = 1;
    for (const maze of this.mazes) {
      while (this.haveGreenNeighboug(x, y, maze)) {
        maze[x][y] = -5;
        if (x + 1 < maze.length && maze[x + 1][y] === -20) {
          x += 1;
        } else if (x - 1 < maze.length && maze[x - 1][y] === -20) {
          x -= 1;
        } else if (y + 1 < maze.length && maze[x][y + 1] === -20) {
          y += 1;
        } else if (y - 1 < maze.length && maze[x][y - 1] === -20) {
          y -= 1;
        }
      }
      this.cursors.push([x, y]);
    }
  }

  @then(/i fond end/)
  thenIfoundEnd() {
    for (let i = 0; i < this.mazes.length; i++) {
      this.mazes[i];
      assert.equal(this.cursors[i][0], this.mazes[i].length - 2);
      assert.equal(this.cursors[i][1], this.mazes[i].length - 1);
    }
  }

  private haveGreenNeighboug(x: number, y: number, maze: number[][]) {
    if (x + 1 < maze.length && maze[x + 1][y] === -20) {
      return true;
    }
    if (x - 1 > 0 && maze[x - 1][y] === -20) {
      return true;
    }
    if (y + 1 < maze.length && maze[x][y + 1] === -20) {
      return true;
    }
    if (y - 1 > 0 && maze[x][y - 1] === -20) {
      return true;
    }
    return false;
  }
}
