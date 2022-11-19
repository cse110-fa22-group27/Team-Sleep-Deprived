import { generateReport } from './Report.js';

class ReportGenerator extends HTMLElement { // ReportGeneratorComponent --> use ReportGenerator for actual JS
	constructor() {
		super();
		this.shadowElem = this.attachShadow({ mode: 'open' });
		this.elementRoot = document.createElement('div');
		this.elementRoot.className = 'report-generator-container glass-box';

		// Header (deprecated) //
		/*
		this.generatorHeader = document.createElement('h2');
		this.generatorHeader.className = 'generator-header';
		this.generatorHeader.innerHTML = "Generate Report";
		*/

		// All Form Options //
		this.timeWeeklyOption = document.createElement('option');
		this.timeWeeklyOption.value = 'weekly';
		this.timeWeeklyOption.innerHTML = 'This Week';

		this.timeMonthlyOption = document.createElement('option');
		this.timeMonthlyOption.value = 'monthly';
		this.timeMonthlyOption.innerHTML = 'This Month';

		this.timeYearlyOption = document.createElement('option');
		this.timeYearlyOption.value = 'yearly';
		this.timeYearlyOption.innerHTML = 'This Year';

		// TODO - JS to implement all stored wallets as options //
		this.allWalletOption = document.createElement('option');
		this.allWalletOption.value = 'all';
		this.allWalletOption.innerHTML = 'All Wallets';

		this.pdfDocumentOption = document.createElement('option');
		this.pdfDocumentOption.value = 'pdf';
		this.pdfDocumentOption.innerHTML = 'PDF File';

		this.pngDocumentOption = document.createElement('option');
		this.pngDocumentOption.value = 'png';
		this.pngDocumentOption.innerHTML = 'PNG File';

		// Parent Form Component //
		this.reportForm = document.createElement('form');
		this.reportForm.className = 'report-form';
		this.reportForm.id = 'report-form';
		this.reportForm.action = ''; // TODO (?)

		// Select report time range (dropdown 1) //
		this.reportRangeSelector = document.createElement('select');
		this.reportRangeSelector.id = 'report-range';
		this.reportRangeSelector.name = 'report-range';
		this.reportRangeSelector.value = 'weekly';

		this.reportRangeLabel = document.createElement('label');
		this.reportRangeLabel['for'] = 'report-range';
		this.reportRangeLabel.innerHTML = 'Time Range for Report';
		this.reportRangeSelector.append(this.timeWeeklyOption, this.timeMonthlyOption, this.timeYearlyOption);

		// Select wallets to be included (dropdown 2) //
		this.walletSelector = document.createElement('select');
		this.walletSelector.id = 'report-wallets';
		this.walletSelector.name = 'report-wallets';
		this.walletSelector.value = 'all';

		this.walletSelectorLabel = document.createElement('label');
		this.walletSelectorLabel['for'] = 'report-wallets';
		this.walletSelectorLabel.innerHTML = 'Wallets for Report';
		this.walletSelector.append(this.allWalletOption);

		// Select file format (dropdown 3) //
		this.fileSelector = document.createElement('select');
		this.fileSelector.id = 'report-file';
		this.fileSelector.name = 'report-file';
		this.fileSelector.value = 'pdf';

		this.fileSelectorLabel = document.createElement('label');
		this.fileSelectorLabel['for'] = 'report-file';
		this.fileSelectorLabel.innerHTML = 'Report Format';
		this.fileSelector.append(this.pdfDocumentOption, this.pngDocumentOption);

		// Submit Button //
		this.submitButton = document.createElement('button');
		// this.submitButton['type'] = "button";
		this.submitButton['value'] = 'submit';
		this.submitButton['id'] = 'report-form-button';
		this.submitButton.innerHTML = 'Generate >';
		// this.submitButton['onclick'] = "generateReport";
		// this.submitButton['form'] = "report-form"; // this.reportForm
		// eslint-disable-next-line no-unused-vars
		this.submitButton.addEventListener('click', event => { 	
			generateReport(); // possibly a placeholder
		});

		// Append all to form
		this.reportForm.append(this.reportRangeLabel, this.reportRangeSelector, this.walletSelectorLabel, this.walletSelector, this.fileSelectorLabel, this.fileSelector, this.submitButton);

		this.styleElem = document.createElement('link');
		this.styleElem['rel'] = 'stylesheet';
		this.styleElem['href'] = '../css/report-styles.css';


		this.elementRoot.append(this.reportForm, this.styleElem);
		this.shadowElem.append(this.elementRoot);
	}
}
customElements.define('report-generator', ReportGenerator); // ReportGeneratorComponent