Feature: Break Walls

  Scenario: maze of 5
    Given a maze of 5 with cell filled
    When i break Walls
    Then The maze sould be as expected