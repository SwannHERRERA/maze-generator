# features/bank-account.feature
Feature: create Grid

  Scenario: test init grid function
    Given I want to create a grid of isolate cell of size <size>
    When when i run createGrid
    Then It should return a array with isolate cell of 0 by -1 of size <size>

    Examples:
      | size |
      | 7    |
      | 5    |
      | 4    |
      | 3    |