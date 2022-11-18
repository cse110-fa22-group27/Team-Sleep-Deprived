function getYearlySpending() {
	// TODO //
	// console.log('getYearlySpending fired');
	let yearlyTotal = 0;
	const localWalletString = JSON.stringify(window.localStorage.getItem('wallet-infos'));
	const localWallets = JSON.parse(localWalletString != null ? localWalletString : '[]');
	if (localWallets == '[]' || localWallets == null) {
		return 0;
	}
	// yearlyTotal = localWallets.map(localWallets => localWallets.amount).reduce((amntA, amntB) => amntA + amntB);
	
	for(let wallet in localWallets) {
		yearlyTotal += wallet['amount'];
	}
	console.log(yearlyTotal);
	return yearlyTotal;
}

export function generateReport() {
	// TODO //
	// create new page -> put graph + some statistics on page
	// convert page to pdf / open page and allow user to download/print
	//      //
	console.log('generateReport fired');
	return 0;
}


window.addEventListener('load', () => {
	// TODO: Get yearly spending value -> sum all expenses from all wallets (implement getYearlySpending()) //
	// TODO: fix chart / make chart functional //

	// Yearly Spending //
	console.log('load event fired');
	let yearlySpending = getYearlySpending();
	document.getElementById('yearly-spending-header').innerHTML = 'Yearly Spending: $' + yearlySpending;

	// Chart (sample/placeholder) //
	let xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	// Sample Values - TODO: loop over transactions from each month, assign to yValues
	let yValues = [2500, 3500, 3000, 2100, 1000, 1500, 1250, 500, 750, 900, 1000, 1500];
	// let yMax = Math.max.apply(null, yValues);

	// can we use Chart.js?
	new Chart('report-chart', {
		type: 'bar',
		data: {
			labels: xLabels,
			datasets: [{
				data: yValues
			}]
		},
		options: {
			legend: {
				display: false
			},
			tooltips: {
				enabled: false
			}
		}
	});
});