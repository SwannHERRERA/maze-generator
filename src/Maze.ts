import { SVG } from "@svgdotjs/svg.js";
import {
  MazeConfig,
  shapeOfTheMaze,
  typeOfCell,
  typeOfSolution,
} from "./MazeConfig";
import Random from "./Random";

export default class Maze implements MazeConfig {
  typeOfCell: typeOfCell;
  shapeOfTheMaze: shapeOfTheMaze;
  whereToStart: String;
  color: String;
  size: Number;
  typeOfSolution: typeOfSolution;
  crossing: Boolean;
  manualSolvingSystem: Boolean;

  value: number[][];

  constructor(params: MazeConfig, Random: Random) {
    this.typeOfCell = params.typeOfCell;
    this.shapeOfTheMaze = params.shapeOfTheMaze;
    this.whereToStart = params.whereToStart;
    this.color = params.color;
    this.size = params.size;
    this.typeOfSolution = params.typeOfSolution;
    this.crossing = params.crossing;
    this.manualSolvingSystem = params.manualSolvingSystem;

    this.value = [];
    for (let i = 0; i < this.size; i++) {
      this.value[i] = [];
    }
  }
  createGrid() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.fillCell(i, j);
      }
    }
  }

  private fillCell(i: number, j: number) {
    if (this.isNotWall(i, j)) {
      this.value[i][j] = 0;
    } else {
      this.value[i][j] = -1;
    }
  }

  private isNotWall(i: number, j: number): boolean {
    return i % 2 == 1 && j % 2 == 1 && this.isNotLast(i, j);
  }

  private isNotLast(i: number, j: number): boolean {
    if (i == this.size || j == this.size) {
      return false;
    }
    return true;
  }

  getMaze() {
    return this.value;
  }

  build() {}
}
