const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { userEmail, userPassword, } = require('../user');


test("test", async ({ page }) => {
  // Go to https://netology.ru/free/management#/
  await page.goto("https://netology.ru/free/management#/");

  // Click a
  await page.click("a");
  await expect(page).toHaveURL("https://netology.ru/");

  // Click text=Учиться бесплатно
  await page.click("text=Учиться бесплатно");
  await expect(page).toHaveURL("https://netology.ru/free");

  page.click("text=Бизнес и управление");

  // Click text=Как перенести своё дело в онлайн
  await page.click("text=Как перенести своё дело в онлайн");
  await expect(page).toHaveURL(
    "https://netology.ru/programs/kak-perenesti-svoyo-delo-v-onlajn-bp"
  );
});

test("Successful authorization", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });
  const page = await browser.newPage("https://netology.ru/?modal=sign_in");
  await page.goto("https://netology.ru/?modal=sign_in");
  
  await page.fill('[placeholder="Email"]', userEmail);

  await page.fill('[placeholder="Пароль"]', userPassword);

  await page.click('[data-testid="login-submit-btn"]');
  await expect(page).toHaveURL("https://netology.ru/profile");
  await expect(page.locator("h2")).toContainText(["Мои курсы и профессии"]);
  await page.screenshot({ path: "screenshotSuccessful.png", fullPage: true });
  await browser.close();
}, 5000);

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
  await page.screenshot({ path: "screenshotFailed.png", fullPage: true });
  await browser.close();
}, 5000);

