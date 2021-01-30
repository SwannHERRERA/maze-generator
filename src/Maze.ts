import { SVG } from "@svgdotjs/svg.js";
import {
  MazeConfig,
  shapeOfTheMaze,
  typeOfCell,
  typeOfSolution,
} from "./MazeConfig";
import Random from "./Random";
import MazeDrawer from "./presentation/MazeDrawer";

export default class Maze implements MazeConfig {
  typeOfCell: typeOfCell;
  shapeOfTheMaze: shapeOfTheMaze;
  whereToStart: string;
  color: string;
  size: number;
  typeOfSolution: typeOfSolution;
  crossing: boolean;
  manualSolvingSystem: boolean;
  drawer: MazeDrawer = new MazeDrawer(this);

  Random: Random;
  value: number[][];

  constructor(params: MazeConfig, Random: Random) {
    this.typeOfCell = params.typeOfCell;
    this.shapeOfTheMaze = params.shapeOfTheMaze;
    this.whereToStart = params.whereToStart;
    this.color = params.color;

    if (params.size < 3) {
      throw new Error("Maze is too small");
    }

    this.size = params.size;
    this.typeOfSolution = params.typeOfSolution;
    this.crossing = params.crossing;
    this.manualSolvingSystem = params.manualSolvingSystem;
    this.Random = Random;
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
    return i % 2 === 1 && j % 2 === 1 && this.isNotLast(i, j);
  }

  private isNotLast(i: number, j: number): boolean {
    const size = this.size - 1;
    if (i === size || j === size) {
      return false;
    }
    return true;
  }

  fillWithRandomValue() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.value[i][j] === 0) {
          this.value[i][j] = this.Random.nextInt(10);
        }
      }
    }
  }

  createStartAndEnd() {
    this.value[1][0] = 0;
    this.value[this.size - 2][this.size] = 0;
  }

  getMaze() {
    return this.value;
  }

  breakWall() {
    while (!this.buildIsFinish()) {}
  }

  private buildIsFinish(): boolean {
    const firstCasll = this.value[1][1];
    for (let i = 0; i < this.size; i += 2) {
      for (let j = 0; j < this.size; j += 2) {
        if (firstCasll !== this.value[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  build() {
    this.createGrid();
    this.createStartAndEnd();
    this.draw();

    this.fillWithRandomValue();
    this.draw();
  }

  draw() {
    this.drawer.draw();
  }
}
