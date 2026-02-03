import { test, expect } from '@playwright/test';
import { config } from '../src/utils/config';

import LocationPage from '../src/pages/LocationPage';
import HomePage from '../src/pages/HomePage';
import LoginPage from '../src/pages/LoginPage';
import SearchPage from '../src/pages/SearchPage';
import ProductPage from '../src/pages/ProductPage';
import CartPage from '../src/pages/CartPage';
import PaymentPage from '../src/pages/PaymentPage';
import { takeScreenshot } from '../src/utils/Screenshot';


test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({
      path: `screenshots/FAILED-${testInfo.title}.png`,
      fullPage: true,
    });
  }
});

test('Blinkit Order Flow', async ({ page },testInfo) => {

  await page.goto(config.url);

  const location = new LocationPage(page);
  const home = new HomePage(page);
  const login = new LoginPage(page);
  const search = new SearchPage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);
  const payment = new PaymentPage(page);

  // 1. Detect location
  await location.detectLocation();

  // 2. Login
  await home.clickLogin();
  await login.login(config.mobile);
  await login.waitForManualOtp(config.otpTime);

  //Take ScreenShot of HomePage
  await takeScreenshot(page, testInfo, config.homePage);

  // 3. Search product
  await search.searchProduct(config.searchProduct);


  // 4. Select product from list 'Amul Gold Milk'
  await search.selectProductByName(config.selectProduct);


  // 5. Add to cart
  await product.addToCart();


  // 6. Open cart
  await product.openCart();


  // 7. Proceed to pay
  await cart.proceedToPay();

  //Take ScreenShot of Payment Page
  await takeScreenshot(page, testInfo, config.lastpage);

  // 8. Verify payment page
  const isOpened = await payment.isPaymentPageOpened();
  expect(isOpened).toBeTruthy();

});


// TESTCASESS---

// | Namkeen  | Haldiram's Nagpur Sev Bhujia  |
//      | Bread    | English Oven Milk Bread |
//      | Biscuits | Parle-G Glucose Biscuit |
//       | Kurkure  | Kurkure Masala Munch Crisps |
//     | Milk     | Amul Gold Milk |

