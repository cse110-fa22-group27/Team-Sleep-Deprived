
const { toMatchImageSnapshot } = require('jest-image-snapshot');

describe('Sign-in snapshot testing', () => {
	beforeAll(async () => {
		const page = await browser.newPage();
		await page.goto('http://localhost:5500/source/html/signin.html');
	});

	it('Testing for any changes to the sign-in page', async () => {
		const page = await browser.newPage();
		expect.extend({ toMatchImageSnapshot });
		await page.setViewport({ width: 1280, height: 1400 });
		
		const image = await page.screenshot({ fullPage: true });
		expect(image).toMatchImageSnapshot();
	});
});