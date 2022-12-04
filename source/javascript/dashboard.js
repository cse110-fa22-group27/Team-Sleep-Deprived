import { getCurrentUserWallets, setCurrentUserWallets } from './globals.js';
import { getTransactionsSortedByDate } from './TransactionFilter.js';
const MAX_TRANSACTIONS = 10;
let recentActivity;

/**
 * Refreshes the transactions displayed on the dashboard
 */
async function refreshTransactions() {
	recentActivity = document.createElement('rec-act');
	let container = document.getElementsByClassName('flex-container')[0];
	if (container.lastChild.tagName === 'REC-ACT') {
		container.removeChild(container.lastChild);
	}
	container.appendChild(recentActivity);
	let transactions = await getTransactionsSortedByDate();
	// if there are no transactions, display that there are no transactions instead of the table
	if(transactions.length <= 0){
		recentActivity.shadowRoot.querySelector('.recent-activity-box').innerHTML = '<div class="no-transactions-filler"><h3> No Transactions To Display </h3></div><style>.no-transactions-filler { display: flex; width: 100%; justify-content: center; align-items: center; height: 100%; } </style>';
		return;
	}
	recentActivity.data = JSON.stringify(transactions);
}

async function initDashboard() {
	const wallets = await getCurrentUserWallets();
	const flexContainer = document.querySelector('.flex-container');
	const addTransaction = document.createElement('add-transaction');
	addTransaction.data = wallets;
	addTransaction.shadowRoot.querySelector('form').addEventListener('submit', addTransactionEventHandler);
	flexContainer.appendChild(addTransaction);
	refreshTransactions();
}

async function addTransactionEventHandler(event) {
	event.preventDefault();
	const form = event.target;
	const formData = new FormData(form);
	const name = formData.get('name');
	const amount = formData.get('amount');
	const date = formData.get('date');
	const formWallet = formData.get('wallet');
	const description = formData.get('description');
	const transaction = {
		name,
		amount: -parseFloat(amount),
		date,
		description,
	};
	const wallets = await getCurrentUserWallets();
	const walletIndex = wallets.findIndex(wallet => wallet.name === formWallet);
	wallets[walletIndex]['total-amount'] = parseFloat(wallets[walletIndex]['total-amount']) + transaction.amount;
	wallets[walletIndex].transactions.push(transaction);
	setCurrentUserWallets(wallets).then(refreshTransactions()).then(refreshTransactions());
	// find the button that was clicked and change the text to "Added!" for 2 seconds and change the color to green with a smooth transition
	const button = event.target.querySelector('button');
	button.textContent = 'Added!';
	const oldColor = button.style.backgroundColor;
	button.style.backgroundColor = '#88dd88';
	button.style.transition = 'background-color 0.5s';
	setTimeout(() => {
		button.textContent = '+ Add Transaction';
		button.style.backgroundColor = oldColor;
	}, 2000);

	form.reset();
	refreshTransactions();
}
initDashboard();