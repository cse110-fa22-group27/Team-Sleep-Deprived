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

    if(localStorageWallets.length < 6){
        let addwalletItem = document.createElement('add-wallet');
        addwalletItem.addEventListener('click', openDialog);
        walletGrid.appendChild(addwalletItem);
    }
}

initWalletPage();
//Create init Dialog
    //Have this inject html components
    //Use CSS to style it so it overlays other elements
    

//Add event listener to addwalletItem
    //Create a new WalletDialog item
    //Create a new popup with WalletDialog
    //Have x sign
    //Make sure backside is dim
        //Wallet Dialog has a form to fill out wallet information
    //Handle event clicking submit 
    //Handle event closing out





