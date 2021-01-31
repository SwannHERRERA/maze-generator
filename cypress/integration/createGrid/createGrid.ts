import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import Maze from "../../../src/Maze";
import { assert, expect } from "chai";
import Random from "../../../src/Random";
import getDefaultMazeConfig from "../../../src/step-definitions/MazeTestHelper";
import { MazeConfig } from "../../../src/MazeConfig";
import FakeRand from "../../../src/FakeRand";

const size: number = 0;
const config: MazeConfig = getDefaultMazeConfig();
const random: Random = new FakeRand();

let maze: Maze;

Given("I want to create a grid of isolate cell of size {number}", (size) => {
  config.size = size;
  maze = new Maze(config, random);
});

When("i run createGrid", () => {
  maze.createGrid();
});

When("i want to create a maze it should throw an error", () => {
  expect(() => new Maze(config, random)).to.throw();
});

Then(
  "It should return a array with isolate cell of 0 by -1 of size {number}",
  () => {
    const expected = new Map();
    expected.set(3, [
      [-1, -1, -1],
      [-1, 0, -1],
      [-1, -1, -1],
    ]);
    expected.set(4, [
      [-1, -1, -1, -1],
      [-1, 0, -1, -1],
      [-1, -1, -1, -1],
      [-1, -1, -1, -1],
    ]);
    expected.set(5, [
      [-1, -1, -1, -1, -1],
      [-1, 0, -1, 0, -1],
      [-1, -1, -1, -1, -1],
      [-1, 0, -1, 0, -1],
      [-1, -1, -1, -1, -1],
    ]);
    expected.set(7, [
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, 0, -1, 0, -1, 0, -1],
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, 0, -1, 0, -1, 0, -1],
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, 0, -1, 0, -1, 0, -1],
      [-1, -1, -1, -1, -1, -1, -1],
    ]);
    const actual = maze.getMaze();

    assert.deepEqual(actual, expected.get(size));
  }
);
