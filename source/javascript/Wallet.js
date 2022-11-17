const walletGridWrapper = document.querySelector('#wallets-grid-wrapper')
const walletGrid = document.createElement('div');
walletGrid.id = 'wallets-grid';
walletGridWrapper.append(walletGrid);
const localStorageString = window.localStorage.getItem('wallet-infos');
const localStorageWallets = JSON.parse(localStorageString != null?localStorageString:'[]');

for(let wallet of localStorageWallets) {
    let newWalletInfoItem = document.createElement('wallet-info');
    newWalletInfoItem.data = wallet;
    walletGrid.appendChild(newWalletInfoItem);
}
// Add the 'Add new Wallet' div
let addwalletItem = document.createElement('add-wallet');
console.log(addwalletItem);
addwalletItem.data = 
walletGrid.appendChild(addwalletItem);
