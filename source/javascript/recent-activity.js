class RecentActivity extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		var styles = document.createElement('style');
		var divider = document.createElement('div');

		divider.setAttribute('class', 'recent-activity');
		divider.innerHTML = `
		<h2 class='section-title'>Recent Activity</h2>
		<div class='recent-activity-box'>
		<table>
		</table>
		</div>
		`;
		this.shadowRoot.append(divider);
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
	 * 							"date": "mm-dd-yyyy",
	 * 							"description": "string"],
	 *                          ...
	 *                          ["name": "string",
	 *                          "amount": "double",
	 * 							"date": "mm-dd-yyyy",
	 * 							"description": "string"]
	 *                        }
	 */
	set data(data) {
		// if data null return
		if(!data) {
			return;
		}
		// parse data
		var transactions = JSON.parse(data);
		var table = this.shadowRoot.querySelector('table');

		// for every JSON object passed in create a transaction and add to table.
		for(var t of transactions){
			var new_trans = document.createElement('tr');
			if(t.amount < 0){
				new_trans.innerHTML = `
				<td class="transaction-name">${t.name}</td>
				<td class="transaction-amount" data-kind="amount" data-transaction-kind="negative">(${t.amount})</td>
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