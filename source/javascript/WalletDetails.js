/**
 * @author Michael Phung, Abigail Koornwinder
 * @contributor Jacob Graven, Ashwin Rohit
 * @class
 * @implements {HTMLElement}
 * WalletDetails custom component. This contains the custom component definition for wallet-details.
 */

import {
	getTransactionsSortedByDateForWallet,
	getWalletMonthlyTransactions,
	getNegativeTransactions,
	getPositiveTransactions
} from "./TransactionFilter.js";

import { showTransactionDetails } from "./DisplayTransactionDetails.js";

import { getCurrentUserWallets, setCurrentUserWallets } from "./globals.js";

class WalletDetails extends HTMLElement {
	/**
	 * @constructs WalletDetails
	 */

	constructor() {
		super();
		this.shadowElem = this.attachShadow({ mode: "open" });

		/**
		 * The root div of the wallet-details component
		 * @member {HTMLElement} elementRoot
		 */

		this.elementRoot = document.createElement("div");
		this.elementRoot.className = "wallet-details-root"; // AK changed from 'details-root' to 'wallet-details-root' to match css

		// Recent Transactions container
		this.recentTransactions = document.createElement("div");
		this.recentTransactions.className = "component";
		// this.recentTransactions.className = "recent-transaction-component-title";
		this.recentTransactions.id = "recent-transactions";

		// Recent Transaction Title
		this.componentTitle = document.createElement("h2");
		this.componentTitle.className = "component-title";
		// this.componentTitle.id = "recent-component-title";
		this.componentTitle.id = "component-title";
		this.componentTitle.innerHTML = "Recent Transactions";

		// Transaction Table
		this.recentTransactionsTable = document.createElement("table");
		this.recentTransactionsTable.className =
			"recent-transactions-table glass-box";

		// Transaction Table Header
		this.thead = document.createElement("thead");
		this.thead.className = "recent-transactions-table-header";

		this.tbody = document.createElement("tbody");
		this.tbody.className = "t-body";

		this.recentTransactionsTableRow = document.createElement("tr");
		this.recentTransactionsTableRow.className = "t-row";
		this.recentTransactionsTableRow.id = "recent-transactions-row";

		this.recentTransactionsNameTitle = document.createElement("th");
		this.recentTransactionsNameTitle.className = "transaction-name";
		this.recentTransactionsNameTitle.id = "recent-transactions-name-title";
		this.recentTransactionsNameTitle.innerHTML = "Name";

		this.recentTransactionsAmountTitle = document.createElement("th");
		this.recentTransactionsAmountTitle.id = "recent-transactions-amount-title";
		this.recentTransactionsAmountTitle.setAttribute('data-kind', 'amount');
		this.recentTransactionsAmountTitle.innerHTML = "Amount $";

		// Spending Statistics
		this.spendingStatistics = document.createElement("div");
		this.spendingStatistics.className = "component";
		this.spendingStatistics.id = "spending-statistics";

		this.currentBalanceItem = document.createElement("div");
		this.currentBalanceItem.className = "statistic-item";
		this.currentBalanceItem.id = "current-balance-item";

		this.currentBalance = document.createElement("h2");
		this.currentBalance.className = "component-title";
		this.currentBalance.id = "current-balance";
		this.currentBalance.innerHTML = "Current Balance";

		this.currentBalanceAmount = document.createElement("h2");
		this.currentBalanceAmount.className = "statistic-value";
		this.currentBalanceAmount.id = "current-balance-amount";

		this.thisMonthsSpendingItem = document.createElement("div");
		this.thisMonthsSpendingItem.className = "statistic-item";
		this.thisMonthsSpendingItem.id = "this-months-spending-item";

		this.thisMonthsSpending = document.createElement("h2");
		this.thisMonthsSpending.className = "component-title";
		this.thisMonthsSpending.id = "this-months-spending";
		this.thisMonthsSpending.innerHTML = "This month's spending";

		this.thisMonthsSpendingAmount = document.createElement("h2");
		this.thisMonthsSpendingAmount.className = "statistic-value";
		this.thisMonthsSpendingAmount.id = "this-months-spending-amount";

		this.thisMonthsSpendingTarget = document.createElement("h2");
		this.thisMonthsSpendingTarget.id = "monthly-target-statistic";

		this.monthlyInflowItem = document.createElement("div");
		this.monthlyInflowItem.className = "statistic-item";
		this.monthlyInflowItem.id = "monthly-inflow-item";

		this.monthlyInflow = document.createElement("h2");
		this.monthlyInflow.className = "component-title";
		this.monthlyInflow.id = "monthly-inflow";
		this.monthlyInflow.innerHTML = "Monthly Inflow";

		this.monthlyInflowAmount = document.createElement("h2");
		this.monthlyInflowAmount.className = "statistic-value";
		this.monthlyInflowAmount.id = "monthly-inflow-amount";

		this.monthlyOutflowItem = document.createElement("div");
		this.monthlyOutflowItem.className = "statistic-item";
		this.monthlyOutflowItem.id = "monthly-outflow-item";

		this.monthlyOutflow = document.createElement("h2");
		this.monthlyOutflow.className = "component-title";
		this.monthlyOutflow.id = "monthly-outflow";
		this.monthlyOutflow.innerHTML = "Monthly Outflow";

		this.monthlyOutflowAmount = document.createElement("h2");
		this.monthlyOutflowAmount.className = "statistic-value";
		this.monthlyOutflowAmount.id = "monthly-outflow-amount";

		// SETTINGS
		this.settingsBox = document.createElement("div");
		this.settingsBox.className = "statistic-item";
		this.settingsBox.id = "settings-box";

		this.settingTitle = document.createElement("h2");
		this.settingTitle.className = "component-title";
		this.settingTitle.id = "settings-title";
		this.settingTitle.innerHTML = "Settings";

		this.settingsGlassBox = document.createElement("div");
		this.settingsGlassBox.className = "glass-box settings-box";

		this.includeTotalSection = document.createElement("section");
		this.includeTotalSection.className = "setting-item";
		this.includeTotalSection.id = "include-total-section";

		this.includeTotalTitle = document.createElement("h3");
		this.includeTotalTitle.className = "setting-title";
		this.includeTotalTitle.id = "include-total-title";
		this.includeTotalTitle.innerHTML = "Include in total";

		//needs to be either true or false
		this.includeTotalInput = document.createElement("input");
		this.includeTotalInput.className = "setting-input";
		this.includeTotalInput.setAttribute("type", "checkbox");
		this.includeTotalInput.id = "include-total-input";
		this.includeTotalInput.addEventListener("change", includeInTotal);

		this.targetSection = document.createElement("section");
		this.targetSection.className = "setting-item";
		this.targetSection.id = "target-section";

		this.targetSectionTitle = document.createElement("h3");
		this.targetSectionTitle.className = "setting-title";
		this.targetSectionTitle.id = "target-section-title";
		this.targetSectionTitle.innerHTML = "Monthly Target";

		this.targetSectionWrapper = document.createElement("span");
		this.targetSectionWrapper.className = "setting-input";
		this.targetSectionWrapper.id = "monthly-target-input-wrapper";
		this.targetSectionWrapper.innerHTML = "$";  // ak: put $ in parent span instead

		this.targetSectionInput = document.createElement("input");
		this.targetSectionInput.className = "setting-input";
		this.targetSectionInput.id = "target-input";

		this.targetSectionInput.addEventListener("onchange", (event) => {
			console.log(event);
			this.thisMonthsSpendingTarget.innerHTML = "/" + this.targetSectionInput.value;
			this.targetSectionInput.value = this.targetSectionInput.value;
		});

		this.targetSectionInput.addEventListener('change', async event => {
			const inputField = event.target;
			const inputValue = inputField.value;
			const newTarget = Number(inputValue);
			if (!newTarget) {
				alert('Invalid value detected.');
				return;
			}
			const currentWalletName = JSON.parse(localStorage.getItem('currentWalletName'));
			let currentWallet = []
			const wallets = await getCurrentUserWallets();
			let currentWalletIndex = 0;
			for (let i = 0; i < wallets.length; ++i) {
				if (wallets[i].name === currentWalletName) {
					currentWalletIndex = i;
					currentWallet = wallets[i];
					break;
				}
			}
			currentWallet['target'] = newTarget;
			wallets[currentWalletIndex] = currentWallet;
			await setCurrentUserWallets(wallets);
			window.location.reload();
		});
		/**
		 * Styles the wallet details component. The stylesheet is defaulted to <code>../css/wallet-styles.css</code>
		 * @member {HTMLElement} styleElem
		 */
		this.styleElem = document.createElement("link");
		this.styleElem["rel"] = "stylesheet";
		this.styleElem["href"] = "../css/wallet-details.css";

		this.defaultStyleLink = document.createElement("link");
		this.defaultStyleLink.href = "../css/styles.css";
		this.defaultStyleLink.rel = "stylesheet";

		this.recentTransactionsTableRow.append(
			this.recentTransactionsNameTitle,
			this.recentTransactionsAmountTitle
		);

		this.thead.append(this.recentTransactionsTableRow);
		this.recentTransactionsTable.append(this.thead, this.tbody);

		this.recentTransactions.append(
			this.componentTitle,
			this.recentTransactionsTable
		);

		this.currentBalanceItem.append(
			this.currentBalance,
			this.currentBalanceAmount
		);

		this.thisMonthsSpendingItem.append(
			this.thisMonthsSpending,
			this.thisMonthsSpendingAmount,
			this.thisMonthsSpendingTarget
		);

		this.monthlyInflowItem.append(this.monthlyInflow, this.monthlyInflowAmount);
		this.monthlyOutflowItem.append(
			this.monthlyOutflow,
			this.monthlyOutflowAmount
		);
		// SETTINGS
		this.settingsBox.append(this.settingTitle, this.settingsGlassBox);

		this.settingsGlassBox.append(
			this.includeTotalSection,
			this.targetSection
		);

		this.includeTotalSection.append(
			this.includeTotalTitle,
			this.includeTotalInput
		);
		this.targetSection.append(
			this.targetSectionTitle,
			this.targetSectionWrapper
		);

		this.targetSectionWrapper.append(this.targetSectionInput);

		this.spendingStatistics.append(
			this.currentBalanceItem,
			this.thisMonthsSpendingItem,
			this.monthlyInflowItem,
			this.monthlyOutflowItem,
			this.settingsBox
		);

		this.elementRoot.append(
			this.recentTransactions,
			this.spendingStatistics,
			this.styleElem,
			this.defaultStyleLink
		);
		this.shadowElem.append(this.elementRoot);
	}
	/**
	 * @param {wallet_data} wallet_data The data object that contains the wallet information
	 */

	set data(wallet_data) {
		if (wallet_data == null) {
			return;
		}


		// Monthly Spending
		let monthlySpending = 0;
		let netGain = 0
		let walletMonthlyTransactions = getWalletMonthlyTransactions(wallet_data);
		for (const transaction of walletMonthlyTransactions) {
			if (transaction["amount"] < 0) {
				monthlySpending += transaction["amount"];
			}
			netGain += transaction["amount"];
		}

		monthlySpending *= -1;
		monthlySpending = monthlySpending.toFixed(2);

		if (netGain >= 0) {
			this.thisMonthsSpendingAmount.setAttribute("data-kind", "amount");
			this.thisMonthsSpendingAmount.innerHTML = "$0";
		}
		else {
			this.thisMonthsSpendingAmount.setAttribute("data-kind", "amount");
			this.thisMonthsSpendingAmount.innerHTML = `$${monthlySpending}`;
		}

		// Monthly Inflow
		this.thisMonthsSpendingTarget.innerHTML = `/${wallet_data.target}`;
		//this.targetSectionInput.value = `$${wallet_data.target}`;
		this.targetSectionInput.value = wallet_data.target;  // removed $ from the input value

		let currentBalance = parseFloat(wallet_data["total-amount"]);
		currentBalance = currentBalance.toFixed(2);
		this.currentBalanceAmount.setAttribute("data-kind", "amount");  // AK SET ATTRIBUTE TO MATCH CSS --> TURN TO BLUE
		this.currentBalanceAmount.innerHTML = '$' + currentBalance;

		let monthlyOutflowList = getNegativeTransactions(walletMonthlyTransactions);
		let monthlyOutflowAmount = 0
		for (const transaction of monthlyOutflowList) {
			monthlyOutflowAmount += transaction["amount"];
		}
		monthlyOutflowAmount *= -1;
		monthlyOutflowAmount = monthlyOutflowAmount.toFixed(2);
		this.monthlyOutflowAmount.setAttribute("data-transaction-kind", "negative");  // AK SET ATTRIBUTE MATCH CSS FONT COLOR
		this.monthlyOutflowAmount.innerHTML = `$${monthlyOutflowAmount}`;

		let monthlyInflowList = getPositiveTransactions(walletMonthlyTransactions);
		let monthlyInflow = 0;
		for (const transaction of monthlyInflowList) {
			monthlyInflow += transaction["amount"];
		}
		monthlyInflow = monthlyInflow.toFixed(2);
		this.monthlyInflowAmount.setAttribute("data-transaction-kind", "positive"); // AK SET ATTRIBUTE MATCH CSS FONT COLOR
		this.monthlyInflowAmount.innerHTML = `$${monthlyInflow}`;

		let allTransactionsSorted = getTransactionsSortedByDateForWallet(wallet_data);

		for (const transaction of allTransactionsSorted) {
			let row = document.createElement("tr");
			let name = document.createElement("td");
			let amount = document.createElement("td");

			if (transaction["amount"] > 0) {
				amount.setAttribute('data-transaction-kind', 'positive');  // AK: ADD THIS TO SET CSS ATTRIBUTE
			}
			else {
				amount.setAttribute('data-transaction-kind', 'negative'); // AK: ADD THIS TO SET CSS ATTRIBUTE
			}


			amount.setAttribute("data-kind", "amount");
			name.textContent = transaction["name"];
			// AK: ADD IF STATMENT to remove negative sign and add parentheses around negative transactions
			if (transaction["amount"] < 0) {
				amount.textContent = `(${-transaction['amount']})`;
			} else {
				amount.textContent = transaction['amount'];
			}
			row.append(name, amount);
			row.addEventListener('click', () => {
				showTransactionDetails(transaction);
			});
			this.tbody.append(row);
		}
		wallet_data['total-amount'] = currentBalance;
	}
}
async function includeInTotal() {
	console.log("clicked");
	const currentWallet = JSON.parse(localStorage.getItem('currentWalletName'));
	let wallets = await getCurrentUserWallets();
	let newWallets = [];
	for (const wallet of wallets) {
		if (wallet.name == currentWallet) {
			wallet['includeInTotal'] = !wallet['includeInTotal'];
		}
		newWallets.push(wallet);
	}
	setCurrentUserWallets(newWallets);
}

customElements.define("wallet-details", WalletDetails);