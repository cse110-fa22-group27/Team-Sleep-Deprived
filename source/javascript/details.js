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
    // console.log('goBackToWalletsPage()');
    localStorage.removeItem('currentWalletName');
    window.open('../html/wallets.html', '_self');
}

async function deleteWallet(){
    // console.log('deleteWallet()');
    const currentWallet = JSON.parse(localStorage.getItem('currentWalletName'));
    let wallets = await getCurrentUserWallets();
    let newWallets = [];
    for(const wallet in wallets) {
        if(wallet != currentWallet) {
            newWallets.push(wallet);
        }
    }
    // localStorage.removeItem('currentWalletName');
    goBackToWalletsPage();
}