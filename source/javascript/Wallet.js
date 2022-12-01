/**
 * @author Ashwin Rohit Alagiri Rajan
 * @contributor Anthony Chen, Jacob Graven
 */
import { openDialog } from './WalletDialog.js';
import { getCurrentUserWallets } from './globals.js';

// The maximum number of wallets a user can have/see
const MAX_WALLET_COUNT = 6;
// The current wallet selected for details page
var DETAILS_WALLET;

async function showWalletsDetailsPage(wallet) {
	DETAILS_WALLET = wallet;
	// console.log(DETAILS_WALLET);
	window.open('../../source/html/wallet-details.html', '_self');
}

// async function initWalletDetailsPage(wallet) {
// 	window.open('../../source/html/wallet-details.html', '_self');
// }

/**
 * Initializes the wallets page with the current user's wallets
 */
async function initWalletPage() {
	const walletGridWrapper = document.querySelector('#wallets-grid-wrapper');
	const walletGrid = document.createElement('div');
	walletGrid.id = 'wallets-grid';
	walletGridWrapper.append(walletGrid);
	const wallets = await getCurrentUserWallets();
	for(const wallet of wallets) {
		let newWalletInfoItem = document.createElement('wallet-info');
		if(wallet.transactions.length > 0) {
			wallet['lastTransaction'] = wallet.transactions[wallet.transactions.length - 1];
		}
		newWalletInfoItem.data = wallet;
		walletGrid.appendChild(newWalletInfoItem);
		newWalletInfoItem.addEventListener("click", () => { showWalletsDetailsPage(wallet) });
	}
	if(wallets.length < MAX_WALLET_COUNT) {
		let addwalletItem = document.createElement('add-wallet');
		addwalletItem.addEventListener('click', openDialog);
		walletGrid.appendChild(addwalletItem);
	}
}

initWalletPage();
export { DETAILS_WALLET } // note - causing dialogue box to appear on details?
