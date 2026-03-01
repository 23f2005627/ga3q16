const { chromium } = require('playwright');

const BASE_URL = "https://sanand0.github.io/tdsdata/js_table/";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 6; seed <= 15; seed++) {
    const url = `${BASE_URL}?seed=${seed}`;
    console.log(`Visiting: ${url}`);

    await page.goto(url, { waitUntil: "networkidle" });

    // Wait for table to load (important because it's JS generated)
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells.map(cell => cell.innerText)
    );

    let pageTotal = 0;

    for (let value of numbers) {
      const num = parseFloat(value.replace(/,/g, ""));
      if (!isNaN(num)) {
        pageTotal += num;
      }
    }

    console.log(`Seed ${seed} total: ${pageTotal}`);
    grandTotal += pageTotal;
  }

  console.log("=================================");
  console.log("FINAL TOTAL:", grandTotal);
  console.log("=================================");

  await browser.close();
})();
