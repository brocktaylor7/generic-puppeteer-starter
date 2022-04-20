import puppeteer, { Page } from 'puppeteer';
import path from 'path';

async function importLibsToPage(page: Page): Promise<void> {
    await page.addScriptTag({
        path: path.resolve('dist/browser-imports.js'),
    });
}

export async function run() {
    await puppeteer.launch({ headless: false, defaultViewport: null }).then(async (browser) => {
        const page = await browser.newPage();

        page.on('console', (message) => console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`));

        await page.goto('https://microsoft.com');

        // uncomment the line below if external pages need to run in the page context (note, you may need to move this line depending on when the libraries need to access the page).
        // await importLibsToPage(page);
    });
}

run();
