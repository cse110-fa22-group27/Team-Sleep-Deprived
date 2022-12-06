/**
 * @author Ashwin Rohit Alagiri Rajan
 * @fileoverview This file contains functions that initialize the reports page and show the reports graph and the report generator form
 */

import { getCurrentUserWallets} from './globals.js';
import { getThisMonthTransactions, getThisYearTransactions, getThisWeekTransactions, getAllTransactions } from './TransactionFilter.js';

const root = document.createElement('div');
root.classList.add('report-root');
const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = '../css/report.css';
root.appendChild(styleLink);
document.body.appendChild(root);

/**
 * @author Ashwin Rohit Alagiri Rajan
 * This class is a custom component that is used to display a placeholder when there are no transactions in the database
 */
class EmptyTransactionPlaceholder extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'open' });
		this.rootDiv = document.createElement('div');
		this.rootDiv.classList.add('empty-transaction-placeholder', 'component', 'glass-box');
		this.rootDiv.innerHTML = '<h3>The transaction graph will appear here when you have at least one transaction for the past year.</h3>';
		this.shadow.appendChild(this.rootDiv);
	}
}

/**
 * Initializes the graph with the data from the database, shows upto 12 months of transactions
 * @returns {Promise} A promise that resolves to an array of all the transactions in the database
 */
async function initGraph() {
	const root = document.querySelector('.report-root');
	const transactions = await getAllTransactions();
	if (transactions.length <= 0) {
		const emptyTransactionPlaceholder = document.createElement('empty-transaction-placeholder');
		root.appendChild(emptyTransactionPlaceholder);
		return;
	}
	
	const reportGraph = document.createElement('bar-graph');
	reportGraph.classList.add('component');
	const wallets = await getCurrentUserWallets();
	console.log(wallets);
	// Sum all the target spending for each wallet
	const totalTargetSpending = wallets.reduce((acc, wallet) => acc + wallet['target'], 0);
	// set the data for the graph
	
	reportGraph.data = {
		target: totalTargetSpending,
		transactions: await getAllTransactions(),
	};
	root.appendChild(reportGraph);
}


/**
 * Generates a report based on the parameters passed in from the form, redirects to another page for automatic download
 */
async function initGenerator() {
	const root = document.querySelector('.report-root');
	const reportGenerator = document.createElement('report-generator');
	reportGenerator.classList.add('component');
	root.appendChild(reportGenerator);
	reportGenerator.shadow.querySelector('form').addEventListener('submit', async (event) => {
		event.preventDefault();
		console.log(event.target);
		const form = event.target;
		// create a form data object
		const formData = new FormData(form);
		// get the form data
		const timespan = formData.get('timespan');
		const includeAll = formData.get('include-all');
		const reportFormat = formData.get('report-format');
		await generateReport(timespan, includeAll, reportFormat);
		const downloadLink = document.createElement('a');
		downloadLink.href = '../html/report-output.html';
		downloadLink.target = '_blank';
		downloadLink.click();
	});
}

/**
 * Converts the JSON data stored in the DB to CSV format which can be downloaded
 * @param {String} jsonString The JSON string to be converted to CSV
 * @returns The converted CSV string
 */
async function JSONtoCSV(jsonString) {
	const json = JSON.parse(jsonString);
	const csv = [];
	const csvHeader = [];
	for (const key in json[0]) {
		csvHeader.push(key);
	}
	let joinedHeader = csvHeader.join(',');
	joinedHeader += '\n';
	csv.push(joinedHeader);
	json.forEach((row) => {
		const csvRow = [];
		for (const key in row) {
			csvRow.push(row[key]);
		}
		csv.push(csvRow.join(','));
	});
	return csv.join('\n');
}

/**
 * Generates the report based on the parameters passed in from the form
 * @param {String} timespan Takes in values 'yearly', 'monthly', 'weekly'
 * @param {String} includeAll Takes in values 'only-total', 'all'
 * @param {String} reportFormat Takes in values 'CSV', 'PDF'
 */
async function generateReport(timespan, includeAll, reportFormat) {
	const wallets = await getCurrentUserWallets();
	const transactions = [];
	for (const wallet of wallets) {
		const walletTransactions = wallet['transactions'];
		for (const transaction of walletTransactions) {
			transactions.push(transaction);
		}
	}
	let outputTransactions = [];
	if (timespan == 'yearly') {
		const thisYearTransactions = await getThisYearTransactions();
		outputTransactions = thisYearTransactions;
	}

	if (timespan == 'monthly') {
		const thisMonthTransactions = await getThisMonthTransactions();
		outputTransactions = thisMonthTransactions;
	}

	if (timespan == 'weekly') {
		const thisWeekTransactions = await getThisWeekTransactions();
		outputTransactions = thisWeekTransactions;
	}

	if (includeAll === 'only-total') {
		outputTransactions = outputTransactions.filter(transaction => transaction['includeInTotal']);
	}

	if (reportFormat == 'CSV') {
		localStorage.setItem('csv', await JSONtoCSV(JSON.stringify(outputTransactions)));
	} else {
		localStorage.setItem('json', JSON.stringify(outputTransactions));
	}
}

/**
 * Checks if the user has any wallets, if not, displays a message
 */
async function checkWallets() {
	const wallets = await getCurrentUserWallets();
	console.log(wallets);
	if (wallets.length <= 0) {
		const reportRoot = document.querySelector('.report-root');
		const noWallets = document.createElement('div');
		noWallets.classList.add('no-wallets');
		noWallets.innerHTML = '<h3>You have no wallets. You need atleast one wallet to generate a report.</h3>';
		reportRoot.appendChild(noWallets);
		return false;
	}
	return true;
}

/**
 * Initializes the page
 */
async function init() {
	if (await checkWallets()) {
		await initGraph();
		await initGenerator();
	}
}

customElements.define('empty-transaction-placeholder', EmptyTransactionPlaceholder);
init();