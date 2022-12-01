import { getCurrentUserWallets } from './globals.js';

async function getAllTransactions() {
  const wallets = await getCurrentUserWallets();
	console.log(wallets);
  const transactions = [];
  for (const wallet of wallets) {
    const walletTransactions = wallet["transactions"];
    console.log(walletTransactions);
		for(let transaction of walletTransactions) {
			transaction['wallet'] = wallet['name'];
      transactions.push(transaction);
    }
  }
  return transactions;
}

async function getTransactionsSortedByDate() {
  // return transactions sorted by date from newest to oldest
  const transactions = await getAllTransactions();
  transactions.sort((a, b) => {
    const aDate = new Date(a["date"]);
    const bDate = new Date(b["date"]);
    return bDate - aDate;
  });
  return transactions;
}

async function getThisMonthTransactions() {
  const transactions = await getAllTransactions();
  const thisMonthTransactions = [];
  const thisMonth = new Date().getMonth();
  for (const transaction of transactions) {
    const transactionDate = new Date(transaction["date"]);
    if (transactionDate.getMonth() == thisMonth) {
      thisMonthTransactions.push(transaction);
    }
  }
  return thisMonthTransactions;
}

async function getThisYearTransactions() {
  const transactions = await getAllTransactions();
  const thisYearTransactions = [];
  const thisYear = new Date().getFullYear();
  for (const transaction of transactions) {
    const transactionDate = new Date(transaction["date"]);
    if (transactionDate.getFullYear() == thisYear) {
      thisYearTransactions.push(transaction);
    }
  }
  return thisYearTransactions;
}

// function to get week number
async function getWeek(date) {
  // Copy date so don't modify original
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  // Get first day of year
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  return weekNo;
}

async function getThisWeekTransactions(transactions) {
  // const transactions = wallet['transactions'];
  const thisWeekTransactions = [];
  const thisWeek = await getWeek(new Date());
  for (const transaction of transactions) {
    const transactionDate = new Date(transaction["date"]);
    if ((await getWeek(transactionDate)) == thisWeek) {
      thisWeekTransactions.push(transaction);
    }
  }
  return thisWeekTransactions;
}

function getPositiveTransactions(transactions) {
	console.log(transactions);
	const positiveTransactions = []
  	for(const transaction of transactions) {
		if(transaction['amount'] > 0) {
			positiveTransactions.push(transaction);
		}
	}
	return positiveTransactions;
}

async function getNegativeTransactions(transactions) {
	const negativeTransactions = [];
	for(const transaction of transactions) {
		if(transaction['amount'] < 0) {
			negativeTransactions.push(transaction);
		}
	}
	return negativeTransactions;
}

async function getWalletWeeklyTransactions(wallet) {
  const transactions = wallet["transactions"];
  const thisWeekTransactions = [];
  const thisWeek = await getWeek(new Date());
  for (const transaction of transactions) {
    const transactionDate = new Date(transaction["date"]);
    if ((await getWeek(transactionDate)) == thisWeek) {
      thisWeekTransactions.push(transaction);
    }
  }
  return thisWeekTransactions;
}

// async function getPositiveTransactions() {
// 	const transactions = await getAllTransactions();
// 	const positiveTransactions = [];
// 	for(const transaction of transactions) {
// 		if(transaction['amount'] > 0) {
// 			positiveTransactions.push(transaction);
// 		}
// 	}
// 	return positiveTransactions;
// }

// async function getNegativeTransactions() {
// 	const transactions = await getAllTransactions();
// 	const negativeTransactions = [];
// 	for(const transaction of transactions) {
// 		if(transaction['amount'] < 0) {
// 			negativeTransactions.push(transaction);
// 		}
// 	}
// 	return negativeTransactions;
// }

function getWalletMonthlyTransactions(wallet) {
  const transactions = wallet["transactions"];
  const thisMonthTransactions = [];
  const thisMonth = new Date().getMonth();
  for (const transaction of transactions) {
    const transactionDate = new Date(transaction["date"]);
    if (transactionDate.getMonth() == thisMonth) {
      thisMonthTransactions.push(transaction);
    }
  }
  return thisMonthTransactions;
}

async function getWalletYearlyTransactions(wallet) {
  const transactions = wallet["transactions"];
  const thisYearTransactions = [];
  const thisYear = new Date().getFullYear();
  for (const transaction of transactions) {
    const transactionDate = new Date(transaction["date"]);
    if (transactionDate.getFullYear() == thisYear) {
      thisYearTransactions.push(transaction);
    }
  }
  return thisYearTransactions;
}

async function sortSingleWallet(wallet) {
  const transactions = wallet['transactions'];
  transactions.sort((a, b) => {
    const aDate = new Date(a["date"]);
    const bDate = new Date(b["date"]);
    return bDate - aDate;
  });
  return transactions;
}

export {
  getTransactionsSortedByDate,
  getThisMonthTransactions,
  getThisYearTransactions,
  getThisWeekTransactions,
  getAllTransactions,
  getWeek,
  getWalletWeeklyTransactions,
  getWalletMonthlyTransactions,
  getWalletYearlyTransactions,
  sortSingleWallet,
  getNegativeTransactions,
  getPositiveTransactions
};
