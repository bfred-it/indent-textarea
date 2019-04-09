const puppeteer = require('puppeteer');

module.exports = async function withBrowser(t, run) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setContent('<textarea>');

	t.context.field = await page.$('textarea');
	console.log(t.context.field)

	try {
		await run(t, page);
	} finally {
		await page.close();
		await browser.close();
	}
};
