import { $ } from '@wdio/globals';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { commonUtils } from '../Utils/CommonUtils.js';
import { logger } from '../Utils/logUtils.js';
import { takeScreenshot } from '../Utils/screenshotUtils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const retirementTestData = JSON.parse(
    readFileSync(join(__dirname, '../Test_Data/retirementTestData.json'), 'utf8')
);


class RetirementPage {
    get currentAgeInput() {return $('#current-age');}
    get retirementAgeInput() {return $('#retirement-age');}
    get yourAnnualIncomeInput() {return $('#current-income');}
    get spouseAnnualIncomeInput() {return $('#spouse-income');}
    get currentTotalSavingsInput() {return $('#current-total-savings');}
    get currentAnnualSavingsInput() {return $('#current-annual-savings');}
    get savingIncreaseRateInput() {return $('#savings-increase-rate');}
    get successResultMessage() {return $('#result-message');}
    get successResultChart() {return $('#results-chart');}
    get monthlySavingsResultsTable() {return $('#monthly-savings-results-table');}
    get submitRetirement () {return $('//*[@data-tag-id="submit"]');}
    get requiredFieldAlert () {return $('#calculator-input-alert');}
    get invalidCurrentAge () {return $('#invalid-current-age-error');}
    get invalidRetirementAge () {return $('#invalid-retirement-age-error');}
    get ageErrorLabel(){return $('//*[@for = "current-age"]');}
    get retirementAgeErrorLabel(){return $('//*[@for = "retirement-age"]');}
    get currentIncomeErrorLabel(){return $('//*[@for = "current-income"]');}
    get currentSavingErrorLabel(){return $('//*[@for = "current-total-savings"]');}
    get yesSocialSecurity() {return $('#yes-social-benefits');}
    get noSocialSecurity() {return $('#no-social-benefits');}
    get singleMartialStatus() {return $('#single');}
    get martialStatusToggle() {return $('#marital-status-toggle-group');}  
    get marriedMartialStatus() {return $('#married');}
    get overrideSocialSecurity() {return $('#social-security-override');}
    get adjustDefaultValues() {return $('=Adjust default values');}
    get inputAdditionalIncome() {return $('#additional-income');}
    get inputRetirementDuration() {return $('#retirement-duration');}
    get inputRetirementAnnualIncome() {return $('#retirement-annual-income');}
    get inputPreRetirementROI() {return $('#pre-retirement-roi');}
    get inputPostRetirementROI() {return $('#post-retirement-roi');}
    get buttonSaveChanges() {return $("//*[text()='Save changes']");}

    async openPageUrl () {
        logger.info('============================================');
            await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
            await browser.maximizeWindow();
            logger.info('Successfully URL launched');
            try {
                const cookieButton = await $("//*[@class='onetrust-close-btn-handler onetrust-close-btn-ui banner-close-button ot-close-icon']");
                if (await cookieButton.isDisplayed() && await cookieButton.isClickable()) {
                    await cookieButton.click();         
                    await takeScreenshot('cookie_consent');
                }
            } catch (error) {
                console.log('Cookie consent button not found or not clickable, continuing...');
            } 
    }

    async selectMaritalStatusOption(status) {
        try {
            if (status === 'single') {
                await commonUtils.clickJS(this.singleMartialStatus);
                await takeScreenshot("Marital status");
            } else if(status === 'married') {
                await commonUtils.clickJS(this.marriedMartialStatus);
                await takeScreenshot("Marital status");
            } else {
                throw new Error('Unknown marital status: ${status}');
            }
            logger.info('Selected Marital Status as ' + status);
        } catch (error) {
            logger.error('Failed to select marital status' + status);
        }
    }


    async selectSocialSecurityOption(option) {
        try {
            if (option === 'yes') {
                await commonUtils.clickJS(this.yesSocialSecurity);
                await takeScreenshot("Socialsecurity");
            } else if(option === 'no') {
                await commonUtils.clickJS(this.noSocialSecurity);
                await takeScreenshot("Socialsecurity");
            } else {
                throw new Error('Unknown social security field ${status}');
            }
            logger.info('Social Security options is selected as ' + option);
        } catch (error) {
            logger.error('Failed to select Social Security' + option);
            logger.error(error);
        }
    }

    async enterDefaultValues(string){
        try {
            console.log("clicked on adjust default values button")
            console.log(string)
            logger.info('Entering the default calculator values');
            const testDataobject = retirementTestData[string];
            await commonUtils.click(this.adjustDefaultValues);
            await takeScreenshot("clicked on Adjust Default Button");
            await commonUtils.setValue(this.inputRetirementDuration, testDataobject.retirementDuration)
            await takeScreenshot("Entered Retirement Duration");
            await commonUtils.setValue(this.inputAdditionalIncome, testDataobject.additionalIncome) 
            await takeScreenshot("Entered Additional Income");
            await commonUtils.setValue(this.inputRetirementAnnualIncome, testDataobject.retirementAnnualIncome)
            await takeScreenshot("Entered etirement Annual Income");
            await commonUtils.setValue(this.inputPreRetirementROI, testDataobject.preRetirementROI)  
            await takeScreenshot("Preretirement ROI");
            await commonUtils.setValue(this.inputPostRetirementROI, testDataobject.postRetirementROI)
            await takeScreenshot("Post Retirement ROI");
            await commonUtils.click(this.buttonSaveChanges);
            logger.info('Successfully entering default calculator values');   
        } catch (error){
            logger.error('Failed to enter default calculator values' + error);
        }
    }

    async enterCustomerDetails(string) {
        try {
            logger.info('Entering User Details fields');
            const testDataobject = retirementTestData[string];
            await commonUtils.setValue(this.currentAgeInput, testDataobject.currentAge)
            await takeScreenshot("Current Age");
            await commonUtils.setValue(this.retirementAgeInput, testDataobject.retirementAge)
            await takeScreenshot("Retirement Age")
            await commonUtils.setValue(this.yourAnnualIncomeInput, testDataobject.yourAnnualIncome)
            await takeScreenshot("Annual Income")
            await commonUtils.setValue(this.spouseAnnualIncomeInput, testDataobject.spouseIncome)
            await takeScreenshot("Spouse Annual Income")
            await commonUtils.setValue(this.currentTotalSavingsInput, testDataobject.currentTotalSavings)
            await takeScreenshot("Current Total savings")
            await commonUtils.setValue(this.currentAnnualSavingsInput, testDataobject.annualSavings)
            await takeScreenshot("Current Annual Savings")
            await commonUtils.setValue(this.savingIncreaseRateInput, testDataobject.savingsIncreaseRate)
            await takeScreenshot('customer_details_filled');
            logger.info('Successfully entered the user details');
            if (string === "all") {
                await commonUtils.setValue(this.spouseAnnualIncomeInput, testDataobject.spouseIncome)
                this.selectSocialSecurityOption(testDataobject.socialSecurityOption)
                this.selectMaritalStatusOption(testDataobject.maritalStatus)
                logger.info('Successfully entered all user details');
            }
        } catch (error){
            logger.error('Failed to enter user details fields ' + error);
        }
    } 
    
    async submitValidateErrorMessage(string){
        try {
            const testDataobject = retirementTestData[string];
            if (string === "allEmpty") {
                await expect(this.requiredFieldAlert).toHaveText(testDataobject.errorMessage);
                await expect(this.ageErrorLabel).toHaveText(testDataobject.ageErrorLabel);
                await expect(this.retirementAgeErrorLabel).toHaveText(testDataobject.retireAgeErrorLabel);
                await expect(this.currentIncomeErrorLabel).toHaveText(testDataobject.currentIncomeErrorLabel);
                await expect(this.currentSavingErrorLabel).toHaveText(testDataobject.currentSavingErrorLabel);
            } else if (string === "invalid age") {
                await expect(this.invalidRetirementAge).toHaveText(testDataobject.invalidRetirementAgeErrorMessage);
                await expect(this.invalidCurrentAge).toHaveText(testDataobject.invalidAgeErrorMessage);
                await expect(this.requiredFieldAlert).toHaveText(testDataobject.errorMessage);
            } else if (string === "age greater than retirement age") {
                await expect(this.invalidRetirementAge).toHaveText(testDataobject.invalidRetirementAgeErrorMessage);
                await expect(this.requiredFieldAlert).toHaveText(testDataobject.errorMessage);
            } else if (string === "age greater than 120") {
                await expect(this.invalidCurrentAge).toHaveText(testDataobject.invalidAgeErrorMessage);
                await expect(this.requiredFieldAlert).toHaveText(testDataobject.errorMessage);
            }
            await takeScreenshot(`error_message`);
            logger.info('Successfully verified error message');
            } catch (error){
            console.log("Error");
            logger.error('Failed to verify the error message ' + error);
        }
    }

    async assertYesNoSocialSecurity(optionSocialSecurity) {
        try {
            if (optionSocialSecurity === "see") {
                await expect(this.martialStatusToggle).toBeDisplayed()
                await expect(this.overrideSocialSecurity).toBeDisplayed()
                logger.info('Marital Status and Override text fields are Displayed');
            } else if (optionSocialSecurity === "not see"){
                await expect(this.martialStatusToggle).not.toBeDisplayed()
                await expect(this.overrideSocialSecurity).not.toBeDisplayed()
                logger.info('Marital Status and Override text field should not be Displayed');
            }
        } catch (error){
        logger.error('Failed to display the Marital Status and Override ' + error);
        }
    }

    async assertRetirementAmount(string){
        try {
            const testDataobject = retirementTestData[string];
            if (string === "required") {
                await expect(this.successResultMessage).toHaveText(testDataobject.successMessage);
            } else if (string === "all"){
                await expect(this.successResultMessage).toHaveText(testDataobject.successMessage);
            }
            await expect(this.successResultChart).toBeDisplayed()
            await expect(this.monthlySavingsResultsTable).toBeDisplayed()
            logger.info('Successfully verified the retirement saving amount');
        } catch (error){
            logger.error('Failed to assert the retirement amount ' + error);
        }
    } 


    async submitCalculatorForm() { 
        try {
            await commonUtils.click(this.submitRetirement);
            await takeScreenshot('form_submitted');
            logger.info('Successfully clicked on the Calculate button');
        } catch (error){
            logger.error('Failed to click the Calculate button' + error);
        }
    }
    
}

export default new RetirementPage();
