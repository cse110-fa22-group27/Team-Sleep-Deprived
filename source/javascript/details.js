import { getCurrentUserWallets, setCurrentUserWallets } from './globals.js'

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

    let heading = document.querySelector('#wallet-details-page-title');
    heading.innerHTML = currentWallet['name'];
});

function timeSelection() {
    const list = document.getElementById('timespan-input');
    const option = list.options[list.selectedIndex].value;
    if(option == 'week') {
        console.log('week');

    } else if(option == 'month') {
        console.log('month');

    } else if (option == 'year') {
        console.log('year');
    }

}

 
function goBackToWalletsPage() {
    // console.log('goBackToWalletsPage()');
    localStorage.removeItem('currentWalletName');
    window.open('../html/wallets.html', '_self');
}


// todo
async function deleteWallet(){
    // console.log('deleteWallet()');
    // const currentWallet = JSON.parse(localStorage.getItem('currentWalletName'));
    // let wallets = await getCurrentUserWallets();
    // let newWallets = [];
    // for(const wallet in wallets) {
    //     if(wallet.name != currentWallet) {
    //         newWallets.push(wallet);
    //     }
    // }
    // setCurrentUserWallets(newWallets);
    // localStorage.removeItem('currentWalletName');
    // note for above - initWalletPage()


    goBackToWalletsPage();
}

document.getElementById("back-button").addEventListener ("click", goBackToWalletsPage);
document.getElementById("delete-button").addEventListener ("click", deleteWallet);
// document.getElementById("timespan-input").addEventListener("onchange", timeSelection);
