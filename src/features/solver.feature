Feature: Solver

  Find the shortest path between start and end

  Scenario: Testing Different mazes
    Given Different mazes
    When I want to solve them
    Then the length is as expected

# Scenario: Testing that from strat when i follow green line i found end
#   Given mazes with solution
#   When i follow the green line from start
#   Then i fond end