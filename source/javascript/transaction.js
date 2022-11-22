class TransactionElement extends HTMLElement {
	constructor() {
		super();
		this.shadowDom = this.attachShadow({'mode':'open'});
		this.rootDiv = document.createElement('div');
		this.rootDiv.className = 'add-transaction';
		this.titleDiv = document.createElement('div');
		this.titleDiv.className = 'transcontai';
		this.transactionDiv = document.createElement('div');
		this.rootDiv.append(this.titleDiv, this.transactionDiv);
		this.amountDiv = document.createElement('div');
		this.dateDiv = document.createElement('div');
		this.walletDiv = document.createElement('div');
		this.categoryDiv = document.createElement('div');
		this.descriptionDiv = document.createElement('div');
		document.getElementById('title');
		this.shadowDom.append(this.rootDiv);
	}

	/**
     * Called when the .data property is set on this element.
     * 
     * For Example:
     * let transaction = document.createElement('trans-elem'); // Calls constructor()
     * transaction.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
     *
     * @param {Object} data - The data to pass into the <recipe-card>, must be of the
     *                        following format:
     *                        {
     *                          "name": "string",
     *                          "amount": "double",
     *                          "wallet": "string"
     *                        }
     */
	set data(data) {
		// if data null return
		if(!data) {
			return;
		}
		this.titleDiv.innerHTML = data.title;
	}
}

customElements.define('trans-elem', TransactionElement);