const { test, expect, chromium } = require("@playwright/test");
//const { chromium } = require("playwright");
//const { email, password } = require("../user");
const user = require("../user");


test("test", async ({ page }) => {
  // Go to https://netology.ru/free/management#/
  await page.goto("https://netology.ru/free/management#/");

  // Click a
  await page.click("a");
  await expect(page).toHaveURL("https://netology.ru/");

  // Click text=Учиться бесплатно
  await page.click("text=Учиться бесплатно");
  await expect(page).toHaveURL("https://netology.ru/free");

  //page.click("text=Бизнес и управление");

  // Click text=Как перенести своё дело в онлайн
  //await page.click("text=Как перенести своё дело в онлайн");
  //await expect(page).toHaveURL(
  //  "https://netology.ru/programs/kak-perenesti-svoyo-delo-v-onlajn-bp"
  //);
});

test("Successful authorization", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
  });
  const page = await browser.newPage("https://netology.ru/?modal=sign_in");
  await page.goto("https://netology.ru/?modal=sign_in");

  //  await page.fill('[placeholder="Email"]', '');
  //  await page.fill('[placeholder="Пароль"]', '');

  await page.fill('[placeholder="Email"]', user.email);
  await page.fill('[placeholder="Пароль"]', user.password);

  //  await page.getByPlaceholder('Email').click();
  //  await page.getByPlaceholder('Email').fill(user.email);
  //  await page.getByPlaceholder('Пароль').click();
  //  await page.getByPlaceholder('Пароль').fill(user.password);
  //  await page.getByTestId('login-submit-btn').click();


  await page.click('[data-testid="login-submit-btn"]');

  await expect(page.locator("h2")).toContainText(["Моё обучение"]);
  await page.screenshot({ path: "screenshotSuccessful.png", fullPage: false });
  browser.close();
}, 60000);

test("Unsuccessful authorization", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });
  const page = await browser.newPage("https://netology.ru/?modal=sign_in");
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', 'dsfjh@kkjf.com');
  await page.fill('[placeholder="Пароль"]', 'sdfw');
  await page.click('[data-testid="login-submit-btn"]');
  const error = await page.locator('[data-testid="login-error-hint"]');
  await expect(error).toHaveText("Вы ввели неправильно логин или пароль");
  await page.screenshot({ path: "screenshotFailed.png", fullPage: false });
  await browser.close();
}, 5000);

