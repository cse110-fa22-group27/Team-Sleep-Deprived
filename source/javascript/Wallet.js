const walletGrid = document.querySelector('#wallets-grid');
const localStorageString = window.localStorage.getItem('wallet-infos');
const localStorageWallets = JSON.parse(localStorageString != null?localStorageString:'[]');

for(let wallet of localStorageWallets) {
    let newWalletInfoItem = document.createElement('wallet-info');
    newWalletInfoItem.data = wallet;
    walletGrid.appendChild(newWalletInfoItem);
}