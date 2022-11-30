/**
 * @author Ashwin Rohit Alagiri Rajan
 */
class ReportGenerator extends HTMLElement {
	constructor() {
		super();
		// Create the shadow root
		this.shadow = this.attachShadow({ mode: 'open' });
		const rootDiv = document.createElement('div');
		rootDiv.className = 'generator component';

		// Title for the component 
		const title = document.createElement('h3');
		title.className = 'component-title';
		title.textContent = 'Generate Report';

		// Create the form
		const form = document.createElement('form');
		form.classList.add('generate-report-form', 'glass-box');

		// Create 3 divs to hold the form elements
		const formDiv1 = document.createElement('div');
		const formDiv2 = document.createElement('div');
		const formDiv3 = document.createElement('div');

		// label for timespan select
		const timespanLabel = document.createElement('label');
		timespanLabel.textContent = 'Choose the time range for the report';
		timespanLabel.setAttribute('for', 'timespan');

		// Create the timespan select
		const timespanSelect = document.createElement('select');
		timespanSelect.name = 'timespan';
		timespanSelect.id = 'timespan-select';

		// Create the timespan options
		const timespanOptions = [
			{ value: 'yearly', text: 'Yearly Report' },
			{ value: 'monthly', text: 'Monthly Report' },
			{ value: 'weekly', text: 'Weekly Report' },
		];

		// Create the timespan options
		timespanOptions.forEach((option) => {
			const optionElement = document.createElement('option');
			optionElement.value = option.value;
			optionElement.textContent = option.text;
			timespanSelect.appendChild(optionElement);
		});

		// append the elements to the form div
		formDiv1.append(timespanLabel, timespanSelect);

		// label for include all select
		const includeAllLabel = document.createElement('label');
		includeAllLabel.textContent = 'Which wallets to include in the report';
		includeAllLabel.setAttribute('for', 'include-all');

		// Create the include all select
		const includeAllSelect = document.createElement('select');
		includeAllSelect.name = 'include-all';
		includeAllSelect.id = 'include-all';

		// Create the include all options
		const includeAllOptions = [
			{ value: 'all-wallets', text: 'All Wallets' },
			{ value: 'only-total', text: 'Only Wallets included in total' },
		];

		// Create the include all options
		includeAllOptions.forEach((option) => {
			const optionElement = document.createElement('option');
			optionElement.value = option.value;
			optionElement.textContent = option.text;
			includeAllSelect.appendChild(optionElement);
		});

		// append the elements to the form div
		formDiv2.append(includeAllLabel, includeAllSelect);

		// label for report format select
		const reportFormatLabel = document.createElement('label');
		reportFormatLabel.textContent = 'Choose the format of the report';
		reportFormatLabel.setAttribute('for', 'report-format');

		// Create the report format select
		const reportFormatSelect = document.createElement('select');
		reportFormatSelect.name = 'report-format';
		reportFormatSelect.id = 'report-format';

		// Create the report format options
		const reportFormatOptions = [
			{ value: 'JSON', text: 'JSON' },
			{ value: 'CSV', text: 'CSV' },
		];

		// Create the report format options
		reportFormatOptions.forEach((option) => {
			const optionElement = document.createElement('option');
			optionElement.value = option.value;
			optionElement.textContent = option.text;
			reportFormatSelect.appendChild(optionElement);
		});

		// append the elements to the form div
		formDiv3.append(reportFormatLabel, reportFormatSelect);

		// Create the submit button
		const submitButton = document.createElement('button');
		submitButton.type = 'submit';
		submitButton.textContent = 'Generate Report';

		const styleLinkDefault = document.createElement('link');
		styleLinkDefault.rel = 'stylesheet';
		styleLinkDefault.href = '../css/styles.css';

		const styleLink = document.createElement('link');
		styleLink.rel = 'stylesheet';
		styleLink.href = '../css/report.css';

		// Append the form elements to the form
		form.appendChild(formDiv1);
		form.appendChild(formDiv2);
		form.appendChild(formDiv3);
		form.appendChild(submitButton);

		// Append the elements to the root div
		rootDiv.appendChild(title);
		rootDiv.appendChild(form);

		// Append the style links to the shadow root
		this.shadow.appendChild(styleLinkDefault);
		this.shadow.appendChild(styleLink);

		// Append the root div to the shadow root
		this.shadow.appendChild(rootDiv);
	}
}

customElements.define('report-generator', ReportGenerator);