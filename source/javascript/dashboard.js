import { getCurrentUserWallets, setCurrentUserWallets } from './globals.js';

async function initDashboard() {
	const wallets = await getCurrentUserWallets();
	const flexContainer = document.querySelector('.flex-container');
	const addTransaction = document.createElement('add-transaction');
	addTransaction.data = wallets;
	addTransaction.shadowRoot.querySelector('form').addEventListener('submit', addTransactionEventHandler);
	flexContainer.appendChild(addTransaction);
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
	wallets[walletIndex].transactions.push(transaction);
	setCurrentUserWallets(wallets);
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
}

initDashboard();