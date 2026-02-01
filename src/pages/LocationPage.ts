import BasePage from "../base/BasePage";

export default class LocationPage extends BasePage {

  private detectBtn = this.page.getByRole('button', { name: 'Detect my location' });

  async detectLocation() {
    await this.detectBtn.waitFor({ state: 'visible' });
    await this.detectBtn.click();
  }
}
