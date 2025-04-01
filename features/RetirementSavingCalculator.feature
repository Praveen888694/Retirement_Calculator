Feature: Calculate retirement savings using RetirementSaving Calculator for positive scenario

Background:
Given Customer is on the retirement calculator page

Scenario Outline: Submit the retirement calculator form with required fields and withadjusting default values.
Then Customer should fill "<requiredall>" fields on retirement calculator page
And Customer submits the retirement calculator form
Then Customer should able to see successful message with retirement saving amount for "<requiredall>" fields

Examples:
      | requiredall |
      | required    |
      | all         |

Scenario: Submit the retirement calculator form with default adjusted values
    When Customer should fill "required" fields on retirement calculator page
    Then Customer changes the "default" calculator values on retirement calculator
    And Customer submits the retirement calculator form
    And Customer should able to see successful message with retirement saving amount for "<default>" fields

  Scenario: Customer selects social security option as enable/disable on retirement calculator page
    When Customer selects social security field as "yes" on retirement calculator
    Then Customer should "see" social security fields as visible
    When Customer selects social security field as "no" on retirement calculator
    Then Customer should "not see" social security fields as visible

Scenario Outline: Customer checking the error message for retirement calculator with different set of invalid sets data
  
    When Customer should fill "<invalidsetofTestdata>" fields on retirement calculator page
    And Customer submits the retirement calculator form
    Then Customer should see error message for "<invalidsetdata>" fields

    Examples:
      | invalidsetofTestdata            |
      | all empty                       |
      | invalid age                     |
      | age greater than retirement age |
      | age greater than 120            |
