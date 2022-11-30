window.addEventListener('load', () => { 
    const walletDetails = document.createElement('wallet-details');
    const detailsGrid = document.querySelector('#wallet-details-root');
    detailsGrid.appendChild(walletDetails);
});

export function goBackToWalletsPage() {
    console.log("GO BACK TO WALLETS");
    window.open('../../source/html/wallets.html', '_self');
  }