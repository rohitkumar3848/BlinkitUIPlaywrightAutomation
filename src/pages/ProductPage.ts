import BasePage from "../base/BasePage";

export default class ProductPage extends BasePage {

  // Add to cart button
  private addToCartBtn = this.page.getByRole("button", { name: /add to cart/i }).first();

  // View Cart button
  private viewCartBtn = this.page.locator("xpath=//div[contains(@class,'CartButton__CartIcon')]");


  async addToCart() {
    await this.addToCartBtn.click();
  }

  async openCart() {
    await this.viewCartBtn.click();
  }

}
