import { test, expect } from '@playwright/test';
import { config } from '../src/utils/config';

import LocationPage from '../src/pages/LocationPage';
import HomePage from '../src/pages/HomePage';
import LoginPage from '../src/pages/LoginPage';
import SearchPage from '../src/pages/SearchPage';
import ProductPage from '../src/pages/ProductPage';
import CartPage from '../src/pages/CartPage';
import PaymentPage from '../src/pages/PaymentPage';

test('Blinkit Order Flow', async ({ page }) => {

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
  await login.waitForManualOtp(25);

  // 3. Search product
  await search.searchProduct('Kurkure');

  console.log("The item is searched Milk");

  // 4. Select product from list 'Amul Gold Milk'
  await search.selectProductByName("Kurkure Masala Munch Crisps");

  console.log("Searching is done");

  console.log("add to cart start");

  // 5. Add to cart
  await product.addToCart();

  console.log("add to cart end");
  //await page.pause();

  // 6. Open cart
  await product.openCart();

  console.log("cart is openend");

  console.log("Cart is proceed click start");
  // 7. Proceed to pay
  await cart.proceedToPay();

  console.log("Cart is proceed click end");

  console.log("payment page is start");
  // 8. Verify payment page
  const isOpened = await payment.isPaymentPageOpened();
  expect(isOpened).toBeTruthy();

  console.log("Payment page is end")
});


// TESTCASESS---

// | Namkeen  | Haldiram's Nagpur Sev Bhujia  |
//      | Bread    | English Oven Milk Bread |

//      | Biscuits | Parle-G Glucose Biscuit |
//       | Kurkure  | Kurkure Masala Munch Crisps |
//     | Milk     | Amul Gold Milk |

