class TransactionDetails extends HTMLElement {
	constructor() {
		super(); 
		this.attachShadow({ mode: 'open' });
		const styles = document.createElement('style');
		styles.innerHTML = '@import \'../css/dashboard.css\';@import \'../css/styles.css\';@import \'../css/transaction-info.css\';';

		const rootDiv = document.createElement('div');
		rootDiv.setAttribute('class', 'transaction-details-root glass-box');

		const transactionName = document.createElement('h2');
		transactionName.setAttribute('class', 'transaction-name');
		transactionName.setAttribute('id', 'transaction-name');

		const transactionAmount = document.createElement('h2');
		transactionAmount.setAttribute('class', 'transaction-amount');
		transactionAmount.setAttribute('id', 'transaction-amount');

		const transactionDate = document.createElement('h2');
		transactionDate.setAttribute('class', 'transaction-date');
		transactionDate.setAttribute('id', 'transaction-date');

		const transactionDescription = document.createElement('h2');
		transactionDescription.setAttribute('class', 'transaction-description');
		transactionDescription.setAttribute('id', 'transaction-description');

		// create a close button that destroys the element
		const closeButton = document.createElement('button');
		closeButton.setAttribute('class', 'close-button');
		closeButton.innerHTML = 'Close Description';
		closeButton.addEventListener('click', () => {
			this.remove();
		});
		rootDiv.append(transactionName, transactionAmount, transactionDate, transactionDescription, closeButton);
		this.shadowRoot.append(styles, rootDiv);
	}

	set data(transactionData) {
		const transactionName = this.shadowRoot.querySelector('#transaction-name');
		const transactionAmount = this.shadowRoot.querySelector('#transaction-amount');
		const transactionDate = this.shadowRoot.querySelector('#transaction-date');
		const transactionDescription = this.shadowRoot.querySelector('#transaction-description');
		transactionName.innerHTML = `<strong>Name:</strong> ${transactionData.name}`;
		const amount = `$${-transactionData.amount}`;
		console.log(amount);
		transactionAmount.innerHTML = `<strong>Spent:</strong> ${amount}`;
		transactionDate.innerHTML = `<strong>Date:</strong> ${transactionData.date}`;
		transactionDescription.innerHTML = `<strong>Description:</strong> ${transactionData.description}`;
	}
}

customElements.define('transaction-details', TransactionDetails);

const showTransactionDetails = async (transaction) => {
	// remove any previous transaction details
	const transactionDetailsPrev = document.querySelector('transaction-details');
	if (transactionDetailsPrev) {
		transactionDetailsPrev.remove();
	}
	const transactionDetails = document.createElement('transaction-details');
	transactionDetails.data = transaction;
	document.body.append(transactionDetails);
}

export { showTransactionDetails };