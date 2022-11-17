class RecentTransaction extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        const divider = document.createElement('div');
        const style = document.createElement('style');
        style.innerHTML = `
        .trans-container {
            display: flex;
        }
        .trans-container > div {

        }
        `;
        this.shadowRoot.appendChild(divider);
        this.shadowRoot.appendChild(style);

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
        transaction.innerHTML = ``;
    }
}
customElements.define("trans-elem", TransactionElement);