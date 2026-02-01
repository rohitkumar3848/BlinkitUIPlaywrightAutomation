import BasePage from "../base/BasePage";

export default class CartPage extends BasePage {

  private proceedBtn = this.page.getByText('Proceed');

  async proceedToPay() {
    await this.proceedBtn.waitFor({ state: 'visible' });
    await this.proceedBtn.click();
  }
}
