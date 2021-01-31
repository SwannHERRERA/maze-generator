Feature: create start and end

  Scenario: start at top center
    Given a Maze of size 5
    When i try to create the start and the end
    Then the maze should be as expected with start and end