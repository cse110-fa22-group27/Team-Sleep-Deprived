class WalletInfo extends HTMLElement {
	constructor() {
		super();
		this.shadowElem = this.attachShadow({mode: 'open'});
		this.elementRoot = document.createElement('div');
		this.elementRoot.className = 'wallet-info glass-box';

		this.walletName = document.createElement('h3');
		this.walletName.className = 'wallet-name';

		this.walletAmount = document.createElement('p');
		this.walletAmount.className = 'wallet-amount';

		this.walletLastTransaction = document.createElement('p');
		this.walletLastTransaction.className = 'wallet-last-transaction';
		this.walletLastTransaction.dataset.transactionType = 'negative';

		this.styleElem = document.createElement('link');
		this.styleElem['rel'] = 'stylesheet';
		this.styleElem['href'] = '../css/wallet-styles.css';

        this.elementRoot.addEventListener('click', event => {
            window.open('../../source/html/wallet_info.html', '_self');
        });

        this.elementRoot.append(this.walletName, this.walletAmount, this.walletLastTransaction, this.styleElem);
        this.shadowElem.append(this.elementRoot);
    }

	/**
     * data: {
     *   name: String,
     *   amount: Number,
     *   lastTransaction: {name: String, amount: Number, positive: bool}
     * }
    **/
    set data(data) {
        this.walletName.innerHTML = data.name;
        this.walletAmount.innerHTML = `$${data.amount}`;
        this.walletLastTransaction.innerHTML = `<strong>${data.lastTransaction.name}</strong> $${data.lastTransaction.amount}`;
        this.walletLastTransaction.dataset.transactionType = data.lastTransaction.type;
    }


}
customElements.define('wallet-info', WalletInfo);