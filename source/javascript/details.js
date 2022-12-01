// fix - import running wallet js file, causes init function to run
import { DETAILS_WALLET } from "./Wallet.js";

window.addEventListener('load', () => { 
    const walletDetails = document.createElement('wallet-details');
    // walletDetails.data = DETAILS_WALLET;
    const detailsGrid = document.querySelector('#wallet-details-root');
    detailsGrid.appendChild(walletDetails);
});

// not working?
function goBackToWalletsPage() {
    window.open('../html/wallets.html', '_self');
}

// TODO - delete wallet function - CRUD
function deleteWallet(){
    return;
}