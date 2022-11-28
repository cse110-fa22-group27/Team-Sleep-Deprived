/**
 * @author Ashwin Rohit Alagiri Rajan
 * @contributor Anthony Chen
 */
import { openDialog } from './WalletDialog.js';
import { getCurrentUserWallets } from './globals.js';

// The maximum number of wallets a user can have/see
const MAX_WALLET_COUNT = 6;

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
		newWalletInfoItem.data = wallet;
		walletGrid.appendChild(newWalletInfoItem);
	}
	if(wallets.length < MAX_WALLET_COUNT) {
		let addwalletItem = document.createElement('add-wallet');
		addwalletItem.addEventListener('click', openDialog);
		walletGrid.appendChild(addwalletItem);
	}
}

initWalletPage();