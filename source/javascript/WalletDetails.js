/**
 * @author Michael Phung, Abigail Koornwinder
 * @contributor Jacob Graven
 * @class
 * @implements {HTMLElement}
 * WalletDetails custom component. This contains the custom component definition for wallet-details.
 */

import {
  getAllTransactions,
  getTransactionsSortedByDate,
  getThisMonthTransactions,
  getThisYearTransactions,
  getWeek,
  getThisWeekTransactions,
  getTransactionsSorted,
  // need to add for details
  getWalletWeeklyTransactions,
  getWalletMonthlyTransactions,
  getWalletYearlyTransactions,
  sortSingleWallet,
  getNegativeTransactions,
  getPositiveTransactions
} from "./TransactionFilter.js";

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
    this.elementRoot.className = "details-root";

    // Recent Transactions container
    this.recentTransactions = document.createElement("div");
    this.recentTransactions.className = "component-t";
    this.recentTransactions.id = "recent-transactions";

    // Recent Transaction Title
    this.componentTitle = document.createElement("h2");
    this.componentTitle.className = "component-title";
    this.componentTitle.id = "recent-component-title";
    this.componentTitle.innerHTML = "Recent Transactions";

    // Transaction Table
    this.recentTransactionsTable = document.createElement("table");
    this.recentTransactionsTable.className =
      "recent-transactions-table glass-box";

    this.tbody = document.createElement("tbody");
    this.tbody.className = "t-body";

    this.recentTransactionsTableRow = document.createElement("tr");
    this.recentTransactionsTableRow.className = "t-row";
    this.recentTransactionsTableRow.id = "recent-transactions-row";

    this.recentTransactionsNameTitle = document.createElement("th");
    this.recentTransactionsNameTitle.className = "transaction-name";
    this.recentTransactionsNameTitle.id = "recent-transactions-name-title";
    this.recentTransactionsNameTitle.innerHTML = "Transaction";

    this.recentTransactionsAmountTitle = document.createElement("th");
    this.recentTransactionsAmountTitle.id = "recent-transactions-amount-title";
    this.recentTransactionsAmountTitle = "Amount";

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
    this.thisMonthsSpending.innerHTML = "Monthly Spending";

    this.thisMonthsSpendingAmount = document.createElement("h2");
    this.thisMonthsSpendingAmount.className = "statistic-value";
    this.thisMonthsSpendingAmount.id = "this-months-spending-amount";

    this.thisMonthsSpendingTarget = document.createElement("h2");
    this.thisMonthsSpendingTarget.className = "statistic-value";
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
    // this.monthlyInflowAmount.innerHTML = "$0"; //set data()

    this.monthlyOutflowItem = document.createElement("div");
    this.monthlyOutflowItem.className = "statistic-item";
    this.monthlyOutflowItem.id = "monthly-outflow-item";

    this.monthlyOutflow = document.createElement("h2");
    this.monthlyOutflow.className = "component-title";
    this.monthlyOutflow.id = "monthly-outflow";
    this.monthlyOutflow.innerHTML = "Monthly Outflow";

    this.monthlyOutflowAmount = document.createElement("h2");
    this.monthlyOutflowAmount.className = "component-title";
    this.monthlyOutflowAmount.id = "monthly-outflow-amount";
    this.monthlyOutflowAmount.innerHTML = "$0"; // set data()

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
    this.includeTotalTitle.innerHTML = "Include in total";

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
    // this.targetSectionInput.onblur = 'updateTarget()';

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

    this.settingsGlassBox.append(
      this.includeTotalSection,
      this.targetSection
      //this.timespanSection
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

    // this.timespanSection.append(
    //   this.timespanSectionTitle,
    //   this.timespanSectionWrapper
    // );

    // this.timespanSectionWrapper.append(this.timespanSectionSelect);

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
	  //this.walletName
    );
    this.shadowElem.append(this.elementRoot);
  }
  /**
   * @param {wallet_data} wallet_data The data object that contains the wallet information
   */

  set data(wallet_data) {
    // console.log(wallet_data);
    if (wallet_data == null) {
      return;
    }

	// this.walletName.innerHTML = wallet_data.name;

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

	if (netGain >= 0) {
		this.thisMonthsSpendingAmount.innerHTML = "$0";
	}
	else {
		this.thisMonthsSpendingAmount.innerHTML = `$${monthlySpending}`;
	}

    // this.thisMonthsSpendingAmount.innerHTML = `$${monthlySpending}`;


    this.thisMonthsSpendingTarget.innerHTML = `/$${wallet_data.target}`;

	let currentBalance = parseInt(wallet_data["total-amount"]) + netGain;
    this.currentBalanceAmount.innerHTML = '$' + currentBalance;


    // use getthismonth transactions and then get negative transactions
    // let allMonthlyTransactions = getWalletMonthlyTransactions(wallet_data);
    // console.log(allMonthlyTransactions);

    // let monthlyOutflowList = getNegativeTransactions(allMonthlyTransactions);
    let monthlyOutflowList = getNegativeTransactions(walletMonthlyTransactions);
    // console.log(monthlyOutflowList);
    let monthlyOutflowAmount = 0
    for (const transaction of monthlyOutflowList) {
      // console.log(transaction);
      	// let row = document.createElement("tr");
      	// let name = document.createElement("td");
      	// let amount = document.createElement("td");

      	// name.innerHTML = transaction["name"];
      	// amount.innerHTML = transaction["amount"];

      	// row.append(name, amount);
      	// this.tbody.append(row);
	  	monthlyOutflowAmount += transaction["amount"];
    }
	monthlyOutflowAmount *= -1;
    this.monthlyOutflowAmount.innerHTML = `$${monthlyOutflowAmount}`;

    // use getthismonth transactions and then get positive transactions
    // let monthlyInflowList = getPositiveTransactions(allMonthlyTransactions);
    let monthlyInflowList = getPositiveTransactions(walletMonthlyTransactions);
	// console.log(monthlyInflowList);
    let monthlyInflow = 0;
    for (const transaction of monthlyInflowList) {
      	monthlyInflow += transaction["amount"];
    }
    this.monthlyInflowAmount.innerHTML = `$${monthlyInflow}`;

    // TODO
    // let sortedWalletTransactions = this.wallet_data['transactions'];
    let sortedWalletMonthlyTransactions = getTransactionsSorted(walletMonthlyTransactions);
	// console.log(sortedWalletMonthlyTransactions);

	for (const transaction of sortedWalletMonthlyTransactions) {
		let row = document.createElement("tr");
		let name = document.createElement("td");
		let amount = document.createElement("td");


    
    if(transaction["amount"] > 0) {
      amount['data-transaction-kind'] = 'positive';
    } else {
      amount['data-transaction-kind'] = 'negative';
    }

		name.textContent = transaction["name"];
		amount.textContent = transaction["amount"];

		row.append(name, amount);
		this.tbody.append(row);
	}

    // TODO: sort transactions by date to show most recent -> put recents into table
    // table stuff:
    // TableRow = document.createElement("tr");
    // TransactionsNameTitle = document.createElement("th");
    // TransactionsAmountTitle = document.createElement("th");


  }
}

// function updateTarget() {
//   console.log('worked')
//   let inputBox = document.getElementById('target-input');
//   let newTarget = inputBox.value;
//   this.thisMonthsSpendingTarget.innerHTML = `/$${newTarget}`;
//   // update wallet.target?
// }

customElements.define("wallet-details", WalletDetails);


// TODO: 
// - fix display of transactions
//     - space out transaction and amount columns 
//     - something is too big  
//     - make negative amounts be red color and get rid of negative sign
// - fix display of spending statistics

// - take in input for monthly target
// - what is include in total checkbox for?
// - delete wallet button

// - filter transactions for week/month/year (take in input)
