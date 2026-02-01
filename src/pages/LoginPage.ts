import BasePage from "../base/BasePage";

export default class LoginPage extends BasePage {

  private phoneInput = this.page.locator('[data-test-id="phone-no-text-box"]');
  private continueBtn = this.page.getByText('Continue');

  async login(mobile: string) {
    await this.phoneInput.waitFor({ state: 'visible' });
    await this.phoneInput.fill(mobile);
    await this.continueBtn.click();
  }

  async waitForManualOtp(seconds = 20) {
    console.log(`Waiting ${seconds}s for OTP...`);
    await this.page.waitForTimeout(seconds * 1000);
  }
}
