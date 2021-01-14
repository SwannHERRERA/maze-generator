import { Color, Svg, SVG } from "@svgdotjs/svg.js";
import Maze from "../Maze";

class MazeDrawer {
  maze: Maze;
  drawer: Svg;
  size: number;
  constructor(maze: Maze) {
    const scale = 20;
    const htmlOutput = "#result";

    this.clearDest(htmlOutput);

    this.maze = maze;
    this.size = this.maze.size;

    this.drawer = SVG().addTo(htmlOutput).size(this.size, this.size);
    this.draw();

    this.drawer.transform({
      translateX: this.size * scale,
      translateY: this.size * scale,
      scale: scale,
    });
    // this.drawer.scale(20);
  }

  private clearDest(dest: string) {
    const element = document.querySelector(dest);
    if (!element) {
      throw new Error(`element ${dest} not find`);
    }
    element.innerHTML = "";
  }

  private draw() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const color = this.selectColor(i, j);
        this.drawer.rect(1, 1).attr({ fill: color }).move(i, j);
      }
    }
  }

  private selectColor(i: number, j: number) {
    let color;
    switch (this.maze.value[i][j]) {
      case -1:
        color = "#03071e";
        break;
      case 0:
        color = "#370617";
        break;
      case 1:
        color = "#6a040f";
        break;
      case 2:
        color = "#9d0208";
        break;
      case 3:
        color = "#d00000";
        break;
      case 4:
        color = "#dc2f02";
        break;
      case 5:
        color = "#e85d04";
        break;
      case 6:
        color = "#f48c06";
        break;
      case 7:
        color = "#faa307";
        break;
      case 8:
        color = "#ffba08";
        break;
      case 9:
        color = "#ffb703";
        break;

      default:
        throw new Error("unexpected value should be between -1 and 9");
    }
    return color;
  }
}

export default MazeDrawer;
