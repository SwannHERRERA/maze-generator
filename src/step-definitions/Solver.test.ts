import { binding, given, then, when } from "cucumber-tsflow";
import { assert } from "chai";
import Solver from "../Solver";

@binding()
export class SolverSteps {
  // FOR NO ERROR
  constructor() {
    this.maze = [[]];
    this.solver = new Solver(this.maze, [0, 0], [0, 0]);
    this.sizeX = 0;
    this.sizeY = 0;
  }

  private maze: number[][];
  private solver: Solver;
  private sizeX: number;
  private sizeY: number;

  @given(/a maze (\d*) * (\d*)/)
  givenAMazeOfSize(sizeX: number, sizeY: number) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    for (let i = 0; i < sizeX - 1; i++) {
      this.maze[i] = [];
      for (let j = 0; j < sizeY - 1; j++) {
        if (i === 0 || j === 0 || i === sizeX - 1 || j === sizeY - 1) {
          this.maze[i][j] = -1;
        } else {
          this.maze[i][j] = 0;
        }
      }
      console.log(this.maze);

      this.setStartAndEnd();
    }
  }

  private setStartAndEnd() {
    this.maze[0][1] = 0;
    this.maze[this.sizeX - 2][this.sizeY - 1] = 0;
  }

  @when(/i map the grid/)
  whenIMapTheGrid() {
    this.solver = new Solver(
      this.maze,
      [0, 1],
      [this.sizeX - 2, this.sizeY - 1]
    );
    this.solver.rankCell();
  }

  @then(/he should rank the case/)
  thenHeSouldRankTheCell() {
    const ranking = this.solver.getRank();
    const rankingExpected = [
      [-1, -1, -1, -1, -1, -1, -1],
      [0, 1, 2, 3, -1, -1, -1],
      [-1, 2, 3, 4, 5, 6, -1],
      [-1, 3, 4, 5, 6, 7, -1],
      [-1, 4, 5, 6, 7, 8, -1],
      [-1, 5, 6, 7, 8, 9, -1],
      [-1, -1, -1, -1, -1, 10, -1],
    ];
    assert.deepEqual(ranking, rankingExpected);
  }

  @then(/he sould tell me the shortest path is (\d*) long/)
  thenHeSouldTellMeTheShortestPathIs(expectedShortestPathLonger: number) {
    const actualShortestPath = this.solver.getShortestPathLonger();
    assert.equal(actualShortestPath, expectedShortestPathLonger);
  }
}
