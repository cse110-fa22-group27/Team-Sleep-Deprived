
const { toMatchImageSnapshot } = require('jest-image-snapshot');

describe('Sign-up snapshot testing', () => {
	it('Testing for any changes to the sign-up page', async () => {
		const page = await browser.newPage();
		await page.goto('http://localhost:5500/source/html/signup.html');
		expect.extend({ toMatchImageSnapshot });
		await page.setViewport({ width: 1280, height: 1400 });
		
		const image = await page.screenshot({ fullPage: true });
		expect(image).toMatchImageSnapshot();
	});
});