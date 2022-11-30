import { getCurrentUserWallets, setCurrentUserWallets } from './globals';

class TransactionForm extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		var form = document.createElement('form');
		form.setAttribute('class', 'add-transaction');
		form.onsubmit = addTransaction;
		// html for the TransactionForm
		form.innerHTML = `
		<h2 class="section-title">Add Transaction</h2>
				<div class="add-transaction-box glass-box ">
					<div class="name">
						<label for="input-name">Name</label><br>
						<input type="text" id="input-name" name="input-name" placeholder="Enter name" required>
					</div>

					<div class="amount">
						<label for="input-amount">Amount</label><br>
						<input type="text" id="input-amount" name="input-amount" placeholder="Enter amount" required>
					</div>

					<div class="date">
						<label for="input-date">Date</label><br>
						<input type="date" id="input-date" name="input-date" required>
					</div>

					<div class="wallet">
						<label for="wallet-select">Wallet</label><br>
						<select id="wallet-select" name="wallet-select" required></select>
					</div>

					<div class="description">
						<label for="desc-input">Description</label><br>
						<textarea type="text" id="desc-input" name="desc-input"></textarea>
					</div> 

						<button class = "button">
							+ Add Transaction
						</button>
				</div>
		`;
		// css stylying for TransactionForm
		const dashboardStyleLink = document.createElement('link');
		dashboardStyleLink['href'] = '../css/dashboard.css';
		dashboardStyleLink['rel'] = 'stylesheet';

		// append form and style
		this.shadowRoot.append(form, dashboardStyleLink);
	}

	

	/**
	 * Called when the .data property is set on this element. Should be called more
	 * more than once because function updates wallet-select options and parameter should
	 * be getCurrentUserWallets(). 
	 * 
	 * For Example:
	 * let form = document.createElement('trans-form'); // Calls constructor()
	 * form.data = { [foo: 'bar'] } // Calls set data({ [foo: 'bar'] })
	 *
	 * @param {Object} wallets - The data to pass into the <rec-act>, must be of the
	 *                        following array of wallets format:
	 *                        {
	 *                         [wallet, wallet,...,wallet, wallet]
	 *                        }
	 */
	set data(wallets) {
		// if data null return
		if(!wallets) {
			return;
		}
		let select = this.shadowRoot.getElementById('wallet-select');
		for(var t of wallets){
			let option = document.createElement('option');
			option.setAttribute('value', t.name);
			option.innerText = t.name;
			select.appendChild(option);
		}
	}


}

customElements.define('trans-form', TransactionForm);


/**
 * Add Transaction is run when input button on the form is clicked.
 * 
 */

function addTransaction(e) {
	// get form that fired this event
	const form = e.target;

	// create variables 
	let name = form.elements['input-name'].value;
	let amount = form.elements['input-amount'].value;
	let date = new Date(form.elements['input-date'].value);
	let wallet = form.elements['wallet-select'].value;
	let description = form.elements['desc-input'].value;

	// create transaction object from variables
	var transaction = {"name": name, "amount": amount, "date": date, "description": description};

	// access wallet from user object
	let wallets = getCurrentUserWallets();
	// if names match push to transaction array
	for(var w of wallets){
		if(w.name == wallet){
			w.transactions.push(transaction);
		}
	}
	// update wallets
	setCurrentUserWallets(wallets);
}