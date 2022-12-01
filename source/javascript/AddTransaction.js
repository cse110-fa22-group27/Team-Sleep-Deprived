/**
 * @author Ashwin Rohit Alagiri Rajan
 */

class AddTransaction extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });
		const div = document.createElement('div');
		div.setAttribute('class', 'add-transaction');
		const h2 = document.createElement('h2');
		h2.setAttribute('class', 'section-title');
		h2.textContent = 'Add Transaction';

		const addTransactionBox = document.createElement('form');
		addTransactionBox.setAttribute('class', 'add-transaction-box glass-box');

		const name = document.createElement('div');
		name.setAttribute('class', 'name');
		const nameLabel = document.createElement('label');
		nameLabel.setAttribute('for', 'input-name');
		nameLabel.textContent = 'Name';
		const nameInput = document.createElement('input');
		nameInput.setAttribute('type', 'text');
		nameInput.setAttribute('id', 'input-name');
		nameInput.setAttribute('name', 'name');
		nameInput.setAttribute('placeholder', 'Name');
		name.appendChild(nameLabel);
		name.appendChild(nameInput);

		const amount = document.createElement('div');
		amount.setAttribute('class', 'amount');
		const amountLabel = document.createElement('label');
		amountLabel.setAttribute('for', 'input-amount');
		amountLabel.textContent = 'Amount Deducted';
		const amountInput = document.createElement('input');
		amountInput.setAttribute('type', 'text');
		amountInput.setAttribute('id', 'input-amount');
		amountInput.setAttribute('name', 'amount');
		amountInput.setAttribute('placeholder', 'Enter Amount($)');
		amount.appendChild(amountLabel);
		amount.appendChild(amountInput);

		const date = document.createElement('div');
		date.setAttribute('class', 'date');
		const dateLabel = document.createElement('label');
		dateLabel.setAttribute('for', 'input-date');
		dateLabel.textContent = 'Date';
		const dateInput = document.createElement('input');
		dateInput.setAttribute('type', 'date');
		dateInput.setAttribute('id', 'input-date');
		dateInput.setAttribute('name', 'date');
		dateInput.setAttribute('required', '');
		date.appendChild(dateLabel);
		date.appendChild(dateInput);

		const wallet = document.createElement('div');
		wallet.setAttribute('class', 'wallet');
		const walletLabel = document.createElement('label');
		walletLabel.setAttribute('for', 'wallet-select');
		walletLabel.textContent = 'Wallet';
		this.walletSelect = document.createElement('select');
		this.walletSelect.setAttribute('id', 'wallet-select');
		this.walletSelect.setAttribute('name', 'wallet');
		this.walletSelect.setAttribute('required', '');
		wallet.appendChild(walletLabel);
		wallet.appendChild(this.walletSelect);

		const description = document.createElement('div');
		description.setAttribute('class', 'description');
		const descriptionLabel = document.createElement('label');
		descriptionLabel.setAttribute('for', 'desc-input');
		descriptionLabel.textContent = 'Description';
		const descriptionInput = document.createElement('textarea');
		descriptionInput.setAttribute('type', 'text');
		descriptionInput.setAttribute('id', 'desc-input');
		descriptionInput.setAttribute('name', 'description');
		descriptionInput.setAttribute('placeholder', '...uber ride from Scripps to UTC');
		description.appendChild(descriptionLabel);
		description.appendChild(descriptionInput);

		const button = document.createElement('button');
		button.setAttribute('class', 'button');
		button.setAttribute('type', 'submit');
		button.textContent = '+ Add Transaction';
		
		addTransactionBox.appendChild(name);
		addTransactionBox.appendChild(amount);
		addTransactionBox.appendChild(date);
		addTransactionBox.appendChild(wallet);
		addTransactionBox.appendChild(description);
		addTransactionBox.appendChild(button);

		div.appendChild(h2);
		div.appendChild(addTransactionBox);

		const defaultStyleLink = document.createElement('link');
		defaultStyleLink.setAttribute('rel', 'stylesheet');
		defaultStyleLink.setAttribute('href', '../css/styles.css');

		const dashboardStyleLink = document.createElement('link');
		dashboardStyleLink.setAttribute('rel', 'stylesheet');
		dashboardStyleLink.setAttribute('href', '../css/dashboard.css');

		div.appendChild(defaultStyleLink);
		div.appendChild(dashboardStyleLink);

		shadow.appendChild(div);
	}

	set data(wallets) {
		this.wallets = wallets;
		this.wallets.forEach(wallet => {
			const option = document.createElement('option');
			option.setAttribute('value', wallet.name);
			option.textContent = wallet.name;
			this.walletSelect.appendChild(option);
		});
	}
}

customElements.define('add-transaction', AddTransaction);