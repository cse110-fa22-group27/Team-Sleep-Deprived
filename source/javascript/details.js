import { getCurrentUserWallets } from './globals.js'

// loads component
window.addEventListener('load', async () => {
    // Get the current wallet from localStorage
    const currentWalletName = JSON.parse(localStorage.getItem('currentWalletName'));
    const wallets = await getCurrentUserWallets();
    let currentWallet;
    for(const wallet of wallets) {
        if (wallet.name === currentWalletName) {
            currentWallet = wallet;
            break;
        }
    }
    // at this point you should have the current wallet
    const walletDetails = document.createElement('wallet-details');
    const detailsGrid = document.querySelector('#wallet-details-root');
    detailsGrid.appendChild(walletDetails);
    walletDetails.data = currentWallet;
});

// 
function goBackToWalletsPage() {
    localStorage.removeItem('currentWalletName');
    window.open('../html/wallets.html', '_self');
}

// CRUD function
function deleteWallet(){
    localStorage.removeItem('currentWalletName');
}