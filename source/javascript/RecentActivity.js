/**
 * @author Anthony Chen
 * @author Ashwin Rohit Alagiri Rajan
 * @author Javier De La Cruz
 * @fileoverview This file contains the RecentActivity class which is a custom element that is used to display the recent transactions table in the dashboard page
 */
import { showTransactionDetails } from './DisplayTransactionDetails.js';

class RecentActivity extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this.styles = document.createElement('style');
		this.styles.innerHTML = '@import \'../css/dashboard.css\';@import \'../css/styles.css\';';

		const divider = document.createElement('div');
		divider.setAttribute('class', 'recent-activity');
		divider.innerHTML = `
		<h2 class='section-title'>Recent Activity</h2>
		<div class='recent-activity-box glass-box'>
		<table>
			<thead>
			<tr>
				<th class="transaction-name" id="recent-transactions-name-title">Name</th>
				<th class="transaction-amount" id="recent-transactions-amount-title">Amount $</th>
				<th class="wallet-name">Wallet</th>
			</tr>
			</thead>
		</table>
		</div>
		`;
		const recentActivity = document.createElement('div');
		recentActivity.setAttribute('class', 'recent-activity');
		recentActivity.innerHTML = `
		<h2 class='section-title'>Recent Activity</h2>
		<table class='recent-activity-box glass-box'>
			<thead>
			<tr>
				<th class="transaction-name" id="recent-transactions-name-title">Name</th>
				<th class="transaction-amount" id="recent-transactions-amount-title">Amount $</th>
				<th class="wallet-name">Wallet</th>
				</tr>
				</thead>
				</table>
				`;
		this.shadowRoot.append(this.styles, recentActivity);
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
		if (!data) {
			return;
		}
		// parse data
		const transactions = JSON.parse(data);
		const table = this.shadowRoot.querySelector('table');
		table.innerHTML = `
						<thead>
							<tr>
								<th class="transaction-name" id="recent-transactions-name-title">Name</th>
								<th class="transaction-amount" id="recent-transactions-amount-title">Amount $</th>
								<th class="wallet-name">Wallet</th>
							</tr>
						</thead>`; //clear table

		const tbody = document.createElement('tbody');
		// for every JSON object passed in create a transaction and add to table.
		for (let t of transactions) {
			let new_trans = document.createElement('tr');
			if (t.amount < 0) {
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
			new_trans.addEventListener('click', () => {
				showTransactionDetails(t);
			});
			tbody.appendChild(new_trans);
		}
		table.appendChild(tbody);
	}
}

customElements.define('rec-act', RecentActivity);