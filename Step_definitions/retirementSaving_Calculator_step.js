import { Given, When, Then } from '@wdio/cucumber-framework';
import RetirementCalculatorPage from '../PageObjects/RetirementCalculatorPage';

// Step Definitions

Given(/^Customer is on the retirement calculator page$/, async () => {
    await RetirementCalculatorPage.openPageUrl();
});

When(/^Customer should fill "([^"]*)" fields on retirement calculator page$/, async function(string){
    await RetirementCalculatorPage.enterCustomerDetails(string);
    
});

When(/^Customer submits the retirement calculator form$/, async function(){
    await RetirementCalculatorPage.submitCalculatorForm();
    
});

Then(/^Customer should see error message for "([^"]*)" fields$/, async function(string){
	await RetirementCalculatorPage.submitValidateErrorMessage(string);
});

When(/^Customer selects social security field as "([^"]*)" on retirement calculator$/, async function(string){
    await RetirementCalculatorPage.selectSocialSecurityOption(string);
    
});

Then(/^Customer should "([^"]*)" social security fields as visible$/, async function(string){
    await RetirementCalculatorPage.assertYesNoSocialSecurity(string);
});

Then(/^Customer should able to see successful message with retirement saving amount for "([^"]*)" fields$/, async function(string){
    await RetirementCalculatorPage.assertRetirementAmount(string);
});

Then(/^Customer changes the "([^"]*)" calculator values on retirement calculator$/, async function(string){
    await RetirementCalculatorPage.enterDefaultValues(string);
    
});