import { SVG } from "@svgdotjs/svg.js";
import { MazeConfig } from "./MazeConfig";

export default class Maze {
  constructor(params: MazeConfig, Random: Random) {}
  build() {
    const draw = SVG().addTo("body").size(300, 300);
    const rect = draw.rect(100, 100).attr({ fill: "#f06" });
  }
}
