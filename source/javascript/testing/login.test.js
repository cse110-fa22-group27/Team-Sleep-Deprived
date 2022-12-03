
const { toMatchImageSnapshot } = require('jest-image-snapshot');
beforeAll(async () => {
	const page = await browser.newPage();
	await page.goto('http://localhost:5500/source/html/login.html');
});

describe('Log-in snapshot testing', () => {
	it('Testing for any changes to the log-in page', async () => {
		const page = await browser.newPage();
		expect.extend({ toMatchImageSnapshot });
		await page.setViewport({ width: 1280, height: 1400 });
		
		const image = await page.screenshot({ fullPage: true });
		expect(image).toMatchImageSnapshot();
	});
});