import BasePage from "../base/BasePage";

export default class HomePage extends BasePage {


  private loginBtn = this.page.getByText('Login');
  private overlay = this.page.locator("//div[contains(@class,'Spin')]");

 
  async clickLogin() {

    await this.overlay.first().waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
    await this.loginBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.loginBtn.click();
  }
}

