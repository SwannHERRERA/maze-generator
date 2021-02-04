import { Number } from "@svgdotjs/svg.js";

export default class Solver {
  getShortestPathLonger(): number {
    throw new Error("Method not implemented.");
  }
  getRank(): number[][] {
    throw new Error("Method not implemented.");
  }
  private maze: number[][];
  private start: [number, number];
  private end: [number, number];

  constructor(
    maze: number[][],
    start: [number, number],
    end: [number, number]
  ) {
    this.maze = maze;
    this.start = start;
    this.end = end;
  }

  rankCell() {
    let distance = 0;
    this.rankCellRecursively(distance, this.start[0], this.start[1]);
  }

  rankCellRecursively(distance: number, x: number, y: number) {
    this.maze[x][y] = distance;

    if (x + 1 < this.maze.length && this.maze[x + 1][y] === 0) {
      this.rankCellRecursively(distance + 1, x + 1, y);
    }

    if (x - 1 > 0 && this.maze[x - 1][y] === 0) {
      this.rankCellRecursively(distance + 1, x - 1, y);
    }

    if (y + 1 < this.maze.length && this.maze[x][y + 1] === 0) {
      this.rankCellRecursively(distance + 1, x, y + 1);
    }

    if (x - 1 > 0 && this.maze[x][y - 1] === 0) {
      this.rankCellRecursively(distance + 1, x, y - 1);
    }
  }
}
