/**
 * @author Ashwin Rohit Alagiri Rajan
 * @contributor Anthony Chen
 */
import { openDialog } from './WalletDialog.js';
import { getCurrentUserWallets } from './globals.js';

// The maximum number of wallets a user can have/see
const MAX_WALLET_COUNT = 6;

const showWalletsDetailsPage = () => {
	// TODO: Show the wallets details page when the user clicks on a wallet
	// console.log("HELLO");
	window.open('../../source/html/wallet_details.html', '_self');
	const walletDetailsRoot = document.querySelector("wallet-details-root");
	const walletDetails = document.createElement("div");
	walletDetails.id = "recent-transactions";
	walletDetailsRoot.append(walletDetails);
	
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
	console.log(wallets);
	for(const wallet of wallets) {
		let newWalletInfoItem = document.createElement('wallet-info');
		newWalletInfoItem.data = wallet;
		if(wallet.transactions.length > 0) {
			wallet.lastTransaction = wallet.transactions[wallet.transactions.length - 1];
		}
		walletGrid.appendChild(newWalletInfoItem);
		newWalletInfoItem.addEventListener('click', showWalletsDetailsPage);
	}
	if(wallets.length < MAX_WALLET_COUNT) {
		let addwalletItem = document.createElement('add-wallet');
		addwalletItem.addEventListener('click', openDialog);
		walletGrid.appendChild(addwalletItem);
	}
}

initWalletPage();