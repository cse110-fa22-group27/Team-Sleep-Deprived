/**
 * @jest-environment jsdom
 */

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
		this.styleElem['href'] = '../css/wallet-styles.css';

		this.elementRoot.addEventListener('click', event => {
			event.preventDefault();
			window.open('../../source/html/wallet_info.html', '_self');
		});

		this.elementRoot.append(this.walletName, this.walletAmount, this.walletLastTransaction, this.styleElem);
		this.shadowElem.append(this.elementRoot);
	}

	/**
     * @typedef {Object} transaction
     * @property {string} name Name of the last transaction
     * @property {number} amount Last transaction amount
     * @property {string} type Last transaction type - either "positive" or "negative" 
     */

	/**
     * @typedef {Object} wallet_data
     * @property {string} name Name of the wallet
     * @property {number} amount The amount remaining in the wallet
     * @property {transaction} lastTransaction Last transaction details
     */

	/**
    * @param {wallet_data} wallet_data The data object that contains the wallet information
    */
	set data(wallet_data) {
		this.walletName.innerHTML = wallet_data.name;
		this.walletAmount.innerHTML = `$${wallet_data.amount}`;
		this.walletLastTransaction.innerHTML = `<strong>${wallet_data.lastTransaction.name}</strong> $${wallet_data.lastTransaction.amount}`;
		this.walletLastTransaction.dataset.transactionType = wallet_data.lastTransaction.type;
	}

}
customElements.define('wallet-info', WalletInfo);

/**
 * @author Michael Phung
 * @test
 * WalletInfo basic unit tests. This contains basic unit tests for WalletInfo.
 */

// These 4 lines (93 - 96) allow for us to use 'document' while not in the browser
const fs = require('fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('../Team-Sleep-Deprived/source/html/wallet_info.html');
const page = new JSDOM(html);

let walletData = {
	name: 'hello',
	amount: 23,
	lastTransaction: {
		name: 'yo',
		amount: 222,
		type: 'positive'
	}
};

let newWalletInfo = document.createElement('wallet-info');
let element = document.getElementsByClassName('wallet-info');

newWalletInfo.data = {
	name: walletData.name,
	amount: walletData.amount,
	lastTransaction: {
		name: walletData.lastTransaction.name,
		amount: walletData.lastTransaction.amount,
		type: walletData.lastTransaction.type
	}
};

test('Existence of wallet-info', () => {
	expect(typeof element).not.toBe(undefined);
});

test('Check existence of newWalletInfo', () => {
	expect(newWalletInfo).not.toBe(undefined);
});

test('Check class name of newWalletInfo elementRoot', () => {
	expect(newWalletInfo.elementRoot.className).toBe('wallet-info glass-box');
});

test('Check class name of newWalletInfo walletName', () => {
	expect(newWalletInfo.walletName.className).toBe('wallet-name');
});

test('Check class name of newWalletInfo walletAmount', () => {
	expect(newWalletInfo.walletAmount.className).toBe('wallet-amount');
});

test('Check class name of newWalletInfo walletLastTransaction', () => {
	expect(newWalletInfo.walletLastTransaction.className).toBe('wallet-last-transaction');
});

module.exports = page;