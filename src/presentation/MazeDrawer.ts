import { Color, Svg, SVG } from "@svgdotjs/svg.js";
import Maze from "../Maze";
const colors: string[] = [];
for (let g = 0; g < 500; g += 1) {
  colors.push(
    "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
  );
}
class MazeDrawer {
  maze: Maze;
  drawer: Svg;
  htmlOutput: string;
  scale: number;
  resolveMode = false;

  constructor(maze: Maze) {
    this.scale = 20;
    this.htmlOutput = "#result";
    this.maze = maze;
    this.drawer = SVG();
  }

  private clearDest() {
    const element = document.querySelector(this.htmlOutput);
    if (!element) {
      throw new Error(`element ${this.htmlOutput} not find`);
    }
    element.innerHTML = "";
  }

  draw(resolveMode: boolean = false) {
    if (resolveMode) {
      this.resolveMode = resolveMode;
    }
    this.clearDest();
    this.drawer = SVG()
      .addTo(this.htmlOutput)
      .size(this.maze.size, this.maze.size);
    this.drawer.transform({
      translateX: (this.maze.size * this.scale) / 2,
      translateY: (this.maze.size * this.scale) / 2,
      scale: this.scale,
    });
    for (let i = 0; i < this.maze.size; i++) {
      for (let j = 0; j < this.maze.size; j++) {
        const color = this.selectColor(i, j);
        this.createCell(color, i, j);
      }
    }
  }

  private createCell(color: string, i: number, j: number) {
    this.drawer.rect(1, 1).attr({ fill: color }).move(i, j);
  }

  private selectColor(i: number, j: number) {
    if (this.maze.value[i][j] === -1) {
      return "#ccccccc";
    }

    if (this.maze.value[i][j] === -20) {
      return "#a3e635";
    }

    if (this.maze.value[i][j] > colors.length) {
      throw new Error("Invalid color selected");
    }

    if (this.resolveMode) {
      return (
        "#" + (16777215 - this.maze.value[i][j]).toString(16).padStart(6, "0")
      );
    }

    return colors[this.maze.value[i][j]];
  }
}

export default MazeDrawer;
