class RecentActivity extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		const styles = document.createElement('style');

		const divider = document.createElement('div');
		divider.setAttribute('class', 'recent-activity');
		divider.innerHTML = `
		<h2 class='section-title'>Recent Activity</h2>
		<div class='recent-activity-box'>
		<table>
		</table>
		</div>
		`;

	}

	/**
     * Called when the .data property is set on this element.
     * 
     * For Example:
     * let recent_transaction = document.createElement('rec-trans'); // Calls constructor()
     * recent_transaction.data = { [foo: 'bar'] } // Calls set data({ [foo: 'bar'] })
     *
     * @param {Object} data - The data to pass into the <rec-trans>, must be of the
     *                        following format:
     *                        {
     *                          ["name": "string",
     *                          "amount": "double",
     *                          "wallet": "string"],
	 * 							...
	 * 							["name": "string",
     *                          "amount": "double",
     *                          "wallet": "string"]
     *                        }
     */
	set data(data) {
		// if data null return
		if(!data) {
			return;
		}
		// parse data
		const transactions = JSON.parse(data);
		const table = this.shadowRoot.querySelector('table');

		// for every JSON object passed in create a transaction and add to table.
		for(var t of transactions){
			var new_trans = document.createElement('tr');
			new_trans.innerHTML = `
			<td class="transaction-name">${t.name}</td>
            <td class="transaction-amount" data-kind="amount" data-transaction-kind="negative">${t.amount}</td>
            <td class="wallet-name">${t.wallet}</td>			
			`;
			// TODO: decide how we will indicate a transaction is negative
			table.appendChild(new_trans);
		}

	}
}

customElements.define('rec-act', RecentActivity);