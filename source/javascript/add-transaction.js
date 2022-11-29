class TransactionForm extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		const form = document.createElement('form');
		form.setAttribute('class', 'add-transaction');
        form.setAttribute('onsubmit','addTransaction();');

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
                        <input type="text" id="desc-input" name="desc-input">
                    </div> 

                    <div class="add">
                        <label for="add-button"></label>
                        <input type="submit" id="add-button" name="add-button" value="+ Add Transaction">
                    </div> 
                </div>
		`;
		this.shadowRoot.append(divider);
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
		if(!data) {
			return;
		}
        let select = document.getElementById('wallet-select');
        for(var t of wallets){
            let option = document.createElement('option');
            option.setAttribute('value', t.name);
            option.innerText = 't.name';
            select.appendChild(option);
        }
	}


}

customElements.define('trans-form', TransactionForm);


/**
 * Add Transaction is run when input button on the form is clicked.
 * 
 */

 function addTransaction() {
    let name = document.getElementById('input-name').value;
    let amount = document.getElementById('input-amount').value;
    let date = document.getElementById('input-date').value;
    let wallet = document.getElementById('wallet-select').value;
    let description = document.getElementById('desc-input').value;

    // create transaction object
    var transaction = {"name": name, "amount": amount, "date": date, "description": description};

    let wallets = getCurrentUserWallets();
    // access wallet from user object
    for(var t of wallets){
        if(t.name == wallet){
            t.append(jsonObj);
        }
    }
    setCurrentUserWallets(wallets);
}
