Feature: Fill with random value

  Fill the grid with random value
  here the value are fake by FakeRand

  Scenario: Normal fill on little Maze
    Given a Maze of size 5
    When I call fillWithRandomValue
    Then the value should be as expected
