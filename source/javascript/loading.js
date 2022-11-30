class Loading extends HTMLElement {
	constructor() {
		super();
		this.shadowElement = this.attachShadow({mode: 'open'});
		this.root = document.createElement('div');
		this.root.id = "loading";

		this.loadingText = document.createElement('h3');
		this.loadingText.innerText = "Loading";
		this.loadingText.id = "loading-text";

		// create 3 dots for loading animation
		this.dot1 = document.createElement('span');
		this.dot1.innerText = ".";
		this.dot1.id = "dot1";

		this.dot2 = document.createElement('span');
		this.dot2.innerText = ".";
		this.dot2.id = "dot2";

		this.dot3 = document.createElement('span');
		this.dot3.innerText = ".";
		this.dot3.id = "dot3";

		this.root.append(this.loadingText, this.dot1, this.dot2, this.dot3);
		this.shadowElement.append(this.root);
	}
}

customElements.define('loading-element', Loading);

const body = document.querySelector('body');
const loading = document.createElement('loading-element');
body.append(loading);