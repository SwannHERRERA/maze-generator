import { Number } from "@svgdotjs/svg.js";

export default class Solver {
  drawResult() {
    let [x, y] = this.end;
    while (this.IGotANeighbourBetterThanMe(x, y)) {
      const expected = this.maze[x][y] - 1;
      this.maze[x][y] = -20;
      if (x + 1 < this.maze.length && this.maze[x + 1][y] === expected) {
        x += 1;
      } else if (x - 1 > -1 && this.maze[x - 1][y] === expected) {
        x -= 1;
      } else if (y + 1 < this.maze.length && this.maze[x][y + 1] === expected) {
        y += 1;
      } else if (y - 1 > -1 && this.maze[x][y - 1] === expected) {
        y -= 1;
      }
    }
  }

  IGotANeighbourBetterThanMe(x: number, y: number) {
    if (x === this.start[0] && y === this.start[1]) {
      this.maze[x][y] = -20;
      return false;
    }
    if (x + 1 < this.maze.length && this.maze[x][y] > this.maze[x + 1][y]) {
      return true;
    }
    if (x - 1 > -1 && this.maze[x][y] > this.maze[x - 1][y]) {
      return true;
    }
    if (y + 1 < this.maze.length && this.maze[x][y] > this.maze[x][y + 1]) {
      return true;
    }
    if (y - 1 > -1 && this.maze[x][y] > this.maze[x][y - 1]) {
      return true;
    }
    return false;
  }
  makeResultPath() {}

  getShortestPathLonger(): number {
    return this.maze[this.end[0]][this.end[1]];
  }
  getRank(): number[][] {
    return this.maze;
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
