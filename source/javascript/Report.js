/**
 * @author: Ashwin Rohit Alagiri Rajan
 */

import { getAllUsersObject, setAllUsersObject, setCurrentUsername, getCurrentUsername, getCurrentUser, updateCurrentUser, getCurrentUserWallets, setCurrentUserWallets, resetGlobalInfo } from './globals.js'
import { getThisMonthTransactions, getThisYearTransactions, getThisWeekTransactions, getAllTransactions } from './TransactionFilter.js'

const root = document.createElement('div');
root.classList.add('report-root');
const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = '../css/report.css';
root.appendChild(styleLink);
document.body.appendChild(root);


async function initGraph() {
	const root = document.querySelector('.report-root');
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

async function generateReport(timespan, includeAll, reportFormat) {
	const wallets = await getCurrentUserWallets();
	const transactions = [];
	for (const wallet of wallets) {
		const walletTransactions = wallet['transactions'];
		for (const transaction of walletTransactions) {
			transactions.push(transaction);
		}
	}
	const reportOutput = {};
	if (timespan == 'yearly') {
		const thisYearTransactions = await getThisYearTransactions();
		reportOutput['transactions'] = thisYearTransactions;
	}

	if (timespan == 'monthly') {
		const thisMonthTransactions = await getThisMonthTransactions();
		reportOutput['transactions'] = thisMonthTransactions;
	}

	if (timespan == 'weekly') {
		const thisWeekTransactions = await getThisWeekTransactions();
		reportOutput['transactions'] = thisWeekTransactions;
	}

	if (reportFormat == 'CSV') {
		localStorage.setItem('csv', await JSONtoCSV(JSON.stringify(reportOutput['transactions'])));
	} else {
		localStorage.setItem('json', JSON.stringify(reportOutput['transactions']));
	}
}

async function saveRandomTransactionsToWallets() {
	const wallets = await getCurrentUserWallets();
	const transactions = [];
	// 100 random words of length 5-10
	const words = Array.from({ length: 100 }, () => Math.random().toString(36).substring(2, 12));
	for (let i = 0; i < 100; i++) {
		const transaction = {
			name: `Transaction ${i}`,
			// Random date between 1st Jan 2021 and today (inclusive)
			date: new Date(new Date().getTime() - Math.random() * (new Date().getTime() - new Date(2021, 0, 1).getTime())),
			amount: -Math.floor(Math.random() * 1000),
			// Some random real world descriptions
			description: words[i]
		}
		transactions.push(transaction);
	}
	const firstWallet = wallets[0];
	firstWallet['transactions'] = transactions;
	await setCurrentUserWallets(wallets);
}

async function init() {
	await saveRandomTransactionsToWallets();
	await initGraph();
	await initGenerator();
}

init();