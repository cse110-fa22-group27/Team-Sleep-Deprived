/**
 * @author Michael Phung, Abigail Koornwinder
 * @contributor Jacob Graven
 * @class
 * @implements {HTMLElement}
 * WalletDetails custom component. This contains the custom component definition for wallet-details.
 */

// import { getTransactionsSortedByDate } from "./TransactionFilter";

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
    // this.elementRoot.className = "wallet-details-root"; // OLD - renamed for clarity
    this.elementRoot.className = "details-root";

    // Recent Transactions container
    this.recentTransactions = document.createElement("div");
    this.recentTransactions.className = "component";
    this.recentTransactions.id = "recent-transactions";

    // Recent Transaction Title
    this.componentTitle = document.createElement("h2");
    this.componentTitle.className = "component-title";
    this.componentTitle.id = "component-title";
    this.componentTitle.innerHTML = "Recent Transactions";


    // Transaction Table
    this.recentTransactionsTable = document.createElement("table");
    this.recentTransactionsTable.className = "recent-transactions-table glass-box";

    this.tbody = document.createElement("tbody");
    this.tbody.className = "t-body";

    this.recentTransactionsTableRow = document.createElement("tr");
    this.recentTransactionsTableRow.className = "t-row";
    this.recentTransactionsTableRow.id = "recent-transactions-row";

    this.recentTransactionsNameTitle = document.createElement("th");
    this.recentTransactionsNameTitle.className = "transaction-name";
    this.recentTransactionsNameTitle.id = "recent-transactions-name-title";
    this.recentTransactionsNameTitle.innerHTML = 'Transaction';

    this.recentTransactionsAmountTitle = document.createElement("th");
    this.recentTransactionsAmountTitle.id = "recent-transactions-amount-title";
    this.recentTransactionsAmountTitle = 'Amount'


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
    this.currentBalance.innerHTML = 'Current Balance';

    this.currentBalanceAmount = document.createElement("h2");
    this.currentBalanceAmount.className = "statistic-value";
    this.currentBalanceAmount.id = "current-balance-amount";
    this.currentBalanceAmount.innerHTML = '$0' // set data()

    this.thisMonthsSpendingItem = document.createElement("div");
    this.thisMonthsSpendingItem.className = "statistic-item";
    this.thisMonthsSpendingItem.id = "this-months-spending-item";

    this.thisMonthsSpending = document.createElement("h2");
    this.thisMonthsSpending.className = "component-title";
    this.thisMonthsSpending.id = "this-months-spending";
    this.thisMonthsSpending.innerHTML = "Monthly Spending";

    this.thisMonthsSpendingAmount = document.createElement("h2");
    this.thisMonthsSpendingAmount.className = "statistic-value";
    this.thisMonthsSpendingAmount.id = "this-months-spending-amount";
    this.thisMonthsSpendingAmount.innerHTML = '$0' // set data()

    this.thisMonthsSpendingTarget = document.createElement("h2");
    this.thisMonthsSpendingTarget.className = "statistic-value";
    this.thisMonthsSpendingTarget.id = "monthly-target-statistic";
    this.thisMonthsSpendingTarget.innerHTML = '/0' // set data()

    this.monthlyInflowItem = document.createElement("div");
    this.monthlyInflowItem.className = "statistic-item";
    this.monthlyInflowItem.id = "monthly-inflow-item";

    this.monthlyInflow = document.createElement("h2");
    this.monthlyInflow.className = "component-title";
    this.monthlyInflow.id = "monthly-inflow";
    this.monthlyInflow.innerHTML = 'Monthly Inflow';

    this.monthlyInflowAmount = document.createElement("h2");
    this.monthlyInflowAmount.className = "statistic-value";
    this.monthlyInflowAmount.id = "monthly-inflow-amount";
    this.monthlyInflowAmount.innerHTML = '$0'; //set data()

    this.monthlyOutflowItem = document.createElement("div");
    this.monthlyOutflowItem.className = "statistic-item";
    this.monthlyOutflowItem.id = "monthly-outflow-item";

    this.monthlyOutflow = document.createElement("h2");
    this.monthlyOutflow.className = "component-title";
    this.monthlyOutflow.id = "monthly-outflow";
    this.monthlyOutflow.innerHTML = 'Monthly Outflow'

    this.monthlyOutflowAmount = document.createElement("h2");
    this.monthlyOutflowAmount.className = "component-title";
    this.monthlyOutflowAmount.id = "monthly-outflow-amount";
    this.monthlyOutflowAmount.innerHTML = '$0' // set data()

    // SETTINGS - currently unused / unimplemented
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
	this.includeTotalTitle.innerHTML = "Include in total"

	//needs to be either true or false
    this.includeTotalInput = document.createElement("input");
    this.includeTotalInput.className = "setting-input";
	this.includeTotalInput.setAttribute("type", "checkbox");
    this.includeTotalInput.id = "include-total-input";

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

    this.targetSectionInput = document.createElement("input");
    this.targetSectionInput.className = "setting-input";
    this.targetSectionInput.id = "target-input";

	this.timespanSection = document.createElement("section");
	this.timespanSection.className = "setting-item";
	this.timespanSection.id = "timespan-section";

	this.timespanSectionTitle = document.createElement("h3");
	this.timespanSectionTitle.className = "setting-title";
	this.timespanSectionTitle.id = "timespan-section-title";
	this.timespanSectionTitle.innerHTML = "Filter by";

	this.timespanSectionWrapper = document.createElement("span");
	this.timespanSectionWrapper.className = "setting-input";
	this.timespanSectionWrapper.id = "timespan-input-wrapper";

	this.timespanSectionSelect = document.createElement("select");
	this.timespanSectionSelect.className = "setting-input";
	this.timespanSectionSelect.id = "timespan-input";
	this.timespanSectionSelect.appendChild(new Option("Week", "week"));
	this.timespanSectionSelect.appendChild(new Option("Month", "month"));
	this.timespanSectionSelect.appendChild(new Option("Year", "year"));

	// this.sortByTimespan = document.createElement("select");
	// this.sortByTimespan.className = "timespan-select";
	// this.sortByTimespan.id = "select-timespan";
	// this.sortByTimespan.appendChild(new Option("Week", "week"));
	// this.sortByTimespan.appendChild(new Option("Month", "month"));
	// this.sortByTimespan.appendChild(new Option("Year", "year"));
    // END 

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

    this.tbody.append(this.recentTransactionsTableRow);
    this.recentTransactionsTable.append(this.tbody);
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

    this.settingsGlassBox.append(this.includeTotalSection, this.targetSection, this.timespanSection);

    this.includeTotalSection.append(
      this.includeTotalTitle,
      this.includeTotalInput
    );
    this.targetSection.append(
      this.targetSectionTitle,
      this.targetSectionWrapper
    ); 

    this.targetSectionWrapper.append(this.targetSectionInput);

	this.timespanSection.append(
		this.timespanSectionTitle,
		this.timespanSectionWrapper
	)

	this.timespanSectionWrapper.append(this.timespanSectionSelect);

    this.spendingStatistics.append(
      this.currentBalanceItem,
      this.thisMonthsSpendingItem,
      this.monthlyInflowItem,
      this.monthlyOutflowItem,
      this.settingsBox
    );

    this.elementRoot.append(this.recentTransactions, this.spendingStatistics, this.styleElem, this.defaultStyleLink);
    this.shadowElem.append(this.elementRoot);
  }
  /**
   * @param {wallet_data} wallet_data The data object that contains the wallet information
   */

  set data(wallet_data) {
    // use map to iterate through transactions array
    // this.walletName.innerHTML = wallet_data.name;
    // this.walletAmount.innerHTML = `$${wallet_data['total-amount']}`;
    // if(wallet_data.lastTransaction) {
    // 	this.walletLastTransaction.innerHTML = `<strong>${wallet_data.lastTransaction.name}</strong> $${wallet_data.lastTransaction.amount}`;
    // 	this.walletLastTransaction.dataset.transactionType = wallet_data.lastTransaction.type;
    // }
    // console.log("SET DATA IS HERE");

    this.currentBalanceAmount.innerHTML = wallet_data["total-amount"]; // current balance - done?
    this.thisMonthsSpendingAmount.innerHTML = '$0';                    // spending amount (monthly) - filter by month
    this.thisMonthsSpendingTarget.innerHTML = '/0';                    // spending target ()
    this.monthlyOutflowAmount.innerHTML = '$0';
    this.monthlyInflowAmount.innerHTML = '$0';

    // TODO
    let walletTransactions = this.wallet_data.transactions;
    // TODO: sort transactions by date to show most recent -> put recents into table
    // table stuff:
    // TableRow = document.createElement("tr");
    // TransactionsNameTitle = document.createElement("th");
    // TransactionsAmountTitle = document.createElement("th");

    // NEXT: get transactions by have same year/month as new Date() / time.now()
	// Date will be in UNIX time

    // this.recentTransactionsTableRow = document.createElement("tr");
    // this.recentTransactionsNameTitle = document.createElement("th");
    // this.recentTransactionsAmountTitle = document.createElement("th");


  }
}
customElements.define("wallet-details", WalletDetails);

// function goBackToWalletsPage() {
//   console.log("GO BACK TO WALLETS");
//   window.open('../../source/html/wallets.html', '_self');
// }

//     ;/**
//     * @param {wallet_data} wallet_data The data object that contains the wallet information
//     */

//     // wallet_data

// 	// wallet_data = {"Anthony": {
//     //     "username": "Anthony",
//     //     "password": "tony123",
//     //     "wallets": [{name: "BoA Savings", transactions: [], "total-amount": 10000, "target": 10},{name: "BoA Checking", transactions: [], "total-amount": 10000, "target": 10},{name: "BoA Savings", transactions: [], "total-amount": 10000, "target": 10},{name: "BoA Savings", transactions: [], "total-amount": 10000, "target": 10},{name: "BoA Savings", transactions: [], "total-amount": 10000, "target": 10},{name: "BoA Savings", transactions: [], "total-amount": 10000, "target": 10}],
//     //     "preferred-default-page": 0
//     // }}

//     set data(wallet_data) {
// 		if (!wallet_data) {
// 			return;
// 		}

//         this.currentBalanceItem.innerHTML = 'Current Balance';
//         this.currentBalanceAmount.innerHTML = '$69';

// 		// let currentWalletTransactions = wallet_data.transactions;

//         // for (let transaction of wallet_data.transactions) {
//         //     this.recentTransactionName.innerHTML = transaction.name;
//         //     this.recentTransactionAmount.innerHTML = transaction.amount;

//         //     // calculate spending statistics in the for loop?
//         //     this.recentTransaction.appendChild(this.recentTransactionName, this.recentTransactionAmount);
//         //     this.recentTransactionsTable.append(this.recentTransaction);

//         // }
// 		// need to get transaction name and amount
// 		// this.recentTransactionsNameTitle.innerHTML = wallet_data.name;
// 		// this.recentTransactionsAmountTitle.innerHTML = wallet_data.amount;
// 		// still need to figure out text coloring

//         // if we need to manually check which wallet we are looking at
//         // let currentWallet = document.querySelector(".page-title"); // "BoA Checking"
//         // const wallets = getCurrentUserWallets();
//         // for(const wallet of wallets) {
//         //     if(wallet.name == currentWallet) {
//         //         currentWalletTransactions = wallet.transactions;
//         //     }
// 	    // }
// 		// need to retrieve wallet's transactions
//         // idk
//         // let monthlyInflow;
//         // let monthlyOutflow;
// 	}
// }
// customElements.define('wallet-details', WalletDetails);
