enum typeOfCell {
  square,
  exagonal,
  octogonal,
  triangular,
}

enum shapeOfTheMaze {
  hexagonal,
  circular,
  triangular,
  rectangular,
}

enum typeOfSolution {
  longest,
  shortest,
}

interface MazeConfig {
  typeOfCell: typeOfCell;
  shapeOfTheMaze: shapeOfTheMaze;
  whereToStart: String;
  color: String;
  size: Number;
  typeOfSolution: typeOfSolution;
  crossing: Boolean;
  manualSolvingSystem: Boolean;
}

export { MazeConfig, shapeOfTheMaze, typeOfCell, typeOfSolution };

/* 
  - type of cell (Square, Exagonal, Octogonal, triangular)
  - Shape of the Maze (Hexagonal, circular, triangular, rectangular ...)
  - Where to start
  - Color
  - Size
  - Type of solution (longest, shortest)
  - Crossing
  - Manual solving system
 */
