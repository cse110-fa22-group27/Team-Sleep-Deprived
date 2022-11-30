/**
 * @author Ashwin Rohit Alagiri Rajan
 * @class
 * @implements {HTMLElement}
 * WalletInfo custom component. This contains the custom component definition for wallet-info.
 */
class WalletInfo extends HTMLElement {
	/** 
     * @constructs WalletInfo
     */
	constructor() {
		super();
		this.shadowElem = this.attachShadow({mode: 'open'});
        
		/**
         * The root div of the wallet-info component
         * @member {HTMLElement} elementRoot 
         */
		this.elementRoot = document.createElement('div');
		this.elementRoot.className = 'wallet-info glass-box';

		/**
         * The title of the wallet-info component
         * @member {HTMLElement} walletName
         */
		this.walletName = document.createElement('h3');
		this.walletName.className = 'wallet-name';

		/**
         * Displays the wallet amount of the component
         * @member {HTMLElement} walletAmount
         */
		this.walletAmount = document.createElement('p');
		this.walletAmount.className = 'wallet-amount';

		/**
         * Displays the last transaction with the amount. Colors it according to the type of transaction.
         * @member {HTMLElement} walletLastTransaction
         */
		this.walletLastTransaction = document.createElement('p');
		this.walletLastTransaction.className = 'wallet-last-transaction';
		this.walletLastTransaction.dataset.transactionType = 'negative';

		/**
         * Styles the wallet info component. The stylesheet is defaulted to <code>../css/wallet-styles.css</code>
         * @member {HTMLElement} styleElem
         */
		this.styleElem = document.createElement('link');
		this.styleElem['rel'] = 'stylesheet';
		this.styleElem['href'] = '../css/wallet.css';

		this.defaultStyleLink = document.createElement('link');
		this.defaultStyleLink.href = '../css/styles.css';
		this.defaultStyleLink.rel = 'stylesheet';

		this.elementRoot.addEventListener('click', event => {
			event.preventDefault();
			window.open('../../source/html/wallet_info.html', '_self');
		});

		this.elementRoot.append(this.walletName, this.walletAmount, this.walletLastTransaction, this.styleElem, this.defaultStyleLink);
		this.shadowElem.append(this.elementRoot);
	}

	/**
     * @typedef {Object} transaction
     * @property {string} name Name of the last transaction
     * @property {number} amount Last transaction amount
     */

	/**
     * @typedef {Object} wallet_data
     * @property {string} name Name of the wallet
     * @property {number} amount The amount remaining in the wallet
     * @property {transaction} lastTransaction Last transaction details
     */

	/**
    * @param {wallet_data} walletData The data object that contains the wallet information
    */
	set data(walletData) {
		this.walletName.innerHTML = walletData.name;
		this.walletAmount.innerHTML = `$${walletData['total-amount']}`;
		if(walletData.lastTransaction) {
			this.walletLastTransaction.innerHTML = `<strong>${walletData.lastTransaction.name}</strong> $${Math.abs(walletData.lastTransaction.amount)}`;
			const lastTransactionType = walletData.lastTransaction.amount > 0 ? 'positive' : 'negative';
			this.walletLastTransaction.dataset.transactionType = lastTransactionType;
		} else {
			this.walletLastTransaction.innerHTML = 'No transactions yet';
			this.walletLastTransaction.dataset.transactionType = 'unknown';
		}
	}

}
customElements.define('wallet-info', WalletInfo);