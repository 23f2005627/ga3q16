const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [6,7,8,9,10,11,12,13,14,15];
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://YOUR_BASE_URL/?seed=${seed}`; // replace with actual URL pattern
    await page.goto(url);

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(cell => parseFloat(cell.innerText))
        .filter(num => !isNaN(num))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += pageSum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
