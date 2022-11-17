class TransactionElement extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        // const root = shadow.shadowRoot;
        // var trans = document.createElement("div");
        // var name = document.createElement("p");
        // var amount = document.createElement("p");
        // var date = document.createElement("p");

        // var style = document.createElement("style");
        // style.textContent = {};

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
        var transaction = this.shadowRoot.querySelector('div');
        transaction.innerHTML = `
        <div class="trans-container">
            <p id="name">${data.name}</p>
            <p id="amount">(${data.amount})</p>
            <p id="wallet">${data.wallet}</p>
        </div>
        `;
    }
}

customElements.define("trans-elem", TransactionElement);