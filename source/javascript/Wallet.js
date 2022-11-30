/**
 * @author Ashwin Rohit Alagiri Rajan
 * @contributor Anthony Chen, Jacob Graven
 */
import { openDialog } from './WalletDialog.js';
import { getCurrentUserWallets } from './globals.js';

// The maximum number of wallets a user can have/see
const MAX_WALLET_COUNT = 6;

const showWalletsDetailsPage = async function(wallet) {
	// Show the wallets details page when the user clicks on a wallet
	// console.log("SHOW WALLETS DETAIL PAGE");
	initWalletDetailsPage(wallet);


	// how to know which wallet we're using? -> pass the data
	// iterate through transactions array, create a new tr, 
	// create a new recentTransactionsNameTitle.innerHTML = transaction.name
	// create a new recentTransactionsAmountTitle.innerHTML = transaction.amount
	// and then append to table?

}

async function initWalletDetailsPage(wallet) {
	window.open('../../source/html/wallet_details.html', '_self');
	/*
	const wallets = await getCurrentUserWallets();
	let currentWallet = {name: "BoLSA Savings", target: 10, "total-amount": 9000, 
	transactions: [{name: "Groceries", amount: 100, type: "positive"}]};
	*/
	// currentWallet = wallet;

	let walletDetails = document.createElement('wallet-details');
	walletDetails.data = wallet;
	// (KEEP 2 COMMENTS BELOW) - see test-details.js
	// const detailsGrid = document.querySelector('#wallet-details-root');
	// detailsGrid.appendChild(walletDetails);


	// let walletDetails = document.createElement('wallet-details');
	// walletDetails.data = currentWallet;
	// const detailsGrid = document.querySelector('wallet-details-root');
	// detailsGrid.appendChild(walletDetails);
}

/**
 * Initializes the wallets page with the current user's wallets
 */
async function initWalletPage() {
	const walletGridWrapper = document.querySelector('#wallets-grid-wrapper');
	const walletGrid = document.createElement('div');
	walletGrid.id = 'wallets-grid';
	walletGridWrapper.append(walletGrid);
	const wallets = await getCurrentUserWallets();
	// console.log(wallets);
	// var wallets
	for(const wallet of wallets) {
		let newWalletInfoItem = document.createElement('wallet-info');
		if(wallet.transactions.length > 0) {
			wallet['lastTransaction'] = wallet.transactions[wallet.transactions.length - 1];
		}
		newWalletInfoItem.data = wallet;
		walletGrid.appendChild(newWalletInfoItem);
		// TODO: validate this change
		newWalletInfoItem.addEventListener('click', showWalletsDetailsPage(wallet));	// 	newWalletInfoItem.addEventListener('click', showWalletsDetailsPage);
	}
	if(wallets.length < MAX_WALLET_COUNT) {
		let addwalletItem = document.createElement('add-wallet');
		addwalletItem.addEventListener('click', openDialog);
		walletGrid.appendChild(addwalletItem);
	}
}

initWalletPage();