import { Svg, SVG } from "@svgdotjs/svg.js";
import { MazeConfig } from "./MazeConfig";

export default class Maze {
  draw: Svg;
  result: Element | undefined;
  destId: string;

  constructor(params: MazeConfig, Random: Random) {
    this.destId = "#result";
    this.setResult();
    this.clearResult();
    this.draw = SVG().addTo(this.destId).size(1000, 1000);
    this.createOutSideWall();
    this.build();
  }

  setResult() {
    const resultOption = document.querySelector(this.destId);
    if (resultOption) {
      this.result = resultOption;
    }
  }
  clearResult() {
    if (this.result) {
      this.result.innerHTML = "";
    } else {
      throw new Error("Result is not define");
    }
  }

  build() {
    const rect = this.draw.rect(100, 100).attr({ fill: "#f97316" });
    rect.animate().move(150, 150);
  }

  createOutSideWall() {
    const topWall = this.draw.rect(1000, 10).attr({ fill: "#f97316" });
    const leftWall = this.draw.rect(10, 1000).attr({ fill: "#f97316" });
  }
}
