import { getTransactionsSortedByDate } from './TransactionFilter.js';
const MAX_TRANSACTIONS = 10;
var recentActivity;

/**
 * Initializes the recent activity window
 */
function init(){
	recentActivity = document.createElement('rec-act');
	recentActivity.data =  JSON.stringify([{'name':'No recent ', 'amount':'-10', 'wallet':'walletname'}]);
	
	let container = document.getElementsByClassName('flex-container')[0];
	container.appendChild(recentActivity);
	refreshTransactions();
}

/**
 * Refreshes the transactions displayed on the dashboard
 */
async function refreshTransactions(){
	let transactions = displayRecentTransactions(await getTransactionsSortedByDate(), MAX_TRANSACTIONS);
	recentActivity.data = JSON.stringify(transactions);
}


/**
 * 
 * @param {Array<Object>} transactions 
 * @param {Int} amount 
 * @returns recent 'amount' of transactions
 */
function displayRecentTransactions(transactions, amount){
	let recentTransactions = [];
	for(let i = 0; i < amount; i++){
		//If therte are no more transactions to display
		if(i >= transactions.length){
			return recentTransactions;
		}
		recentTransactions.push(transactions[i]);
	}
	return recentTransactions;
}
init();