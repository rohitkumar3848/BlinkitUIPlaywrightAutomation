import BasePage from "../base/BasePage";

export default class PaymentPage extends BasePage {

  private paymentHeader = this.page.getByText('Select delivery address');

  async isPaymentPageOpened(): Promise<boolean> {
    try {
      await this.paymentHeader.waitFor({ state: 'visible', timeout: 10000 });
      return await this.paymentHeader.isVisible();
    } catch {
      return false;
    }
  }
}
