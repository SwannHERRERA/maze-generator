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

  rankCell() {}
}
