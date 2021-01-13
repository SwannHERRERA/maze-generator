# features/bank-account.feature
Feature: create Grid

  Scenario: test init grid function
    Given I want to create a grid of isolate cell
    When when i run createGrid
    Then It should return a array with isolate cell of 0 by -1
