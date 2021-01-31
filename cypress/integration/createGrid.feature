# features/bank-account.feature
Feature: create Grid

  Scenario Outline: test init grid function
    Given I want to create a grid of isolate cell of size <size>
    When i run createGrid
    Then It should return a array with isolate cell of 0 by -1 of size <size>

    Examples:
      | size |
      | 7    |
      | 5    |
      | 4    |
      | 3    |

  Scenario: test very small grid
    Given a size of 2
    When i want to create a maze it should throw an error