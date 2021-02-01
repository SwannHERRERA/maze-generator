Feature: build is finish

  Scenario: build is finish
    Given A maze with only wall and 1 color
    When I run build is finish
    Then The returned value is true

  Scenario: build is not finish
    Given A maze with wall and many color
    When I run build is finish
    Then The returned value is false