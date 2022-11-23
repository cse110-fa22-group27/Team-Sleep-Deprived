class AddWallet extends HTMLElement {
	constructor() {
		super();
		this.shadowElement = this.attachShadow({mode: 'open'});
		this.root = document.createElement('div');
		this.root.id = 'new-wallet';
		this.root.className = 'wallet-info glass-box';

		this.titleElem = document.createElement('h3');
		this.titleElem.className = 'wallet-name';
		this.titleElem.innerText = 'New Wallet';

		this.addIcon = document.createElement('img');
		this.addIcon.id = 'add-icon';
		this.addIcon['src'] = '../resources/images/plus-button.svg';

		this.stylesheetLink = document.createElement('link');
		this.stylesheetLink['rel'] = 'stylesheet';
		this.stylesheetLink['href'] = '../css/wallet.css';

		this.stylesheetLink1 = document.createElement('link');
		this.stylesheetLink1['rel'] = 'stylesheet';
		this.stylesheetLink1['href'] = '../css/styles.css';

		this.root.append(this.titleElem, this.addIcon, this.stylesheetLink, this.stylesheetLink1);
		this.shadowElement.append(this.root);
	}
}

customElements.define('add-wallet', AddWallet);