const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 250 });
    const page = await browser.newPage();
    await page.goto('http://localhost:4200/', { waitUntil: "domcontentloaded" });
    await page.setViewport({
        width: 1200,
        height: 800
    });
    page.on('console', msg => console.log('PAGE LOG:', msg));

    // log out the headers that are currently visible before scrolling
    let oldHeaderCells = await page.$$eval('.ag-header-cell-text', headerCells => headerCells.map(headerCell => headerCell.textContent));
    console.log('beforeScroll', oldHeaderCells);

    // scroll to 550px, since the grid is 600px
    await page.$eval('.ag-body-horizontal-scroll-viewport', bar => {
        bar.scroll({
            left: 550,
            behavior: 'smooth'
        })
    });

    // log out the headers that are currently visible after scrolling
    let newHeaderCells = await page.$$eval('.ag-header-cell-text', headerCells => headerCells.map(headerCell => headerCell.textContent));
    console.log('afterScroll', newHeaderCells);
    await browser.close();
})();