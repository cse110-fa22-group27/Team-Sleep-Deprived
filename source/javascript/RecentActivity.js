class RecentActivity extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		const styles = document.createElement('style');
		styles.innerHTML = `@import '../css/dashboard.css';@import '../css/styles.css';`;

		const divider = document.createElement('div');
		divider.setAttribute('class', 'recent-activity');
		divider.innerHTML = `
		<h2 class='section-title'>Recent Activity</h2>
		<div class='recent-activity-box glass-box'>
		<table>
			<tr>
				<th class="transaction-name" id="recent-transactions-name-title">Name</th>
				<th id="recent-transactions-amount-title">Amount $</th>
				<th>Wallet</th>
			</tr>
		</table>
		</div>
		`;
		this.shadowRoot.append(styles, divider);
	}

	/**
	 * Called when the .data property is set on this element.
	 * 
	 * For Example:
	 * let recent_activity = document.createElement('rec-act'); // Calls constructor()
	 * recent_activity.data = { [foo: 'bar'] } // Calls set data({ [foo: 'bar'] })
	 *
	 * @param {Object} data - The data to pass into the <rec-act>, must be of the
	 *                        following format:
	 *                        {
	 *                          ["name": "string",
	 *                          "amount": "double",
	 *                          "wallet": "string"],
	 *                          ...
	 *                          ["name": "string",
	 *                          "amount": "number",
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
		table.innerHTML = `<tr>
								<th class="transaction-name" id="recent-transactions-name-title">Name</th>
								<th id="recent-transactions-amount-title">Amount $</th>
								<th>Wallet</th>
							</tr>`; //clear table

		// for every JSON object passed in create a transaction and add to table.
		for(var t of transactions){
			var new_trans = document.createElement('tr');
			console.log(t);
			if(t.amount < 0){
				new_trans.innerHTML = `
				<td class="transaction-name">${t.name}</td>
				<td class="transaction-amount" data-kind="amount" data-transaction-kind="negative">(${-t.amount})</td>
				<td class="wallet-name">${t.wallet}</td>			
				`;
			}
			else {
				new_trans.innerHTML = `
				<td class="transaction-name">${t.name}</td>
				<td class="transaction-amount" data-kind="amount" data-transaction-kind="positive">${t.amount}</td>
				<td class="wallet-name">${t.wallet}</td>			
				`;
			}
			table.appendChild(new_trans);
		}
	}
}

customElements.define('rec-act', RecentActivity);