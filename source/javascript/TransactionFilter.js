/**
 * @author Ashwin Rohit Alagiri Rajan
 * @fileoverview This file contains some useful filtering functions that can be used in various places that filter the transactions by date, sorts them, retrieves from a user, etc.
 */
import { getCurrentUserWallets } from './globals.js';

async function getAllTransactions() {
	const wallets = await getCurrentUserWallets();
	// console.log(wallets);
	const transactions = [];
	for (const wallet of wallets) {
		const walletTransactions = wallet["transactions"];
		// console.log(walletTransactions);
		for (let transaction of walletTransactions) {
			transaction['wallet'] = wallet['name'];
			transactions.push(transaction);
		}
	}
	return transactions;
}

/**
 * Get all transactions sorted by date, from newest to oldest
 * @returns {Promise} A promise that resolves to an array of all the transactions in the database sorted by date from newest to oldest
 */
async function getTransactionsSortedByDate() {
	// return transactions sorted by date from newest to oldest
	const transactions = await getAllTransactions();
	transactions.sort((a, b) => {
		const aDate = new Date(a["date"]);
		const bDate = new Date(b["date"]);
		return bDate - aDate;
	});
	return transactions;
}

/**
 * Get all transactions sorted by date, from newest to oldest for the given wallet
 * @param {Wallet} wallet 
 * @returns The transactions for the given wallet sorted by date from newest to oldest
 */
function getTransactionsSortedByDateForWallet(wallet) {
	const transactions = wallet['transactions'];
	transactions.sort((a, b) => {
		const aDate = new Date(a["date"]);
		const bDate = new Date(b["date"]);
		return bDate - aDate;
	});
	return transactions;
}

/**
 * Gets all transactions for the current user non asynchronously
 * @param {Array<transaction-object>} transactions 
 * @returns Sortes the given transactions by date from newest to oldest
 */
function getTransactionsSorted(transactions) {
	// return transactions sorted by date from newest to oldest
	transactions.sort((a, b) => {
		const aDate = new Date(a["date"]);
		const bDate = new Date(b["date"]);
		return bDate - aDate;
	});
	return transactions;
}

/**
 * Get all transactions for the current Month
 * @returns {Promise} A promise that resolves to an array of all the transactions in the database for the current month
 */
async function getThisMonthTransactions() {
	const transactions = await getAllTransactions();
	const thisMonthTransactions = [];
	const thisMonth = new Date().getMonth();
	for (const transaction of transactions) {
		const transactionDate = new Date(transaction["date"]);
		if (transactionDate.getMonth() == thisMonth) {
			thisMonthTransactions.push(transaction);
		}
	}
	return thisMonthTransactions;
}

/**
 * Get all transactions for the current Year
 * @returns {Promise} A promise that resolves to an array of all the transactions in the database for the current year
 */
async function getThisYearTransactions() {
	const transactions = await getAllTransactions();
	const thisYearTransactions = [];
	const thisYear = new Date().getFullYear();
	for (const transaction of transactions) {
		const transactionDate = new Date(transaction["date"]);
		if (transactionDate.getFullYear() == thisYear) {
			thisYearTransactions.push(transaction);
		}
	}
	return thisYearTransactions;
}

/**
 * Get the current week number
 */
async function getWeek(date) {
	// Copy date so don't modify original
	date = new Date(
		Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
	);
	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
	// Get first day of year
	const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
	// Calculate full weeks to nearest Thursday
	const weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
	// Return array of year and week number
	return weekNo;
}

/**
 * Get all transactions for the current Week
 * @returns {Promise} A promise that resolves to an array of all the transactions in the database for the current week
 */
async function getThisWeekTransactions() {
	const transactions = await getAllTransactions();
	const thisWeekTransactions = [];
	const thisWeek = await getWeek(new Date());
	for (const transaction of transactions) {
		const transactionDate = new Date(transaction["date"]);
		if ((await getWeek(transactionDate)) == thisWeek) {
			thisWeekTransactions.push(transaction);
		}
	}
	return thisWeekTransactions;
}

/**
 * Filter all the transactions for the current user by whehter they are positive or negative
 * @param {Array<transaction-object>} transactions 
 * @returns {Array<transaction-object>} An array of all the positive transactions
 */
function getPositiveTransactions(transactions) {
	// console.log(transactions);
	const positiveTransactions = []
	for (const transaction of transactions) {
		if (transaction['amount'] > 0) {
			positiveTransactions.push(transaction);
		}
	}
	return positiveTransactions;
}

/**
 * Filter all the transactions for the current user by whehter they are positive or negative
 * @param {Array<transaction-object>} transactions 
 * @returns {Array<transaction-object>} An array of all the negative transactions
 */
function getNegativeTransactions(transactions) {
	const negativeTransactions = [];
	for (const transaction of transactions) {
		if (transaction['amount'] < 0) {
			negativeTransactions.push(transaction);
		}
	}
	return negativeTransactions;
}

async function getWalletWeeklyTransactions(wallet) {
	const transactions = wallet["transactions"];
	const thisWeekTransactions = [];
	const thisWeek = await getWeek(new Date());
	for (const transaction of transactions) {
		const transactionDate = new Date(transaction["date"]);
		if ((await getWeek(transactionDate)) == thisWeek) {
			thisWeekTransactions.push(transaction);
		}
	}
	return thisWeekTransactions;
}

function getWalletMonthlyTransactions(wallet) {
	const transactions = wallet["transactions"];
	const thisMonthTransactions = [];
	const thisMonth = new Date().getMonth() + 1;
	for (const transaction of transactions) {
		const transactionDate = new Date(transaction["date"] + " ");
		if (transactionDate.getMonth() + 1 == thisMonth) {
			thisMonthTransactions.push(transaction);
		}
	}
	return thisMonthTransactions;
}

/**
 * Get all transactions for the current Year
 * @param {Wallet} wallet 
 * @returns {Promise} A promise that resolves to an array of all the transactions in the database for the current year
 */
async function getWalletYearlyTransactions(wallet) {
	const transactions = wallet["transactions"];
	const thisYearTransactions = [];
	const thisYear = new Date().getFullYear();
	for (const transaction of transactions) {
		const transactionDate = new Date(transaction["date"]);
		if (transactionDate.getFullYear() == thisYear) {
			thisYearTransactions.push(transaction);
		}
	}
	return thisYearTransactions;
}

/**
 * Sort the transactions in a wallet by date
 * @param {Wallet} wallet 
 * @returns {Promise} A promise that resolves to an array of all the transactions in the database for the current year
 */
async function sortSingleWallet(wallet) {
	const transactions = wallet['transactions'];
	transactions.sort((a, b) => {
		const aDate = new Date(a["date"]);
		const bDate = new Date(b["date"]);
		return bDate - aDate;
	});
	return transactions;
}

export {
	getTransactionsSortedByDate,
	getTransactionsSortedByDateForWallet,
	getThisMonthTransactions,
	getThisYearTransactions,
	getThisWeekTransactions,
	getAllTransactions,
	getWeek,
	getWalletWeeklyTransactions,
	getWalletMonthlyTransactions,
	getWalletYearlyTransactions,
	sortSingleWallet,
	getNegativeTransactions,
	getPositiveTransactions,
	getTransactionsSorted,
};
