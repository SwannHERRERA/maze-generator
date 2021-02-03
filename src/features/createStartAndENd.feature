Feature: create start and end

  Scenario: start at top center
    Given i want to create a Maze size 5 with start and stop
    When i try to create the start and the end
    Then the maze should be as expected with start and end