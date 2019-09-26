const puppeteer = require('puppeteer');

const content = {
	myAddress: {
		addressee: 'Dr Jeb Kerman',
		address: [
			'1 Kerbal way',
			'Kerbal City',
			'K34 k43',
			'Kerbal Land'
		]
	},
	yourAddress: {
		addressee: 'Mr Bob Kerman',
		address: [
			'2 Kerbal way',
			'Kerbal City',
			'K34 k43',
			'Kerbal Land'
		]
	},
	invoice: {
		addressee: 'Mr Bob Kerman',
		accountNumber: '3432408'
	}
};

async function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function printPDF() {
	const browser = await puppeteer.launch({headless: true, args: ['-webkit-print-color-adjust']});
	const page = await browser.newPage();
	await page.goto('http://localhost:3000', {waitUntil: 'networkidle0'});
	await timeout(2000);

	page.evaluate((letterContentString) => {
		const letterContent = JSON.parse(letterContentString);

		render(letterContent);
	}, JSON.stringify(content));

	await page.pdf({
		path: 'pdfs/test.pdf',
		format: 'A4',
		printBackground: true
	});

	await browser.close();
};

printPDF();