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
}
customElements.define("trans-elem", TransactionElement);