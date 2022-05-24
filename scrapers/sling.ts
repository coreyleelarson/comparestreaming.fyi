import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.sling.com/service");
  await page.waitForSelector("#base-service-cards");
  await page.waitForTimeout(3000).then(() => console.log("Waited 3 seconds!"));
  const [heading] = await page.$x(
    "//h2[contains(text(), 'Sling TV Services')]"
  );
  await browser.close();
})();
