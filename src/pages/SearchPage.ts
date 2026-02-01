import BasePage from "../base/BasePage";

export default class SearchPage extends BasePage {

  private searchWrapper = this.page.locator(
    'div[class*="SearchBar__AnimationWrapper"]'
  );

  private searchInput = this.page.locator(
    'input[class*="SearchBarContainer__Input"]'
  );

  private productCards = this.page.locator(
    'div[role="button"].tw-relative.tw-h-full'
  );

  async searchProduct(item: string) {
    await this.searchWrapper.click();
    await this.searchInput.fill(item);
    await this.searchInput.press('Enter');
  }

  async selectProductByName(productName: string) {
    await this.productCards.first().waitFor({ state: 'visible' });

    const count = await this.productCards.count();
    console.log("Total products found:", count);

    for (let i = 0; i < count; i++) {
      const product = this.productCards.nth(i);

      const nameElement = product.locator(
        'div.tw-text-300.tw-font-semibold.tw-line-clamp-2'
      ).first();

      const actualName = (await nameElement.innerText()).trim();
      console.log("Checking:", actualName);

      if (actualName.toLowerCase().includes(productName.toLowerCase())) {
        await nameElement.scrollIntoViewIfNeeded();
        await nameElement.click({ force: true }); 
        return;
      }

    }

    throw new Error(`Product not found: ${productName}`);
  }


}
