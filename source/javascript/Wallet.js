/**
 * Contributors: Anthony
 */
import {openDialog} from './WalletDialog.js';

//The maximum number of wallets a page can hold
const MAX_WALLETS = 6;

function initWalletPage(){
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

    //Prevents having more than 6 wallets
    if(localStorageWallets.length < MAX_WALLETS){
        let addwalletItem = document.createElement('add-wallet');
        addwalletItem.addEventListener('click', openDialog);
        walletGrid.appendChild(addwalletItem);
    }
}

initWalletPage();




