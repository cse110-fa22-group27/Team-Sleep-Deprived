/**
 * @author Michael Phung, Abigail Koornwinder
 * @class
 * @implements {HTMLElement}
 * WalletDetails custom component. This contains the custom component definition for wallet-details.
 */
class WalletDetails extends HTMLElement {
	/** 
     * @constructs WalletDetails
     */

    constructor() {
        super();
        this.shadowElem = this.attachShadow({mode: 'open'});

    	/**
         * The root div of the wallet-details component
         * @member {HTMLElement} elementRoot 
         */
        
        this.elementRoot = document.createElement("div");
        this.elementRoot.className = "wallet-details-root";

        //recent transactions
        this.recentTransactions = document.createElement("div");
        this.recentTransactions.className = "component";
        this.recentTransactions.id = "recent-transactions";

        this.componentTitle = document.createElement("h2");
        this.componentTitle.className = "component-title";
        this.componentTitle.id = "component-title";

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

        this.recentTransactionsAmountTitle = document.createElement("th");
        this.recentTransactionsAmountTitle.id = "recent-transactions-amount-title";

        // spending statistics 
        this.spendingStatistics = document.createElement("div");
        this.spendingStatistics.className = "component";
        this.recentStatistics.id = "spending-statistics";
        
        this.currentBalanceItem = document.createElement("div");
        this.currentBalanceItem.className = "statistic-item";
        this.currentBalanceItem.id = "current-balance-item";
        
        this.currentBalance = document.createElement("h2");
        this.currentBalance.className = "component-title";
        this.currentBalance.id = "current-balance";

        this.currentBalanceAmount = document.createElement("h2");
        this.currentBalanceAmount.className = "statistic-value";
        this.currentBalanceAmount.id = "current-balance-amount";
        
        this.thisMonthsSpendingItem = document.createElement("div");
        this.thisMonthsSpendingItem.className = "statistic-item";
        this.thisMonthsSpendingItem.id = "this-months-spending-item";

        this.thisMonthsSpending = document.createElement("h2");
        this.thisMonthsSpending.className = "component-title";
        this.thisMonthsSpending.id = "this-months-spending";

        this.thisMonthsSpendingAmount = document.createElement("h2");
        this.thisMonthsSpendingAmount.className = "statistic-value";
        this.thisMonthsSpendingAmount.id = "this-months-spending-amount";
        
        this.thisMonthsSpendingTarget = document.createElement("h2");
        this.thisMonthsSpendingTarget.className = "statistic-value";
        this.thisMonthsSpendingTarget.id = "monthly-target-statistic";

        this.monthlyInflowItem = document.createElement('div');
        this.monthlyInflowItem.className = "statistic-item";
        this.monthlyInflowItem.id = "monthly-inflow-item";

        this.monthlyInflow = document.createElement("h2");
        this.monthlyInflow.className = "component-title";
        this.monthlyInflow.id = "monthly-inflow";

        this.monthlyInflowAmount = document.createElement("h2");
        this.monthlyInflowAmount.className = "statistic-value";
        this.monthlyInflowAmount.id = "monthly-inflow-amount";
        
        this.monthlyOutflowItem = document.createElement("div");
        this.monthlyOutflowItem.className = "statistic-item";
        this.monthlyOutflowItem.id = "monthly-outflow-item";

        this.monthlyOutflow = document.createElement("h2");
        this.monthlyOutflow.className = "component-title";
        this.monthlyOutflow.id = "monthly-outflow";

        this.monthlyOutflowAmount = document.createElement("h2");
        this.monthlyOutflowAmount.className = "component-title";
        this.monthlyOutflowAmount.id = "monthly-outflow-amount";

        this.settingsBox = document.createElement("div");
        this.settingsBox.className = "statistic-item";
        this.settingsBox.id = "settings-box";

        this.settingTitle = document.createElement("h2");
        this.settingTitle.className = "component-title";
        this.settingTitle.id = "settings-title";

        this.settingsGlassBox = document.createElement("div");
        this.settingsGlassBox.className = "glass-box settings-box";
        
        this.includeTotalSection = document.createElement("section");
        this.includeTotalSection.className = "setting-item";
        this.includeTotalSection.id = "include-total-section";

        this.includeTotalTitle = document.createElement("h3");
        this.includeTotalTitle.className = "setting-title";
        this.includeTotalTitle.id = "include-total-title";

        this.includeTotalInput = document.createElement("input");
        this.includeTotalInput.className = "setting-input";
        this.includeTotalInput.id = "include-total-input";

        this.targetSection = document.createElement("section");
        this.targetSection.className = "setting-item";
        this.targetSection.id = "target-section";

        this.targetSectionTitle = document.createElement("h3");
        this.targetSectionTitle.className = "setting-title";
        this.targetSectionTitle.id = "target-section-title";

        this.targetSectionWrapper = document.createElement("span");
        this.targetSectionWrapper.className = "setting-input";
        this.targetSectionWrapper.id = "monthly-target-input-wrapper";

        this.targetSectionInput = document.createElement("input");
        this.targetSectionInput.className = "setting-input";
        this.targetSectionInput.id = "target-input";

        

		/**
        * Styles the wallet details component. The stylesheet is defaulted to <code>../css/wallet-styles.css</code>
        * @member {HTMLElement} styleElem
        */
        this.styleElem = document.createElement('link');
        this.styleElem['rel'] = 'stylesheet';
        this.styleElem['href'] = '../css/wallet-details.css';
 
        this.defaultStyleLink = document.createElement('link');
        this.defaultStyleLink.href = '../css/styles.css';
        this.defaultStyleLink.rel = 'stylesheet';

        this.recentTransactionsTableRow.append(this.recentTransactionsNameTitle, this.recentTransactionsAmountTitle);
        this.tbody.append(this.recentTransactionsTableRow);
        this.recentTransactionsTable.append(this.tbody);
        this.recentTransactions.append(this.componentTitle, this.recentTransactionsTable);

        this.currentBalanceItem.append(this.currentBalance, this.currentBalanceAmount);
        this.thisMonthsSpendingItem.append(this.thisMonthsSpending, this.thisMonthsSpendingAmount, this.thisMonthsSpendingTarget);
        this.monthlyInflowItem.append(this.monthlyInflow, this.monthlyInflowAmount);
        this.monthlyOutflowItem.append(this.monthlyOutflow, this.monthlyOutflowAmount);
        this.settingsBox.append(this.settingTitle, this.settingsGlassBox);

        this.settingsGlassBox.append(this.includeTotalSection, this.targetSection);

        this.includeTotalSection.append(this.includeTotalTitle, this.includeTotalInput);
        this.targetSection.append(this.targetSectionTitle, this.targetSectionWrapper);

        this.targetSectionWrapper.append(this.targetSectionInput);
        
        this.spendingStatistics.append(this.currentBalanceItem, this.thisMonthsSpendingItem, this.monthlyInflowItem, this.monthlyOutflowItem, this.settingsBox);

        this.elementRoot.append(this.recentTransactions, this.spendingStatistics);
		    this.shadowElem.append(this.elementRoot);
    }

    ;/**
    * @param {wallet_data} wallet_data The data object that contains the wallet information
    */

    // wallet_data  
    
    set data(wallet_data) {
		// this.walletName.innerHTML = wallet_data.name;
		// this.walletAmount.innerHTML = `$${wallet_data['total-amount']}`;
		// if(wallet_data.lastTransaction) {
		// 	this.walletLastTransaction.innerHTML = `<strong>${wallet_data.lastTransaction.name}</strong> $${wallet_data.lastTransaction.amount}`;
		// 	this.walletLastTransaction.dataset.transactionType = wallet_data.lastTransaction.type;
		// }
      for (let transaction of wallet_data.transactions) {
        console.log(transaction);
        // do something?
      }
	}
}
customElements.define('wallet-details', WalletDetails);