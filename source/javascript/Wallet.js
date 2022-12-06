/**
 * @author Ashwin Rohit Alagiri Rajan
 * @contributor Anthony Chen
 * @contributor Jacob Graven
 */
import { openDialog } from './WalletDialog.js';
import { getCurrentUserWallets } from './globals.js';

const MAX_WALLET_COUNT = 6;
let currentWallet;

async function showWalletsDetailsPage(wallet) {
	currentWallet = wallet;
	localStorage.setItem('currentWalletName', JSON.stringify(currentWallet.name));
	window.open('../html/wallet-details.html', '_self');
}

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