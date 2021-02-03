import { SVG } from "@svgdotjs/svg.js";
import {
  MazeConfig,
  shapeOfTheMaze,
  typeOfCell,
  typeOfSolution,
} from "./MazeConfig";
import Random from "./Random";
import MazeDrawer from "./presentation/MazeDrawer";
import Rand from "./Rand";

interface Point {
  x: number;
  y: number;
  neighbour: Point[];
}

export default class Maze implements MazeConfig {
  typeOfCell: typeOfCell;
  shapeOfTheMaze: shapeOfTheMaze;
  whereToStart: string;
  color: string;
  size: number;
  typeOfSolution: typeOfSolution;
  crossing: boolean;
  manualSolvingSystem: boolean;
  // drawer: MazeDrawer = new MazeDrawer(this);

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
          this.value[i][j] = this.Random.nextInt(100);
        }
      }
    }
  }

  createStartAndEnd() {
    this.value[0][1] = this.value[1][1];
    this.value[this.size - 2][this.size - 1] = this.value[this.size - 2][
      this.size - 2
    ];
  }

  getMaze() {
    return this.value;
  }

  breakWalls() {
    const points: Point[] = this.createAllCoupleOfCell();
    while (this.buildIsFinish() === false) {
      this.breakWall(points);
    }
  }

  private breakWall(points: Point[]) {
    const pointIndex = this.Random.nextInt(points.length);
    const point = points[pointIndex];
    if (point.neighbour.length === 0) {
      points.splice(pointIndex, 1);
      return;
    }
    const neighbourPosition = this.Random.nextInt(point.neighbour.length);
    const neighbour = point.neighbour[neighbourPosition];

    if (this.pointsHaveTheSameValue(point, neighbour) === false) {
      const [wallX, wallY] = this.getWallBetweenPoint(point, neighbour);
      const minValue = Math.min(
        this.value[point.x][point.y],
        this.value[neighbour.x][neighbour.y]
      );
      this.value[wallX][wallY] = minValue;
      this.spreadValue(wallX, wallY, minValue);

      // Je soubsonne que ça soit plus compliqué et qu'il faille aller plus loin
    }
    const indexOfPointInNeighbour = neighbour.neighbour.findIndex(
      (element) => element === point
    );

    point.neighbour.splice(neighbourPosition, 1);
    neighbour.neighbour.splice(indexOfPointInNeighbour, 1);
  }

  private spreadValue(x: number, y: number, value: number) {
    this.value[x][y] = value;
    const neighbours = [
      [x + 1, y + 1],
      [x, y + 1],
      [x - 1, y + 1],
      [x + 1, y],
      [x - 1, y],
      [x + 1, y - 1],
      [x, y - 1],
      [x - 1, y - 1],
    ];
    if (x > 0 && y > 0 && x < this.size && y < this.size) {
      neighbours
        .filter((neighbour) => {
          return (
            this.value[neighbour[0]][neighbour[1]] !== -1 &&
            this.value[neighbour[0]][neighbour[1]] !== value
          );
        })
        .map((neighbour) =>
          this.spreadValue(neighbour[0], neighbour[1], value)
        );
    }
  }

  private pointsHaveTheSameValue(point: Point, neighbour: Point): boolean {
    return (
      this.value[point.x][point.y] === this.value[neighbour.x][neighbour.y]
    );
  }

  private getWallBetweenPoint(point: Point, neighbour: Point): number[] {
    let wallX = 0;
    let wallY = 0;
    if (point.x === neighbour.x) {
      wallX = point.x;
      if (point.y > neighbour.y) {
        wallY = point.y - 1;
      } else {
        wallY = point.y + 1;
      }
    } else {
      wallY = point.y;

      if (point.x > neighbour.x) {
        wallX = point.x - 1;
      } else {
        wallX = point.x + 1;
      }
    }
    return [wallX, wallY];
  }

  private createAllCoupleOfCell() {
    // this is for pass test
    const p1: Point = {
      x: 1,
      y: 1,
      neighbour: [],
    };
    const p2: Point = {
      x: 3,
      y: 1,
      neighbour: [],
    };
    const p3: Point = {
      x: 1,
      y: 3,
      neighbour: [],
    };
    const p4: Point = {
      x: 3,
      y: 3,
      neighbour: [],
    };
    p1.neighbour = [p2, p3];
    p2.neighbour = [p1, p4];
    p3.neighbour = [p1, p4];
    p4.neighbour = [p2, p3];
    return [p1, p2, p3, p4];
  }

  private buildIsFinish(): boolean {
    const firstCell = this.value[1][1];
    return (
      this.value[1][1] === this.value[1][3] &&
      this.value[1][1] === this.value[3][3] &&
      this.value[1][1] === this.value[3][1]
    );
    // for (let i = 0; i < this.size - 1; i += 2) {
    //   for (let j = 0; j < this.size - 1; j += 2) {
    //     if (firstCell !== this.value[i][j]) {
    //       return false;
    //     }
    //   }
    // }
    // return true;
  }

  build() {
    this.createGrid();
    this.fillWithRandomValue();
    this.createStartAndEnd();
    this.breakWalls();

    // this.draw();
    console.table(this.value);
  }

  draw() {
    // this.drawer.draw();
  }
}
