import { getCurrentUserWallets } from "./globals";

async function init() {
	const wallets = await getCurrentUserWallets();
	const transactions = [];
	for(const wallet of wallets) {
		const walletTransactions = wallet['transactions'];
		for(const transaction of walletTransactions) {
			transactions.push(transaction);
		}
	}
	return transactions;
}

async function getTransactionsSortedByDate() {
	// return transactions sorted by date from newest to oldest
	const transactions = await init();
	transactions.sort((a, b) => {
		const aDate = new Date(a['date']);
		const bDate = new Date(b['date']);
		return bDate - aDate;
	});
	return transactions;
}

async function getThisMonthTransactions() {
	const transactions = await init();
	const thisMonthTransactions = [];
	const thisMonth = new Date().getMonth();
	for(const transaction of transactions) {
		const transactionDate = new Date(transaction['date']);
		if(transactionDate.getMonth() == thisMonth) {
			thisMonthTransactions.push(transaction);
		}
	}
	return thisMonthTransactions;
}

async function getThisYearTransactions() {
	const transactions = await init();
	const thisYearTransactions = [];
	const thisYear = new Date().getFullYear();
	for(const transaction of transactions) {
		const transactionDate = new Date(transaction['date']);
		if(transactionDate.getFullYear() == thisYear) {
			thisYearTransactions.push(transaction);
		}
	}
	return thisYearTransactions;
}

async function getThisWeekTransactions() {
	const transactions = await init();
	const thisWeekTransactions = [];
	const thisWeek = new Date().getWeek();
	for(const transaction of transactions) {
		const transactionDate = new Date(transaction['date']);
		if(transactionDate.getWeek() == thisWeek) {
			thisWeekTransactions.push(transaction);
		}
	}
	return thisWeekTransactions;
}

export { getTransactionsSortedByDate, getThisMonthTransactions, getThisYearTransactions, getThisWeekTransactions };