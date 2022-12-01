/**
 * @author: Ashwin Rohit Alagiri Rajan
 */
class GraphComponent extends HTMLElement {
	constructor() {
		super();

		// create a shadow root
		const shadow = this.attachShadow({ mode: 'open' });

		// create elements
		const div = document.createElement('div');
		div.setAttribute('class', 'graph component');

		const h2 = document.createElement('h2');
		h2.setAttribute('class', 'component-title');
		h2.textContent = 'Yearly Spending';

		const graphContainer = document.createElement('div');
		graphContainer.setAttribute('class', 'glass-box graph-container');

		const barGraph = document.createElement('div');
		barGraph.setAttribute('class', 'bar-graph');

		const amountAxis = document.createElement('div');
		amountAxis.setAttribute('id', 'amount-axis');

		const monthAxis = document.createElement('div');
		monthAxis.setAttribute('id', 'month-axis');

		// skip the amount axis and month axis for now

		// Style link for styles.css
		const linkElem = document.createElement('link');
		linkElem.rel = 'stylesheet';
		linkElem.href = '../css/styles.css';

		// Style link for report.css
		const linkElem2 = document.createElement('link');
		linkElem2.rel = 'stylesheet';
		linkElem2.href = '../css/report.css';

		// append the elements to the shadow root
		graphContainer.appendChild(barGraph);
		graphContainer.appendChild(amountAxis);
		graphContainer.appendChild(monthAxis);
		div.appendChild(h2);
		div.appendChild(graphContainer);
		shadow.appendChild(linkElem);
		shadow.appendChild(linkElem2);
		shadow.appendChild(div);
	}

	// create a function to add the bar-graph-item divs, the amount axis, and the month axis

	/**
	 * @param {Number} target - The monthly target spending amount
	 * @param {Array} yearlyTransactions - an array of objects with the following properties:
	 * @param {string} yearlyTransactions[].name - the name of the transaction
	 * @param {number} yearlyTransactions[].amount - the amount of the transaction
	 * @param {string} yearlyTransactions[].date - the date of the transaction
	 * @param {string} yearlyTransactions[].description - the description of the transaction
	 */
	set data({ target, transactions }) {
		// create a bar graph item for each transaction and set the height of the bar graph item to the percentage of the transaction amount to the max amount

		// get the bar graph
		const barGraph = this.shadowRoot.querySelector('.bar-graph');

		// first calculate the max amount

		// create 12 months from 12 months ago to now including the current month
		const months = [];
		const now = new Date();
		for (let i = 0; i < 12; i++) {
			const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
			months.push(month);
		}

		// reverse the months array so that the months are in chronological order
		months.reverse();

		// match the transactions to the months
		const monthlyTransactions = [];
		months.forEach(month => {
			const monthTransactions = transactions.filter(transaction => {
				const transactionDate = new Date(transaction.date);
				return (
					transactionDate.getFullYear() === month.getFullYear() &&
					transactionDate.getMonth() === month.getMonth()
				);
			});
			monthlyTransactions.push(monthTransactions);
		});

		// calculate the total amount for each month with absolute amounts excluding the positive amounts
		const monthlyAmounts = monthlyTransactions.map(monthTransactions => {
			let totalAmount = 0;
			monthTransactions.forEach(transaction => {
				if (transaction.amount < 0) {
					totalAmount += -transaction.amount;
				}
			});
			// return the absolute value of the total amount
			return totalAmount;
		});

		let maxAmount = 0;
		monthlyAmounts.forEach(transaction => {
			if (transaction > maxAmount) {
				maxAmount = transaction;
			}
		});

		// add some padding to the max amount
		maxAmount += 500;
		maxAmount = Math.ceil(maxAmount / 1000) * 1000;

		// create a bar graph item for each monthly amount
		monthlyAmounts.forEach((monthlyAmount, index) => {
			const barGraphItem = document.createElement('div');
			barGraphItem.setAttribute('class', 'bar-graph-item');

			// create the foreground and background divs
			const foreground = document.createElement('div');
			const background = document.createElement('div');
			foreground.setAttribute('class', 'foreground');
			background.setAttribute('class', 'background');

			// set the height of the foreground div to the percentage of the monthly amount to the max amount clamped by the target
			const percentage = Math.min(monthlyAmount / maxAmount, target / maxAmount);
			foreground.style.height = `calc(${percentage * 100}% - 26px)`;

			// set the height of the background div to the percentage of the monthly to the max amount
			background.style.height = `calc(${(monthlyAmount / maxAmount) * 100}% - 26px)`;

			// append the foreground and background divs to the bar graph item
			barGraphItem.appendChild(background);
			barGraphItem.appendChild(foreground);

			// append the bar graph item to the bar graph
			barGraph.appendChild(barGraphItem);

			// create a month axis item for each month
			const monthAxisItem = document.createElement('div');
			monthAxisItem.setAttribute('id', 'month-axis');

			// set the text content of the month axis item to the month name
			monthAxisItem.textContent = months[index].toLocaleString('default', { month: 'short' });

			// append the month axis item to the month axis
			const monthAxis = this.shadowRoot.querySelector('#month-axis');
			monthAxis.appendChild(monthAxisItem);
		});

		// approximate the max amount to the nearest 1000
		maxAmount = Math.ceil(maxAmount / 1000) * 1000;

		// create an amount axis item for each 1000 up to the max amount with the amount being suffixed with a k for thousands and with a precision of 1 decimal place excluding the first amount axis item
		for (let i = maxAmount; i >= 1000; i -= 1000) {
		const amountAxisItem = document.createElement('div');
			amountAxisItem.setAttribute('id', 'amount-axis');

			// set the text content of the amount axis item to the amount
			amountAxisItem.textContent = `$${(i / 1000).toFixed(1)}k`;

			// append the amount axis item to the amount axis
			const amountAxis = this.shadowRoot.querySelector('#amount-axis');
			amountAxis.appendChild(amountAxisItem);
		}

		// now add the first amount axis item to the amount axis
		const amountAxisItem = document.createElement('div');

		// set the text content of the amount axis item to the amount
		amountAxisItem.textContent = '$500';

		// append the amount axis item to the amount axis
		const amountAxis = this.shadowRoot.querySelector('#amount-axis');
		amountAxis.appendChild(amountAxisItem);
	}
}

// define the custom element
customElements.define('bar-graph', GraphComponent);