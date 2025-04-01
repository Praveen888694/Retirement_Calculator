import { $ } from '@wdio/globals';
class LaunchPage {

    async launchRetirementPage(){
        await browser.maximizeWindow();
        await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
        await browser.maximizeWindow();
        const title = await browser.getTitle();
        logger.info('\n=== Page Title ===');
        logger.info(title);
        logger.info('=================\n');
        try {
        const cookieButton = await $("//*[@class='onetrust-close-btn-handler onetrust-close-btn-ui banner-close-button ot-close-icon']");
        if (await cookieButton.isDisplayed() && await cookieButton.isClickable()) {
            await cookieButton.click();
            await takeScreenshot('cookie_consent');
        }
    } catch (error) {
        logger.info('Cookie consent button not found or not clickable, continuing...');
    }
    }
}

module.exports = new LaunchPage();